
import { toast } from "sonner";
import { saveCompanyInfo } from "./profileHelpers";

export const saveOnboardingInfo = async (
  userId: string, 
  companyName: string, 
  industry: string, 
  goals: string[] = []
) => {
  try {
    // Use the auth.uid() in Supabase RLS policy by passing userId 
    const success = await saveCompanyInfo(userId, companyName, industry);
    
    if (!success) {
      throw new Error("Failed to save company information");
    }
    
    // Return success result
    return {
      success: true,
      userId,
      companyData: {
        name: companyName,
        industry,
        goals,
        createdAt: new Date().toISOString()
      }
    };
  } catch (error: any) {
    console.error("Error saving onboarding info:", error);
    return {
      success: false,
      error: error.message || "Failed to save onboarding information"
    };
  }
};
