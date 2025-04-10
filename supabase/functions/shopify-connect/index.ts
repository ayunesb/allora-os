
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
  const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

  try {
    // Parse request body
    const { userId, shopDomain, accessToken } = await req.json();

    if (!userId || !shopDomain) {
      return new Response(
        JSON.stringify({ error: "userId and shopDomain are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Get user profile data
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch user profile" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const companyId = profile.company_id;
    
    if (!companyId) {
      return new Response(
        JSON.stringify({ error: "User does not have an associated company" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Store Shopify integration details
    const { data: integrationData, error: integrationError } = await supabase
      .from("company_integrations")
      .upsert({
        company_id: companyId,
        integration_ids: {
          shopify: {
            domain: shopDomain,
            access_token: accessToken,
            connected_at: new Date().toISOString()
          }
        }
      }, {
        onConflict: 'company_id'
      })
      .select();

    if (integrationError) {
      console.error("Error storing Shopify integration:", integrationError);
      return new Response(
        JSON.stringify({ error: "Failed to store Shopify integration" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get shop info if access token is provided
    let shopInfo = null;
    if (accessToken) {
      try {
        const shopResponse = await fetch(`https://${shopDomain}/admin/api/2023-07/shop.json`, {
          headers: {
            "X-Shopify-Access-Token": accessToken
          }
        });

        if (shopResponse.ok) {
          const shopData = await shopResponse.json();
          shopInfo = shopData.shop;
        }
      } catch (shopError) {
        console.error("Error fetching Shopify shop info:", shopError);
        // Continue even if shop info fetch fails
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Shopify integration saved successfully",
        shop: shopInfo
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in shopify-connect function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
