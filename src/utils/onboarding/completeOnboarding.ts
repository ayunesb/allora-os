
import { supabase } from '@/integrations/supabase/client';

interface CompletionResult {
  success: boolean;
  error?: string;
}

/**
 * Completes the user onboarding process by setting the onboarding_completed flag in the profile
 */
export async function completeOnboarding(
  userId: string,
  companyId: string,
  industry: string,
  platformConnections?: {
    meta?: boolean;
    tiktok?: boolean;
  }
): Promise<CompletionResult> {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }
    
    if (!companyId) {
      throw new Error("Company ID is required");
    }

    console.log(`Completing onboarding for user ${userId} with company ${companyId}`);

    // Store platform connections info in company details if provided
    if (platformConnections) {
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('details')
        .eq('id', companyId)
        .single();
        
      if (companyError && companyError.code !== 'PGRST116') {
        console.error("Error fetching company details:", companyError);
        throw new Error(`Failed to update ad platform connections: ${companyError.message}`);
      }
      
      const updatedDetails = {
        ...(company?.details || {}),
        ad_platforms: {
          meta_connected: platformConnections.meta || false,
          tiktok_connected: platformConnections.tiktok || false,
          last_updated: new Date().toISOString()
        }
      };
      
      const { error: updateError } = await supabase
        .from('companies')
        .update({ details: updatedDetails })
        .eq('id', companyId);
        
      if (updateError) {
        console.error("Error updating company with platform connections:", updateError);
        // Continue with onboarding completion even if this fails
      }
    }

    // Mark the onboarding as completed in the user's profile
    const { error: profileUpdateError } = await supabase
      .from('profiles')
      .update({
        onboarding_completed: true,
        onboarding_completed_at: new Date().toISOString()
      })
      .eq('id', userId);
      
    if (profileUpdateError) {
      console.error("Error updating profile onboarding status:", profileUpdateError);
      throw new Error(`Failed to complete onboarding: ${profileUpdateError.message}`);
    }

    console.log("Onboarding completed successfully!");
    return { success: true };
  } catch (error: any) {
    console.error("Error in completeOnboarding:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred"
    };
  }
}
