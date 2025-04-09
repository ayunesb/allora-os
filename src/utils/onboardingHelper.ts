
import { supabase } from '@/backend/supabase';
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

    // Create the company record with user_id
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .insert({
        name: companyName,
        industry: industry,
        created_at: new Date().toISOString(),
        details: companyDetails || {} // Add the details object, default to empty object if null
      })
      .select('id')
      .single();

    if (companyError) {
      console.error("Company insert error:", companyError);
      throw new Error(`Failed to create company: ${companyError.message}`);
    }

    const companyId = companyData?.id;

    if (!companyId) {
      throw new Error("Failed to create company record");
    }

    // Next, update the user profile with the company ID
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: userId,
        company_id: companyId,
        company: companyName,
        industry: industry,
        updated_at: new Date().toISOString()
      });

    if (profileError) throw profileError;

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
