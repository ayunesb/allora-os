import { supabase } from '@/integrations/supabase/client';
/**
 * Check if the current tenant is the demo tenant
 * @param tenantId The tenant ID to check
 */
export async function isDemoTenant(tenantId) {
    if (!tenantId)
        return false;
    const demoTenantId = import.meta.env.VITE_DEMO_TENANT_ID;
    if (demoTenantId && tenantId === demoTenantId) {
        return true;
    }
    try {
        // Additional check against database if needed
        const { data, error } = await supabase
            .from('tenant_profiles')
            .select('settings')
            .eq('id', tenantId)
            .single();
        if (error)
            throw error;
        return data?.settings?.is_demo === true;
    }
    catch (error) {
        console.error('Error checking demo tenant status:', error);
        return false;
    }
}
/**
 * Reset the demo tenant to its initial state
 * @param tenantId The tenant ID to reset
 */
export async function resetDemoTenant(tenantId) {
    if (!tenantId)
        return false;
    try {
        // Check if this is actually a demo tenant first
        const isDemo = await isDemoTenant(tenantId);
        if (!isDemo) {
            console.error('Cannot reset non-demo tenant');
            return false;
        }
        // Call the edge function to reset the demo tenant
        const { data, error } = await supabase.functions.invoke('reset-demo-tenant', {
            body: { tenant_id: tenantId }
        });
        if (error)
            throw error;
        return data?.success === true;
    }
    catch (error) {
        console.error('Error resetting demo tenant:', error);
        return false;
    }
}
