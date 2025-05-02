
import { createClient } from '@supabase/supabase-js';
import { sendSlackAlert } from './slack.ts';

// Get Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') as string;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') as string;
const demoTenantId = Deno.env.get('DEMO_TENANT_ID');

const supabase = createClient(supabaseUrl, supabaseServiceKey);

Deno.serve(async (req) => {
  try {
    // Check for scheduled cron job header
    const isCronRequest = req.headers.get('Authorization') === `Bearer ${Deno.env.get('CRON_SECRET')}`;
    
    if (!req.method === 'POST' && !isCronRequest) {
      return new Response('Method not allowed', { status: 405 });
    }

    if (!demoTenantId) {
      await sendSlackAlert('No demo tenant ID set in environment variables', 'warning');
      return new Response(
        JSON.stringify({ error: 'No demo tenant ID configured' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Begin reset process
    await sendSlackAlert(`Starting reset of demo tenant: ${demoTenantId}`, 'info');
    
    // Reset all user-generated content
    const tables = [
      'campaigns',
      'strategies',
      'leads',
      'plugin_logs',
      'kpi_metrics',
      'messages',
      'social_media_posts',
      'executive_messages',
      'webhook_events'
    ];
    
    // Process each table
    for (const table of tables) {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('tenant_id', demoTenantId);
        
      if (error) {
        await sendSlackAlert(`Failed to reset table ${table}: ${error.message}`, 'error');
        throw error;
      }
    }
    
    // Reset tenant-specific settings back to defaults
    const { error: updateError } = await supabase
      .from('tenant_profiles')
      .update({ 
        settings: { demo_reset_count: Deno.env.get('demo_reset_count') || 0 + 1 },
        updated_at: new Date().toISOString()
      })
      .eq('id', demoTenantId);
    
    if (updateError) {
      await sendSlackAlert(`Failed to update tenant profile: ${updateError.message}`, 'error');
    }
    
    await sendSlackAlert(`Demo tenant ${demoTenantId} reset complete`, 'info');
    
    return new Response(
      JSON.stringify({ success: true, message: 'Demo tenant reset complete' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    await sendSlackAlert(`Demo tenant reset failed: ${error.message}`, 'error');
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
