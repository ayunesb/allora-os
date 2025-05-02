
import { supabase } from '@/integrations/supabase/client';

/**
 * Check if the current tenant is in demo mode
 * @param tenantId The tenant ID to check
 * @returns Boolean indicating if this is a demo tenant
 */
export async function isDemoTenant(tenantId?: string): Promise<boolean> {
  if (!tenantId) return false;
  
  try {
    // First check in tenants table
    const { data, error } = await supabase
      .from('tenants')
      .select('is_demo')
      .eq('id', tenantId)
      .maybeSingle();
    
    if (error) throw error;
    
    // If we explicitly found is_demo flag, return it
    if (data && 'is_demo' in data) {
      return !!data.is_demo;
    }
    
    // If no is_demo flag found but we have an environment variable, check that
    const demoTenantId = process.env.DEMO_TENANT_ID || '';
    if (demoTenantId) {
      return tenantId === demoTenantId;
    }
    
    // Default to false
    return false;
  } catch (error) {
    console.error('Error checking if demo tenant:', error);
    return false;
  }
}

/**
 * Check if a given user is associated with a demo tenant
 * @param userId The user ID to check
 * @returns Boolean indicating if this user is in a demo tenant
 */
export async function isUserInDemoTenant(userId?: string): Promise<boolean> {
  if (!userId) return false;
  
  try {
    // Get user's tenant
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', userId)
      .maybeSingle();
      
    if (profileError || !profile?.tenant_id) return false;
    
    // Check if the tenant is in demo mode
    return await isDemoTenant(profile.tenant_id);
  } catch (error) {
    console.error('Error checking if user is in demo tenant:', error);
    return false;
  }
}
