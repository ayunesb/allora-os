import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.0";

const SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const META_API_VERSION = "v18.0";
const TIKTOK_API_VERSION = "v1.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
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

  try {
    // Get user from auth
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get request body
    const { action, campaignId } = await req.json();

    if (!campaignId) {
      return new Response(
        JSON.stringify({ error: "Campaign ID is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Get campaign details
    const { data: campaign, error: campaignError } = await supabase
      .from("campaigns")
      .select("*, companies(id)")
      .eq("id", campaignId)
      .single();

    if (campaignError || !campaign) {
      return new Response(
        JSON.stringify({ error: "Campaign not found", details: campaignError }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Check if payment is complete
    if (campaign.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ error: "Campaign payment not completed" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Get ad platform connection
    const { data: connection, error: connectionError } = await supabase
      .from("ad_platform_connections")
      .select("*")
      .eq("company_id", campaign.company_id)
      .eq("platform", campaign.ad_platform)
      .eq("is_active", true)
      .single();

    if (connectionError || !connection) {
      return new Response(
        JSON.stringify({
          error: `No active ${campaign.ad_platform} connection found`,
          details: connectionError,
        }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Check if token is expired
    if (new Date(connection.token_expires_at) < new Date()) {
      return new Response(
        JSON.stringify({
          error: "Ad platform token expired. Please reconnect your account.",
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    if (action === "deploy") {
      // Deploy to the appropriate ad platform
      if (campaign.ad_platform === "meta") {
        // Deploy to Meta Ads
        const response = await deployToMetaAds(campaign, connection);
        return new Response(JSON.stringify(response), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else if (campaign.ad_platform === "tiktok") {
        // Deploy to TikTok Ads
        const response = await deployToTikTokAds(campaign, connection);
        return new Response(JSON.stringify(response), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        return new Response(
          JSON.stringify({ error: "Unsupported ad platform" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
    } else if (action === "sync") {
      // Sync campaign data from the ad platform
      if (campaign.ad_platform === "meta") {
        // Sync from Meta Ads
        const response = await syncFromMetaAds(campaign, connection);
        return new Response(JSON.stringify(response), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else if (campaign.ad_platform === "tiktok") {
        // Sync from TikTok Ads
        const response = await syncFromTikTokAds(campaign, connection);
        return new Response(JSON.stringify(response), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } else {
        return new Response(
          JSON.stringify({ error: "Unsupported ad platform" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
    } else {
      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    console.error(`Campaign deployment error: ${err.message}`);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

// Function to deploy campaign to Meta Ads
async function deployToMetaAds(campaign, connection) {
  try {
    // In a real implementation, this would use the Meta Marketing API to create a campaign
    // For demo purposes, we'll simulate a successful deployment

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate a mock platform-specific ID
    const platformCampaignId = `fb_${Math.floor(Math.random() * 1000000000)}`;

    // Update campaign in database with platform-specific ID and status
    const { error } = await supabase
      .from("campaigns")
      .update({
        platform_specific_id: platformCampaignId,
        platform_status: "ACTIVE",
        deployment_status: "deployed",
        last_synced_at: new Date().toISOString(),
      })
      .eq("id", campaign.id);

    if (error) {
      throw new Error(`Failed to update campaign status: ${error.message}`);
    }

    return {
      success: true,
      platform_campaign_id: platformCampaignId,
      status: "ACTIVE",
      message: "Campaign successfully deployed to Meta Ads",
    };
  } catch (error) {
    console.error("Meta deployment error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Function to deploy campaign to TikTok Ads
async function deployToTikTokAds(campaign, connection) {
  try {
    // In a real implementation, this would use the TikTok Ads API to create a campaign
    // For demo purposes, we'll simulate a successful deployment

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate a mock platform-specific ID
    const platformCampaignId = `tt_${Math.floor(Math.random() * 1000000000)}`;

    // Update campaign in database with platform-specific ID and status
    const { error } = await supabase
      .from("campaigns")
      .update({
        platform_specific_id: platformCampaignId,
        platform_status: "CAMPAIGN_STATUS_ENABLE",
        deployment_status: "deployed",
        last_synced_at: new Date().toISOString(),
      })
      .eq("id", campaign.id);

    if (error) {
      throw new Error(`Failed to update campaign status: ${error.message}`);
    }

    return {
      success: true,
      platform_campaign_id: platformCampaignId,
      status: "CAMPAIGN_STATUS_ENABLE",
      message: "Campaign successfully deployed to TikTok Ads",
    };
  } catch (error) {
    console.error("TikTok deployment error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Function to sync campaign data from Meta Ads
async function syncFromMetaAds(campaign, connection) {
  try {
    // In a real implementation, this would use the Meta Marketing API to get campaign insights
    // For demo purposes, we'll generate mock performance metrics

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate mock performance metrics
    const metrics = {
      impressions: Math.floor(Math.random() * 100000) + 5000,
      clicks: Math.floor(Math.random() * 5000) + 100,
      ctr: (Math.random() * 5 + 0.5).toFixed(2),
      spend: (Math.random() * campaign.budget * 0.8).toFixed(2),
      conversions: Math.floor(Math.random() * 100) + 5,
      cpa: (Math.random() * 50 + 10).toFixed(2),
    };

    // Update campaign in database with performance metrics
    const { error } = await supabase
      .from("campaigns")
      .update({
        performance_metrics: metrics,
        last_synced_at: new Date().toISOString(),
      })
      .eq("id", campaign.id);

    if (error) {
      throw new Error(`Failed to update campaign metrics: ${error.message}`);
    }

    return {
      success: true,
      metrics,
      message: "Campaign metrics successfully synced from Meta Ads",
    };
  } catch (error) {
    console.error("Meta sync error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// Function to sync campaign data from TikTok Ads
async function syncFromTikTokAds(campaign, connection) {
  try {
    // In a real implementation, this would use the TikTok Ads API to get campaign insights
    // For demo purposes, we'll generate mock performance metrics

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Generate mock performance metrics
    const metrics = {
      impressions: Math.floor(Math.random() * 150000) + 10000,
      clicks: Math.floor(Math.random() * 8000) + 200,
      ctr: (Math.random() * 7 + 0.8).toFixed(2),
      spend: (Math.random() * campaign.budget * 0.7).toFixed(2),
      conversions: Math.floor(Math.random() * 80) + 10,
      cpa: (Math.random() * 40 + 15).toFixed(2),
      video_views: Math.floor(Math.random() * 80000) + 5000,
    };

    // Update campaign in database with performance metrics
    const { error } = await supabase
      .from("campaigns")
      .update({
        performance_metrics: metrics,
        last_synced_at: new Date().toISOString(),
      })
      .eq("id", campaign.id);

    if (error) {
      throw new Error(`Failed to update campaign metrics: ${error.message}`);
    }

    return {
      success: true,
      metrics,
      message: "Campaign metrics successfully synced from TikTok Ads",
    };
  } catch (error) {
    console.error("TikTok sync error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}

// In a production environment, we would implement functions to:
// 1. Create ad creatives
// 2. Set up targeting
// 3. Define budget and schedule
// 4. Create the campaign
// 5. Create ad sets/ad groups
// 6. Create ads
// 7. Sync campaign performance data
