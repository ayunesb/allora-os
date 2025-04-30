
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

  try {
    // Get environment variables
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required environment variables for Supabase");
    }

    // Create a Supabase client with the service role key
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    });

    // Get all tenants
    const { data: tenants, error: tenantsError } = await supabase
      .from('tenants')
      .select('id');

    if (tenantsError) {
      throw tenantsError;
    }

    console.log(`Processing KPI metrics for ${tenants?.length || 0} tenants`);

    // For each tenant, update KPI metrics
    for (const tenant of tenants || []) {
      const tenantId = tenant.id;

      // In a real application, these values would come from actual sources like Stripe, CRM, etc.
      const mrr = Math.floor(Math.random() * 10000);
      const leads = Math.floor(Math.random() * 200);

      // Insert KPI metrics
      const { error: insertError } = await supabase
        .from('kpi_metrics')
        .insert([
          { tenant_id: tenantId, type: 'mrr', value: mrr },
          { tenant_id: tenantId, type: 'leads', value: leads }
        ]);

      if (insertError) {
        console.error(`Error inserting KPI metrics for tenant ${tenantId}:`, insertError);
      } else {
        console.log(`Updated KPI metrics for tenant ${tenantId}`);
      }
    }

    return new Response(JSON.stringify({ success: true, message: 'KPI sync completed successfully' }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200
    });
  } catch (error) {
    console.error("Error in KPI CRON job:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500
    });
  }
});
