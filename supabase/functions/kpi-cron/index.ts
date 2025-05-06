import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Helper function to log errors to audit_logs
async function logError(supabase, error) {
  try {
    await supabase.from("audit_logs").insert({
      action: "kpi_cron_job",
      result: "error",
      details: {
        error: error.message,
        stack: error.stack,
      },
    });
  } catch (logError) {
    console.error("Error logging to audit_logs:", logError);
  }
}

// Helper function to send Slack alert
async function sendSlackAlert(message) {
  try {
    const webhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");
    if (!webhookUrl) return;

    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `🔔 KPI CRON Alert: ${message}`,
      }),
    });
  } catch (error) {
    console.error("Error sending Slack alert:", error);
  }
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get all active tenants
    const { data: tenants, error: tenantError } = await supabase
      .from("tenants")
      .select("id, name");

    if (tenantError) throw tenantError;

    // Initialize KPI tracking metrics
    const results = {
      success_count: 0,
      error_count: 0,
      tenants_processed: [],
      errors: [],
    };

    // Process each tenant
    for (const tenant of tenants) {
      try {
        // Calculate KPIs for this tenant
        const tenantMetrics = await calculateTenantKPIs(supabase, tenant.id);

        // Store the calculated KPI metrics
        for (const [type, value] of Object.entries(tenantMetrics)) {
          const { error } = await supabase.from("kpi_metrics").insert({
            tenant_id: tenant.id,
            type,
            value,
            recorded_at: new Date().toISOString(),
          });

          if (error) throw error;
        }

        results.success_count++;
        results.tenants_processed.push({
          tenant_id: tenant.id,
          tenant_name: tenant.name,
          metrics: Object.keys(tenantMetrics),
        });
      } catch (error) {
        console.error(`Error processing tenant ${tenant.id}:`, error);

        results.error_count++;
        results.errors.push({
          tenant_id: tenant.id,
          tenant_name: tenant.name,
          error: error.message,
        });

        await logError(supabase, error);
      }
    }

    // Log completion to audit_logs
    await supabase.from("audit_logs").insert({
      action: "kpi_cron_job",
      result: results.error_count === 0 ? "success" : "partial",
      details: results,
    });

    // Send alert if there were errors
    if (results.error_count > 0) {
      await sendSlackAlert(
        `KPI CRON completed with ${results.error_count} errors out of ${tenants.length} tenants`,
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        results,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error in KPI CRON job:", error);

    // Create a Supabase client for error logging
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
      const supabase = createClient(supabaseUrl, supabaseKey);

      await logError(supabase, error);
      await sendSlackAlert(`KPI CRON job failed: ${error.message}`);
    } catch (logError) {
      console.error("Error logging failure:", logError);
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      },
    );
  }
});

// Calculate KPIs for a tenant
async function calculateTenantKPIs(supabase, tenantId) {
  // Get strategies
  const { data: strategies } = await supabase
    .from("strategies")
    .select("id, status")
    .eq("tenant_id", tenantId);

  // Get campaigns
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("id, status, roi")
    .eq("tenant_id", tenantId);

  // Get plugin logs
  const { data: pluginLogs } = await supabase
    .from("plugin_logs")
    .select("value")
    .eq("tenant_id", tenantId)
    .eq("event", "execution");

  // Calculate metrics
  const activeStrategies =
    strategies?.filter((s) => s.status === "active").length || 0;
  const totalROI =
    campaigns?.reduce((sum, campaign) => sum + (campaign.roi || 0), 0) || 0;
  const pluginROI =
    pluginLogs?.reduce((sum, log) => sum + (log.value || 0), 0) || 0;

  return {
    active_strategies: activeStrategies,
    total_roi: totalROI,
    plugin_roi: pluginROI,
    campaign_count: campaigns?.length || 0,
    strategy_count: strategies?.length || 0,
  };
}
