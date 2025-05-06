import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { saveOnboardingInfo } from "@/utils/onboarding";
import { toast } from "sonner";
import { generateVideo } from "@/utils/heygenHelpers";

export function useOnboardingValidation() {
  const [isCompleting, setIsCompleting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { user, profile, refreshProfile } = useAuth();

  const handleComplete = async (): Promise<boolean> => {
    if (!user) {
      setValidationError("You must be logged in to complete onboarding");
      return false;
    }

    setIsCompleting(true);
    setValidationError(null);

    try {
      // Refresh user profile to get the latest data
      await refreshProfile();

      // Get the company name and username for the welcome video
      const companyName = profile?.company || "your company";
      const userName = profile?.name?.split(" ")[0] || "there";

      // Generate welcome video in background
      try {
        const welcomeText = `Hello ${userName}! Welcome to Allora AI's Executive Advisory for ${companyName}. I'm excited to be your AI CEO and help you grow your business with strategies from our team of AI executives. Check out our recommendations in the dashboard and let's start growing your business today!`;

        generateVideo(
          welcomeText,
          "avatar_twinsen", // Default avatar ID
          "voice_1", // Default voice ID
          companyName,
        ).then((result) => {
          if (!result.success) {
            console.error("Failed to generate welcome video:", result.error);
          }
        });
      } catch (videoError) {
        // Don't fail the onboarding process if video generation fails
        console.error("Error generating welcome video:", videoError);
      }

      toast.success("Onboarding completed successfully!");
      return true;
    } catch (error: any) {
      console.error("Onboarding validation error:", error);
      setValidationError(error.message || "An unexpected error occurred");
      toast.error("Failed to complete onboarding");
      return false;
    } finally {
      setIsCompleting(false);
    }
  };

  return {
    isCompleting,
    validationError,
    handleComplete,
  };
}
