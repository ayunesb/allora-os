
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { saveOnboardingInfo } from "@/utils/onboardingHelper";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function useOnboardingState() {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();

  // Pre-fill fields if user has partial profile data (common with social logins)
  useEffect(() => {
    if (profile) {
      if (profile.company) setCompanyName(profile.company);
      if (profile.industry) setIndustry(profile.industry);
    }
  }, [profile]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleGoal = (goal: string) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const handleComplete = async () => {
    if (!user) {
      toast.error("You must be logged in to complete onboarding");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Saving onboarding info:", user.id, companyName, industry, goals);
      const result = await saveOnboardingInfo(user.id, companyName, industry, goals);
      
      if (!result.success) {
        throw new Error(result.error || "Failed to save company information");
      }
      
      // Refresh user profile to get updated data
      await refreshProfile();
      
      toast.success("Company setup completed successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Onboarding error:", error);
      toast.error(error.message || "An error occurred during setup");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    companyName,
    setCompanyName,
    industry,
    setIndustry,
    goals,
    isLoading,
    handleNext,
    handleBack,
    toggleGoal
  };
}
