
import { toast } from "sonner";
import { saveCompanyInfo } from "./profileHelpers";

export const saveOnboardingInfo = async (
  userId: string, 
  companyName: string, 
  industry: string, 
  goals: string[] = []
) => {
  try {
    // Save the company information to the database
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
    toast.error(error.message || "Failed to save onboarding information");
    return {
      success: false,
      error: error.message
    };
  }
};
