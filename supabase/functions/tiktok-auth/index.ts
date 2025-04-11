
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
  // Handle CORS for preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse the request URL and body
    let action, auth_code;
    const url = new URL(req.url);
    
    if (req.method === "GET") {
      // Handle GET requests (like from the callback URL)
      action = url.searchParams.get("action");
      auth_code = url.searchParams.get("auth_code");
    } else {
      // Handle POST requests from our app
      const body = await req.json();
      action = body.action;
      auth_code = body.auth_code;
    }

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

    // Get user from auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized", status: 401 }),
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
        JSON.stringify({ error: "Company not found", status: 404 }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (action === "authorize") {
      // Generate auth URL for TikTok
      const redirectUri = `${APP_URL}/dashboard/auth/tiktok/callback`;
      const scopes = "ads.basic,ads.manage,billing.basic";
      const state = JSON.stringify({ userId: user.id, companyId: profile.company_id });
      
      const authUrl = `https://ads.tiktok.com/marketing_api/auth?app_id=${TIKTOK_APP_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}&scope=${encodeURIComponent(scopes)}`;
      
      return new Response(
        JSON.stringify({ url: authUrl }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } 
    else if (action === "callback") {
      if (!auth_code) {
        return new Response(
          JSON.stringify({ error: "No auth code provided", status: 400 }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Extract state parameter if it exists in the URL (for GET requests)
      let state;
      try {
        const stateParam = url.searchParams.get("state");
        if (stateParam) {
          state = JSON.parse(decodeURIComponent(stateParam));
        } else {
          // If no state in URL, use current user's company
          state = { companyId: profile.company_id };
        }
      } catch (error) {
        console.error("Error parsing state parameter:", error);
        return new Response(
          JSON.stringify({ error: "Invalid state parameter", status: 400 }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      if (!state.companyId) {
        return new Response(
          JSON.stringify({ error: "Company ID not found in state", status: 400 }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Exchange code for access token
      try {
        const tokenUrl = "https://business-api.tiktok.com/open_api/v1.3/oauth2/access_token/";
        const tokenResponse = await fetch(tokenUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            app_id: TIKTOK_APP_ID,
            secret: TIKTOK_APP_SECRET,
            auth_code: auth_code
          })
        });
        
        if (!tokenResponse.ok) {
          const errorText = await tokenResponse.text();
          console.error("TikTok token exchange failed:", errorText);
          return new Response(
            JSON.stringify({ error: `TikTok API error: ${tokenResponse.status} ${errorText}`, status: tokenResponse.status }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const tokenData = await tokenResponse.json();
        
        if (tokenData.code !== 0 || !tokenData.data?.access_token) {
          console.error("TikTok token response error:", tokenData);
          return new Response(
            JSON.stringify({ 
              error: `TikTok API returned error code: ${tokenData.code}`, 
              details: tokenData,
              status: 400
            }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        
        const accessToken = tokenData.data.access_token;
        const refreshToken = tokenData.data.refresh_token;
        const expiresIn = tokenData.data.expires_in;
        const advertiserId = tokenData.data.advertiser_ids?.[0];

        if (!advertiserId) {
          return new Response(
            JSON.stringify({ error: "No advertiser account found", status: 400 }),
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
            token_expires_at: new Date(Date.now() + (expiresIn * 1000)).toISOString(),
            scopes: ['ads.basic', 'ads.manage', 'billing.basic'],
            is_active: true
          });

        if (insertError) {
          console.error("Database insertion error:", insertError);
          return new Response(
            JSON.stringify({ error: "Failed to save connection details", details: insertError, status: 500 }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            advertiser_id: advertiserId,
            redirect: `${APP_URL}/dashboard/ad-accounts?platform=tiktok&success=true` 
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (error) {
        console.error("TikTok token exchange error:", error);
        return new Response(
          JSON.stringify({ error: `Token exchange failed: ${error.message}`, status: 500 }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
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
          JSON.stringify({ error: "Connection not found", status: 404 }),
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
          JSON.stringify({ error: "Failed to update connection status", details: updateError, status: 500 }),
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
        JSON.stringify({ error: "Invalid action", status: 400 }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    console.error(`TikTok auth error: ${err.message}`);
    return new Response(
      JSON.stringify({ error: err.message, status: 500 }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
