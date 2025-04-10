
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const META_APP_ID = Deno.env.get("META_APP_ID") || "";
const META_APP_SECRET = Deno.env.get("META_APP_SECRET") || "";
const APP_URL = Deno.env.get("APP_URL") || "http://localhost:5173";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const params = url.searchParams;
  const action = params.get("action");

  // Initialize Supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: { Authorization: req.headers.get("Authorization") || "" },
    },
  });

  try {
    // Get user from auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get user's company_id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('company_id')
      .eq('id', user.id)
      .single();

    if (profileError || !profile.company_id) {
      return new Response(
        JSON.stringify({ error: "Company not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "authorize") {
      // Generate auth URL for Meta
      const redirectUri = `${APP_URL}/auth/meta/callback`;
      const scopes = "ads_management,pages_show_list,business_management";
      const state = JSON.stringify({ userId: user.id, companyId: profile.company_id });
      
      const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${META_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&state=${encodeURIComponent(state)}&response_type=code`;
      
      return new Response(
        JSON.stringify({ url: authUrl }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } 
    else if (action === "callback") {
      const code = params.get("code");
      const state = params.get("state") ? JSON.parse(params.get("state") || "{}") : {};
      
      if (!code || !state.companyId) {
        return new Response(
          JSON.stringify({ error: "Invalid callback request" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Exchange code for access token
      const redirectUri = `${APP_URL}/auth/meta/callback`;
      const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${META_APP_ID}&client_secret=${META_APP_SECRET}&redirect_uri=${encodeURIComponent(redirectUri)}&code=${code}`;
      
      const tokenResponse = await fetch(tokenUrl);
      const tokenData = await tokenResponse.json();
      
      if (!tokenResponse.ok || !tokenData.access_token) {
        return new Response(
          JSON.stringify({ error: "Failed to exchange code for token", details: tokenData }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Get long-lived token
      const longLivedTokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${META_APP_ID}&client_secret=${META_APP_SECRET}&fb_exchange_token=${tokenData.access_token}`;
      
      const longLivedTokenResponse = await fetch(longLivedTokenUrl);
      const longLivedTokenData = await longLivedTokenResponse.json();
      
      if (!longLivedTokenResponse.ok || !longLivedTokenData.access_token) {
        return new Response(
          JSON.stringify({ error: "Failed to get long-lived token", details: longLivedTokenData }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Get ad accounts for the user
      const adAccountsUrl = `https://graph.facebook.com/v18.0/me/adaccounts?fields=name,account_id&access_token=${longLivedTokenData.access_token}`;
      
      const adAccountsResponse = await fetch(adAccountsUrl);
      const adAccountsData = await adAccountsResponse.json();
      
      if (!adAccountsResponse.ok || !adAccountsData.data) {
        return new Response(
          JSON.stringify({ error: "Failed to get ad accounts", details: adAccountsData }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Get the first ad account (in a real app, you might want to let the user select)
      const firstAdAccount = adAccountsData.data[0];
      
      if (!firstAdAccount) {
        return new Response(
          JSON.stringify({ error: "No ad accounts found" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Store token and ad account info in the database
      const { error: insertError } = await supabase
        .from('ad_platform_connections')
        .upsert({
          user_id: user.id,
          company_id: state.companyId,
          platform: 'meta',
          access_token: longLivedTokenData.access_token,
          refresh_token: null, // Meta doesn't use refresh tokens in the same way
          ad_account_id: firstAdAccount.account_id,
          token_expires_at: new Date(Date.now() + (longLivedTokenData.expires_in * 1000)),
          scopes: ['ads_management', 'pages_show_list', 'business_management'],
          is_active: true
        })
        .select();

      if (insertError) {
        return new Response(
          JSON.stringify({ error: "Failed to save connection details", details: insertError }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          ad_account: firstAdAccount,
          redirect: `${APP_URL}/dashboard/ad-accounts` 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    else if (action === "revoke") {
      // Get the connection
      const { data: connection, error: connectionError } = await supabase
        .from('ad_platform_connections')
        .select('access_token')
        .match({ company_id: profile.company_id, platform: 'meta' })
        .single();

      if (connectionError || !connection) {
        return new Response(
          JSON.stringify({ error: "Connection not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Revoke token with Meta
      const revokeUrl = `https://graph.facebook.com/v18.0/me/permissions?access_token=${connection.access_token}`;
      await fetch(revokeUrl, { method: 'DELETE' });

      // Mark connection as inactive in our database
      const { error: updateError } = await supabase
        .from('ad_platform_connections')
        .update({ is_active: false })
        .match({ company_id: profile.company_id, platform: 'meta' });

      if (updateError) {
        return new Response(
          JSON.stringify({ error: "Failed to update connection status", details: updateError }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    else {
      return new Response(
        JSON.stringify({ error: "Invalid action" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    console.error(`Meta auth error: ${err.message}`);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
