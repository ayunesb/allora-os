
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { completeOnboarding } from "@/utils/onboarding/completeOnboarding";

export function useOnboardingValidation() {
  const [isCompleting, setIsCompleting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { user, profile, refreshProfile } = useAuth();

  const handleComplete = async (): Promise<boolean> => {
    setValidationError(null);
    setIsCompleting(true);
    
    try {
      if (!user) {
        throw new Error("User authentication required. Please try logging in again.");
      }
      
      console.log("Current profile state:", profile);
      
      if (!profile?.company_id && profile?.company) {
        console.log("Creating company for user before completing onboarding");
        throw new Error("Company setup incomplete. Please go back to step 1.");
      }
      
      if (!profile?.company_id) {
        throw new Error("Company setup incomplete. Please try again.");
      }
      
      if (!profile?.industry) {
        throw new Error("Please select an industry before continuing.");
      }

      const enhancedDetails = {
        whatsAppEnabled: true,
        emailEnabled: true,
        executiveTeamEnabled: true
      };
      
      console.log("Completing onboarding with data:", {
        userId: user.id,
        companyId: profile.company_id,
        industry: profile.industry,
        enhancedDetails
      });
      
      await refreshProfile();
      
      const result = await completeOnboarding(
        user.id, 
        profile.company_id, 
        profile.industry
      );
      
      if (result.success) {
        toast.success("Onboarding completed! Welcome to Allora AI.");
        return true;
      } else {
        throw new Error(result.error || "Failed to complete onboarding");
      }
    } catch (error: any) {
      console.error("Error completing onboarding:", error);
      setValidationError(error.message || "An error occurred during onboarding");
      toast.error(error.message || "An error occurred during onboarding");
      return false;
    } finally {
      setIsCompleting(false);
    }
  };

  return {
    isCompleting,
    validationError,
    handleComplete
  };
}
