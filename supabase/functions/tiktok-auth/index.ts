
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const TIKTOK_APP_ID = Deno.env.get("TIKTOK_APP_ID") || "";
const TIKTOK_APP_SECRET = Deno.env.get("TIKTOK_APP_SECRET") || "";
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
      // Generate auth URL for TikTok
      const redirectUri = `${APP_URL}/auth/tiktok/callback`;
      const scopes = "ads.basic,ads.manage,billing.basic";
      const state = JSON.stringify({ userId: user.id, companyId: profile.company_id });
      
      const authUrl = `https://ads.tiktok.com/marketing_api/auth?app_id=${TIKTOK_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}&scope=${encodeURIComponent(scopes)}`;
      
      return new Response(
        JSON.stringify({ url: authUrl }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } 
    else if (action === "callback") {
      const code = params.get("auth_code");
      const stateParam = params.get("state");
      
      if (!code || !stateParam) {
        return new Response(
          JSON.stringify({ error: "Invalid callback request" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const state = JSON.parse(stateParam);
      
      if (!state.companyId) {
        return new Response(
          JSON.stringify({ error: "Invalid state parameter" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Exchange code for access token
      const tokenUrl = "https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/";
      const tokenResponse = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          app_id: TIKTOK_APP_ID,
          secret: TIKTOK_APP_SECRET,
          auth_code: code
        })
      });
      
      const tokenData = await tokenResponse.json();
      
      if (tokenData.code !== 0 || !tokenData.data?.access_token) {
        return new Response(
          JSON.stringify({ error: "Failed to exchange code for token", details: tokenData }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const accessToken = tokenData.data.access_token;
      const refreshToken = tokenData.data.refresh_token;
      const expiresIn = tokenData.data.expires_in;
      const advertiserId = tokenData.data.advertiser_ids?.[0];

      if (!advertiserId) {
        return new Response(
          JSON.stringify({ error: "No advertiser account found" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Store token and ad account info in the database
      const { error: insertError } = await supabase
        .from('ad_platform_connections')
        .upsert({
          user_id: user.id,
          company_id: state.companyId,
          platform: 'tiktok',
          access_token: accessToken,
          refresh_token: refreshToken,
          ad_account_id: advertiserId,
          token_expires_at: new Date(Date.now() + (expiresIn * 1000)),
          scopes: ['ads.basic', 'ads.manage', 'billing.basic'],
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
          advertiser_id: advertiserId,
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
        .match({ company_id: profile.company_id, platform: 'tiktok' })
        .single();

      if (connectionError || !connection) {
        return new Response(
          JSON.stringify({ error: "Connection not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Mark connection as inactive in our database
      // Note: TikTok doesn't have a straightforward token revocation endpoint
      // like Meta does, so we'll just mark it as inactive in our system
      const { error: updateError } = await supabase
        .from('ad_platform_connections')
        .update({ is_active: false })
        .match({ company_id: profile.company_id, platform: 'tiktok' });

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
    console.error(`TikTok auth error: ${err.message}`);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
