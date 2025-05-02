
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Environment variables
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

// Initialize the Supabase client with the service role key (admin privileges)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

Deno.serve(async (req) => {
  // Only support POST requests for webhook
  if (req.method === 'GET') {
    try {
      // This endpoint will be scheduled by a CRON job to run daily
      await syncKpiMetrics();
      
      return new Response(JSON.stringify({ success: true, message: 'KPI sync completed' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Error in KPI sync:', error);
      
      return new Response(JSON.stringify({ 
        error: 'Failed to sync KPI metrics', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } else {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

/**
 * Synchronize KPI metrics from various sources
 */
async function syncKpiMetrics() {
  console.log('Starting KPI metrics sync');
  
  // Get active tenants
  const { data: tenants, error: tenantError } = await supabase
    .from('tenants')
    .select('id')
    .order('created_at', { ascending: false });
    
  if (tenantError) {
    console.error('Error fetching tenants:', tenantError);
    throw tenantError;
  }
  
  if (!tenants || tenants.length === 0) {
    console.log('No tenants found, exiting sync');
    return;
  }
  
  console.log(`Found ${tenants.length} tenants to process`);
  
  for (const tenant of tenants) {
    try {
      await syncTenantMetrics(tenant.id);
    } catch (error) {
      console.error(`Error syncing metrics for tenant ${tenant.id}:`, error);
      // Continue with next tenant
    }
  }
  
  console.log('KPI metrics sync completed');
}

/**
 * Sync metrics for a specific tenant
 */
async function syncTenantMetrics(tenantId: string) {
  console.log(`Syncing metrics for tenant ${tenantId}`);
  
  // Calculate MRR from revenue data
  const mrrValue = await calculateMRR(tenantId);
  
  // Fetch lead count
  const leadCount = await getLeadCount(tenantId);
  
  // Calculate plugin ROI
  const pluginRoi = await calculatePluginROI(tenantId);
  
  // Calculate churn rate
  const churnRate = await calculateChurnRate(tenantId);
  
  // Insert new KPI metrics
  const metrics = [
    { type: 'mrr', value: mrrValue, tenant_id: tenantId },
    { type: 'leads', value: leadCount, tenant_id: tenantId },
    { type: 'roi', value: pluginRoi, tenant_id: tenantId },
    { type: 'churn_rate', value: churnRate, tenant_id: tenantId },
  ];
  
  const { error } = await supabase
    .from('kpi_metrics')
    .insert(metrics);
    
  if (error) {
    console.error(`Error inserting KPI metrics for tenant ${tenantId}:`, error);
    throw error;
  }
  
  console.log(`Inserted ${metrics.length} metrics for tenant ${tenantId}`);
}

/**
 * Calculate Monthly Recurring Revenue (MRR) for a tenant
 */
async function calculateMRR(tenantId: string): Promise<number> {
  try {
    // This would typically come from Stripe or another payment provider
    // For demo purposes, we'll use a random value or fetch from campaigns
    
    const { data: campaigns, error } = await supabase
      .from('campaigns')
      .select('roi')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(10);
      
    if (error) {
      console.error('Error fetching campaigns for MRR:', error);
      // Return a fallback random value
      return Math.floor(Math.random() * 10000) + 1000;
    }
    
    if (!campaigns || campaigns.length === 0) {
      // Return a baseline value
      return 2000 + Math.floor(Math.random() * 1000);
    }
    
    // Sum up ROI values and use as MRR baseline
    const totalRoi = campaigns.reduce((sum, campaign) => sum + (campaign.roi || 0), 0);
    const mrr = totalRoi * 2 + 3000; // Simple algorithm for demo
    
    return mrr;
  } catch (error) {
    console.error('Error calculating MRR:', error);
    return 5000; // Fallback value
  }
}

/**
 * Get lead count for a tenant
 */
async function getLeadCount(tenantId: string): Promise<number> {
  try {
    // In a real system, this would query a leads or customers table
    // For demo purposes, we'll generate a random count
    return Math.floor(Math.random() * 100) + 10;
  } catch (error) {
    console.error('Error getting lead count:', error);
    return 25; // Fallback value
  }
}

/**
 * Calculate plugin ROI for a tenant
 */
async function calculatePluginROI(tenantId: string): Promise<number> {
  try {
    const { data: logs, error } = await supabase
      .from('plugin_logs')
      .select('value')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false })
      .limit(20);
      
    if (error) {
      console.error('Error fetching plugin logs for ROI:', error);
      return 15; // Fallback ROI percentage
    }
    
    if (!logs || logs.length === 0) {
      return 10; // Baseline ROI
    }
    
    // Calculate average value as ROI
    const totalValue = logs.reduce((sum, log) => sum + (log.value || 0), 0);
    const avgRoi = totalValue / logs.length;
    
    return avgRoi > 0 ? avgRoi : 12;
  } catch (error) {
    console.error('Error calculating plugin ROI:', error);
    return 8; // Fallback value
  }
}

/**
 * Calculate churn rate for a tenant
 */
async function calculateChurnRate(tenantId: string): Promise<number> {
  // In a real system, this would analyze customer retention/churn
  // For demo purposes, we'll use a random value between 1% and 6%
  return Math.random() * 5 + 1;
}
