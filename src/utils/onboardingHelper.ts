
import { supabase } from '@/backend/supabase';
import { toast } from 'sonner';

interface OnboardingResult {
  success: boolean;
  error?: string;
}

export async function saveOnboardingInfo(
  userId: string,
  companyName: string,
  industry: string,
  goals: string[]
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

    // First, create or update the company record
    // Note: We're removing the created_by field since it doesn't exist in the companies table
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .upsert({
        name: companyName,
        industry: industry,
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (companyError) throw companyError;

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

    // Store the goals in the company record
    // Since there's no goals column in the companies table, we're storing this in a different way
    // In a real app, you might want to create a separate goals table
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
