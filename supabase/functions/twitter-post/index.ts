
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';
import { corsHeaders } from '../_shared/cors.ts';
import { createHmac } from "https://deno.land/std@0.167.0/node/crypto.ts";

const supabaseUrl = Deno.env.get('SUPABASE_URL') || 'https://tnfqzklfdwknmplrygag.supabase.co';
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZnF6a2xmZHdrbm1wbHJ5Z2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTUwNTksImV4cCI6MjA2MDI3MTA1OX0.8s7ol8jfz_6anK4l2aGBXaICDf3lLHmHSPovcXXGQ1A';

// Twitter API credentials - these need to be added to Supabase secrets
const API_KEY = Deno.env.get('TWITTER_CONSUMER_KEY');
const API_SECRET = Deno.env.get('TWITTER_CONSUMER_SECRET');
const BASE_URL = 'https://api.twitter.com/2';

const supabase = createClient(supabaseUrl, supabaseKey);

function validateEnvironmentVariables() {
  if (!API_KEY) throw new Error('Missing TWITTER_CONSUMER_KEY');
  if (!API_SECRET) throw new Error('Missing TWITTER_CONSUMER_SECRET');
}

// Generates the OAuth signature for Twitter API requests
function generateOAuthSignature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  tokenSecret: string
): string {
  const signatureBaseString = `${method}&${encodeURIComponent(
    url
  )}&${encodeURIComponent(
    Object.entries(params)
      .sort()
      .map(([k, v]) => `${k}=${v}`)
      .join('&')
  )}`;
  
  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(tokenSecret)}`;
  const hmacSha1 = createHmac('sha1', signingKey);
  const signature = hmacSha1.update(signatureBaseString).digest('base64');
  
  return signature;
}

// Generates the OAuth header for Twitter API requests
function generateOAuthHeader(
  method: string, 
  url: string, 
  accessToken: string, 
  accessTokenSecret: string
): string {
  const oauthParams = {
    oauth_consumer_key: API_KEY!,
    oauth_nonce: Math.random().toString(36).substring(2),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: accessToken,
    oauth_version: '1.0',
  };

  const signature = generateOAuthSignature(
    method,
    url,
    oauthParams,
    API_SECRET!,
    accessTokenSecret
  );

  const signedOAuthParams = {
    ...oauthParams,
    oauth_signature: signature,
  };

  return 'OAuth ' + 
    Object.entries(signedOAuthParams)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`)
      .join(', ');
}

// Posts a tweet using the Twitter API
async function postTweet(text: string, accessToken: string, accessTokenSecret: string) {
  const url = `${BASE_URL}/tweets`;
  const method = 'POST';
  const oauthHeader = generateOAuthHeader(method, url, accessToken, accessTokenSecret);
  
  const response = await fetch(url, {
    method: method,
    headers: {
      'Authorization': oauthHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Twitter API error: ${response.status} ${text}`);
  }
  
  return response.json();
}

// Queue a tweet for moderation if queueing is enabled
async function queueTweet(tenant_id: string, message: string) {
  // Add tweet to queue
  const { data, error } = await supabase
    .from('tweet_queue')
    .insert({
      tenant_id,
      content: message,
      status: 'pending'
    })
    .select()
    .single();
  
  if (error) {
    throw new Error(`Failed to queue tweet: ${error.message}`);
  }
  
  return { success: true, queued: true, queue_id: data.id };
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    validateEnvironmentVariables();
    
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    const { tenant_id, message, queue = true } = await req.json();
    
    if (!tenant_id || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters: tenant_id and message' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Check if queueing is enabled - default to true for moderation
    if (queue) {
      const queueResult = await queueTweet(tenant_id, message);
      
      return new Response(
        JSON.stringify(queueResult),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Direct posting - only used by the admin approval process
    // Get the Twitter tokens for this tenant
    const { data: tenant, error: tenantError } = await supabase
      .from('tenants')
      .select('twitter_access_token, twitter_access_token_secret')
      .eq('id', tenant_id)
      .single();
    
    if (tenantError || !tenant?.twitter_access_token || !tenant?.twitter_access_token_secret) {
      return new Response(
        JSON.stringify({ error: 'Twitter not connected for this tenant' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }
    
    // Post the tweet
    const result = await postTweet(
      message,
      tenant.twitter_access_token,
      tenant.twitter_access_token_secret
    );
    
    // Update the last_tweet_at timestamp
    await supabase
      .from('tenants')
      .update({ last_tweet_at: new Date().toISOString() })
      .eq('id', tenant_id);
    
    return new Response(
      JSON.stringify({ success: true, tweet_id: result.data.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error posting to Twitter:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
