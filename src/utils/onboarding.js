import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
/**
 * Create a new tenant and assign the current user as admin
 * @param userId Current user ID
 * @param companyData Company profile data
 * @returns Success status
 */
export async function createTenant(userId, companyData) {
    if (!userId) {
        return { success: false, error: 'User ID is required' };
    }
    try {
        // First create the tenant
        const { data: tenant, error: tenantError } = await supabase
            .from('tenants')
            .insert([{ name: companyData.name }])
            .select('id')
            .single();
        if (tenantError)
            throw tenantError;
        const tenantId = tenant.id;
        // Create company profile
        const { error: companyError } = await supabase
            .from('company_profiles')
            .insert([{
                tenant_id: tenantId,
                company_name: companyData.name,
                industry: companyData.industry,
                website_url: companyData.website_url,
                target_customer: companyData.target_customer
            }]);
        if (companyError)
            throw companyError;
        // Associate user with tenant
        const { error: userTenantError } = await supabase
            .from('tenant_users')
            .insert([{
                tenant_id: tenantId,
                user_id: userId,
                role: 'admin'
            }]);
        if (userTenantError)
            throw userTenantError;
        // Update user's profile with tenant ID
        const { error: profileError } = await supabase
            .from('profiles')
            .update({ tenant_id: tenantId, onboarding_complete: true })
            .eq('id', userId);
        if (profileError)
            throw profileError;
        return { success: true, tenantId };
    }
    catch (error) {
        console.error('Error creating tenant:', error);
        return { success: false, error: error instanceof Error ? error.message : 'Unknown error creating tenant' };
    }
}
/**
 * Check if onboarding is complete for a user
 * @param userId The user ID to check
 */
export async function checkOnboardingStatus(userId) {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('onboarding_complete')
            .eq('id', userId)
            .single();
        if (error)
            throw error;
        return !!data?.onboarding_complete;
    }
    catch (error) {
        console.error('Error checking onboarding status:', error);
        return false;
    }
}
/**
 * Complete the onboarding process
 */
export async function completeOnboarding(userId, data) {
    try {
        // Create tenant and company profile
        const result = await createTenant(userId, {
            name: data.companyName,
            industry: data.industry,
            website_url: data.website || data.companyDetails?.website_url,
            target_customer: data.companyDetails?.target_customer,
            risk_appetite: data.riskAppetite,
            goals: data.goals
        });
        if (!result.success) {
            toast.error('Failed to complete onboarding', {
                description: result.error || 'Please try again'
            });
            return false;
        }
        toast.success('Onboarding completed successfully!');
        return true;
    }
    catch (error) {
        console.error('Error completing onboarding:', error);
        toast.error('Failed to complete onboarding');
        return false;
    }
}
// Recreate the function that was missing and caused the build errors
export async function saveOnboardingInfo(userId, data) {
    try {
        if (!userId) {
            console.error('No user ID provided for saving onboarding info');
            return false;
        }
        const { error } = await supabase
            .from('profiles')
            .update({
            onboarding_step: data.step,
            industry: data.industry,
            ...data
        })
            .eq('id', userId);
        if (error)
            throw error;
        return true;
    }
    catch (error) {
        console.error('Error saving onboarding info:', error);
        return false;
    }
}
