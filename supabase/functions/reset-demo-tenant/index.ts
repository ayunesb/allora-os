
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { sendSlackAlert } from "./slack.ts"

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper to log actions to the audit_logs table
async function logAction(supabase, tenantId, action, result, details = {}) {
  try {
    await supabase.from('audit_logs').insert({
      tenant_id: tenantId,
      action,
      result,
      details
    });
  } catch (error) {
    console.error('Error logging action:', error);
  }
}

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get the demo tenant ID from environment or request
    let demoTenantId;
    
    try {
      const body = await req.json();
      demoTenantId = body.tenant_id;
    } catch {
      demoTenantId = Deno.env.get('DEMO_TENANT_ID');
    }
    
    if (!demoTenantId) {
      throw new Error('Demo tenant ID not provided');
    }

    // Start a log of reset operations
    const startTime = new Date();
    let resetLog = {
      timestamp: startTime.toISOString(),
      tables_reset: [],
      errors: []
    };

    // Define tables to reset for demo tenant, in order of dependency
    const tables = [
      'plugin_logs',
      'kpi_metrics',
      'executive_messages',
      'campaigns',
      'strategies',
      'tenant_activity_logs',
      'tenant_alerts'
    ];
    
    // Reset each table
    for (const table of tables) {
      try {
        const { error } = await supabase
          .from(table)
          .delete()
          .eq('tenant_id', demoTenantId);
          
        if (error) throw error;
        
        resetLog.tables_reset.push(table);
      } catch (error) {
        console.error(`Error resetting ${table}:`, error);
        resetLog.errors.push({
          table,
          error: error.message
        });
      }
    }

    // Log the reset event
    await logAction(
      supabase,
      demoTenantId,
      'reset_demo_tenant',
      resetLog.errors.length === 0 ? 'success' : 'partial',
      resetLog
    );
    
    // Send alert if there were errors
    if (resetLog.errors.length > 0) {
      await sendSlackAlert(
        `Demo tenant reset completed with ${resetLog.errors.length} errors`,
        'warning'
      );
    }

    // Return success
    return new Response(
      JSON.stringify({
        success: true,
        reset_time: startTime.toISOString(),
        tables_reset: resetLog.tables_reset,
        errors: resetLog.errors
      }),
      { 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );
  } catch (error) {
    // Log and return error
    console.error('Error in reset-demo-tenant:', error);
    
    try {
      // Try to send alert
      await sendSlackAlert(
        `Demo tenant reset failed: ${error.message}`,
        'error'
      );
    } catch (slackError) {
      console.error('Error sending Slack alert:', slackError);
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500, 
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        } 
      }
    );
  }
})
