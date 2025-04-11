
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface OnboardingCompletionResult {
  success: boolean;
  error?: string;
}

/**
 * Marks the onboarding process as complete for a user
 */
export async function completeOnboarding(
  userId: string,
  companyId: string,
  industry: string
): Promise<OnboardingCompletionResult> {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!companyId) {
      throw new Error("Company ID is required");
    }

    console.log(`Completing onboarding for user ${userId} with company ${companyId}`);

    // First, get the current company details
    const { data: companyData, error: fetchError } = await supabase
      .from('companies')
      .select('details')
      .eq('id', companyId)
      .single();
      
    if (fetchError) {
      console.error("Error fetching company details:", fetchError);
      throw new Error(`Failed to fetch company details: ${fetchError.message}`);
    }
    
    // Get existing details or start with an empty object
    const existingDetails = companyData?.details || {};
    
    // Merge existing details with completion flags
    const updatedDetails = {
      ...existingDetails,
      onboarding_completed: true,
      onboarding_completed_at: new Date().toISOString(),
      industry
    };

    console.log("Updating company with details:", updatedDetails);

    // Update the company with onboarding_completed flag
    const { error: companyError } = await supabase
      .from('companies')
      .update({
        details: updatedDetails,
        industry: industry
      })
      .eq('id', companyId);

    if (companyError) {
      console.error("Error updating company:", companyError);
      throw new Error(`Failed to update company: ${companyError.message}`);
    }

    // Update the user profile with onboarding_completed flag
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        onboarding_completed: true,
        onboarding_completed_at: new Date().toISOString(),
        industry: industry
      })
      .eq('id', userId);

    if (profileError) {
      console.error("Error updating profile:", profileError);
      throw new Error(`Failed to update profile: ${profileError.message}`);
    }

    console.log("Onboarding completed successfully!");
    return { success: true };
  } catch (error: any) {
    console.error("Error completing onboarding:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred"
    };
  }
}
