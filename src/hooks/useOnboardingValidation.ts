
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { completeOnboarding } from "@/utils/onboarding/completeOnboarding";
import { getAdPlatformConnections } from "@/services/adPlatformService";

export function useOnboardingValidation() {
  const [isCompleting, setIsCompleting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [metaConnected, setMetaConnected] = useState(false);
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const { user, profile, refreshProfile } = useAuth();

  // Check ad platform connections
  useEffect(() => {
    const checkConnections = async () => {
      if (profile?.company_id) {
        try {
          const connections = await getAdPlatformConnections();
          setMetaConnected(connections.some(conn => conn.platform === 'meta' && conn.is_active));
          setTiktokConnected(connections.some(conn => conn.platform === 'tiktok' && conn.is_active));
        } catch (error) {
          console.error("Error checking ad platform connections:", error);
        }
      }
    };
    
    checkConnections();
  }, [profile?.company_id]);

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

      const platformConnections = {
        meta: metaConnected,
        tiktok: tiktokConnected
      };
      
      console.log("Completing onboarding with data:", {
        userId: user.id,
        companyId: profile.company_id,
        industry: profile.industry,
        platformConnections
      });
      
      await refreshProfile();
      
      const result = await completeOnboarding(
        user.id, 
        profile.company_id, 
        profile.industry,
        platformConnections
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
    handleComplete,
    metaConnected,
    tiktokConnected
  };
}
