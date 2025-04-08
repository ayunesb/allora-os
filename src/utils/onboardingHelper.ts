
import { toast } from "sonner";

// This is a mock implementation that would connect to a backend in a real app
export const saveOnboardingInfo = async (
  userId: string, 
  companyName: string, 
  industry: string, 
  goals: string[]
) => {
  // This is where we would save to a real database like Supabase
  console.log("Saving onboarding info:", { userId, companyName, industry, goals });
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Success notification
  toast.success("Company information saved successfully!");
  
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
};
