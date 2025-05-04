// Re-export for simplified imports
export * from './saveOnboarding';
export * from './completeOnboarding';
import { supabase } from '@/integrations/supabase/client';
/**
 * Checks if a user has already completed onboarding
 * @param userId The user ID to check
 * @returns Boolean indicating if onboarding is completed
 */
export async function checkOnboardingStatus(userId) {
    try {
        if (!userId)
            return false;
        // First, check the profile table for the onboarding_completed flag
        const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('onboarding_completed, company_id')
            .eq('id', userId)
            .single();
        if (profileError) {
            console.error("Error checking profile onboarding status:", profileError);
            return false;
        }
        // If the profile has the onboarding_completed flag set, onboarding is completed
        if (profileData?.onboarding_completed === true) {
            return true;
        }
        // If the profile has a company_id, check the company's onboarding status
        if (profileData?.company_id) {
            const { data: companyData, error: companyError } = await supabase
                .from('companies')
                .select('details')
                .eq('id', profileData.company_id)
                .single();
            if (companyError) {
                console.error("Error checking company onboarding status:", companyError);
                return false;
            }
            // Check if the company has the onboarding_completed flag in its details
            if (companyData?.details?.onboarding_completed === true) {
                return true;
            }
        }
        // If we got here, onboarding is not completed
        return false;
    }
    catch (error) {
        console.error("Error in checkOnboardingStatus:", error);
        return false;
    }
}
