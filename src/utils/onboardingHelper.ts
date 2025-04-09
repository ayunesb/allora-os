
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PartialCompanyDetails } from '@/models/companyDetails';

interface OnboardingResult {
  success: boolean;
  error?: string;
}

export async function saveOnboardingInfo(
  userId: string,
  companyName: string,
  industry: string,
  goals: string[],
  companyDetails?: PartialCompanyDetails
): Promise<OnboardingResult> {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!companyName || companyName.trim().length < 2) {
      throw new Error("Company name is required and must be at least 2 characters");
    }

    if (!industry) {
      throw new Error("Industry is required");
    }

    if (!goals.length) {
      throw new Error("At least one business goal must be selected");
    }

    console.log("Saving onboarding info:", { userId, companyName, industry, goals });
    console.log("Company details:", companyDetails);

    // First, get the authenticated user's session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error("No active session found. Please log in again.");
    }

    // Check if the user already has a company_id in their profile
    const { data: profileData, error: profileCheckError } = await supabase
      .from('profiles')
      .select('company_id, company')
      .eq('id', userId)
      .single();
      
    if (profileCheckError && profileCheckError.code !== 'PGRST116') {
      console.error("Profile check error:", profileCheckError);
      throw new Error(`Failed to check user profile: ${profileCheckError.message}`);
    }
    
    let companyId: string | null = null;
    
    // If user already has a company, update it instead of creating a new one
    if (profileData?.company_id) {
      console.log("User already has a company, updating existing company:", profileData.company_id);
      
      const { error: updateError } = await supabase
        .from('companies')
        .update({
          name: companyName,
          industry: industry,
          details: companyDetails || {}
        })
        .eq('id', profileData.company_id);
        
      if (updateError) {
        console.error("Company update error:", updateError);
        throw new Error(`Failed to update company: ${updateError.message}`);
      }
      
      companyId = profileData.company_id;
    } else {
      // Create a new company
      // This time we'll use a different approach - create the profile with empty company_id first
      // Then create the company, and then update the profile with the company_id
      
      // First, make sure the profile exists with auth.uid as the id
      const { error: ensureProfileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          company: companyName,
          industry: industry,
          updated_at: new Date().toISOString()
        });
        
      if (ensureProfileError) {
        console.error("Profile creation error:", ensureProfileError);
        throw new Error(`Failed to create/update profile: ${ensureProfileError.message}`);
      }

      // Now create the company record
      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .insert({
          name: companyName,
          industry: industry,
          created_at: new Date().toISOString(),
          details: companyDetails || {}
        })
        .select('id')
        .single();

      if (companyError) {
        console.error("Company insert error:", companyError);
        throw new Error(`Failed to create company: ${companyError.message}`);
      }

      companyId = companyData?.id;

      if (!companyId) {
        throw new Error("Failed to create company record");
      }
      
      // Now update the profile with the company_id
      const { error: profileUpdateError } = await supabase
        .from('profiles')
        .update({
          company_id: companyId
        })
        .eq('id', userId);
        
      if (profileUpdateError) {
        console.error("Profile update error:", profileUpdateError);
        throw new Error(`Failed to update profile with company ID: ${profileUpdateError.message}`);
      }
    }

    // Store the business goals (in a real app, you would create a goals table)
    console.log("Company goals would be stored:", goals);

    return { success: true };
  } catch (error: any) {
    console.error("Error in saveOnboardingInfo:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred"
    };
  }
}

export async function checkOnboardingStatus(userId: string): Promise<boolean> {
  try {
    if (!userId) return false;

    const { data, error } = await supabase
      .from('profiles')
      .select('company_id')
      .eq('id', userId)
      .single();

    if (error) throw error;

    // If the user has a company ID, we consider onboarding completed
    return !!data?.company_id;
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return false;
  }
}
