
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

interface PluginImpactRow {
  tenant_id: string;
  plugin_name: string;
  total_value: number;
  usage_count: number;
  average_value: number;
  tenant_name?: string;
}

Deno.serve(async (req) => {
  // Create Supabase client with service role key for higher privileges
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  
  try {
    // Retrieve authorization from request
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Analyze plugin impact data
    const { data: pluginLogs, error: pluginError } = await supabase
      .from('plugin_logs')
      .select('tenant_id, plugin_name, value, created_at');
    
    if (pluginError) {
      console.error('Error fetching plugin logs:', pluginError);
      return new Response(JSON.stringify({ error: 'Failed to retrieve plugin logs' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (!pluginLogs || pluginLogs.length === 0) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Aggregate data by tenant and plugin
    const impactMap = new Map();
    
    for (const log of pluginLogs) {
      const key = `${log.tenant_id}-${log.plugin_name}`;
      
      if (!impactMap.has(key)) {
        impactMap.set(key, {
          tenant_id: log.tenant_id,
          plugin_name: log.plugin_name,
          total_value: 0,
          usage_count: 0,
          average_value: 0
        });
      }
      
      const entry = impactMap.get(key);
      entry.total_value += log.value || 0;
      entry.usage_count += 1;
      entry.average_value = entry.total_value / entry.usage_count;
    }
    
    // Get tenant names
    const tenantIds = [...new Set(pluginLogs.map(log => log.tenant_id))];
    
    const { data: tenants, error: tenantError } = await supabase
      .from('tenants')
      .select('id, name')
      .in('id', tenantIds);
    
    if (!tenantError && tenants) {
      const tenantMap = new Map(tenants.map(t => [t.id, t.name]));
      
      // Add tenant names to results
      for (const [_, impact] of impactMap.entries()) {
        impact.tenant_name = tenantMap.get(impact.tenant_id) || undefined;
      }
    }
    
    const results: PluginImpactRow[] = Array.from(impactMap.values());
    
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in plugin-impact function:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
