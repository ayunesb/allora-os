
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { saveCompanyInfo } from './profileHelpers';

export type CompanyUpdateParams = {
  name: string;
  industry: string;
  description: string;
  mission?: string;
  vision?: string;
  headquarters?: string;
  phone?: string;
  additionalDetails?: Record<string, any>;
};

export async function updateCompanyDetails(
  userId: string,
  details: CompanyUpdateParams
): Promise<{ success: boolean; error?: string }> {
  try {
    console.log("Updating company details for user:", userId);
    
    // First, get the user's profile to check if they have a company_id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('company_id, company, industry')
      .eq('id', userId)
      .single();
    
    if (profileError) {
      console.error("Error fetching profile:", profileError);
      return { success: false, error: "Failed to fetch user profile" };
    }
    
    // If the user doesn't have a company_id, create one
    if (!profile.company_id) {
      console.log("User has no company, creating one:", details.name);
      const created = await saveCompanyInfo(userId, details.name, details.industry);
      if (!created) {
        return { success: false, error: "Failed to create company" };
      }
      
      // Fetch the profile again to get the new company_id
      const { data: updatedProfile, error: updateProfileError } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', userId)
        .single();
        
      if (updateProfileError || !updatedProfile.company_id) {
        return { success: false, error: "Failed to get company ID after creation" };
      }
      
      profile.company_id = updatedProfile.company_id;
    }
    
    // Update the company information
    const { error: companyError } = await supabase
      .from('companies')
      .update({
        name: details.name,
        industry: details.industry,
        details: {
          description: details.description,
          mission: details.mission,
          vision: details.vision,
          headquarters: details.headquarters,
          phone: details.phone,
          ...details.additionalDetails
        }
      })
      .eq('id', profile.company_id);
    
    if (companyError) {
      console.error("Error updating company:", companyError);
      return { success: false, error: "Failed to update company details" };
    }
    
    // Update the profile company name and industry
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        company: details.name,
        industry: details.industry
      })
      .eq('id', userId);
    
    if (updateError) {
      console.error("Error updating profile company info:", updateError);
      return { success: false, error: "Failed to update profile company information" };
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Unexpected error updating company details:", error);
    return { success: false, error: error.message || "An unexpected error occurred" };
  }
}

export async function fetchCompanyDetails(companyId: string): Promise<Record<string, any> | null> {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('details')
      .eq('id', companyId)
      .single();
    
    if (error) {
      console.error("Error fetching company details:", error);
      return null;
    }
    
    return data?.details || {};
  } catch (error) {
    console.error("Unexpected error fetching company details:", error);
    return null;
  }
}
