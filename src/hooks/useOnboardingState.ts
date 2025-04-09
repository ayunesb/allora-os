
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { saveOnboardingInfo } from "@/utils/onboardingHelper";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PartialCompanyDetails } from "@/models/companyDetails";

export default function useOnboardingState() {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [companyDetails, setCompanyDetails] = useState<PartialCompanyDetails>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [riskAppetite, setRiskAppetite] = useState<'low' | 'medium' | 'high'>('medium');
  const [executiveTeamEnabled, setExecutiveTeamEnabled] = useState(true);
  const navigate = useNavigate();
  const { user, profile, refreshProfile } = useAuth();

  // Pre-fill fields if user has partial profile data (common with social logins)
  useEffect(() => {
    if (profile) {
      if (profile.company) setCompanyName(profile.company);
      if (profile.industry) setIndustry(profile.industry);
      
      // If both company and industry are already set from registration, 
      // skip to the goals step (step 3)
      if (profile.company && profile.industry && step === 1) {
        setStep(3); // Skip to goals step
      }
    }
  }, [profile, step]);

  const handleNext = () => {
    if (step < 5) { // Added an extra step for executive team intro
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

  const updateCompanyDetails = (details: PartialCompanyDetails) => {
    setCompanyDetails({ ...companyDetails, ...details });
  };

  const handleComplete = async () => {
    setErrorMessage(null);
    
    if (!user) {
      toast.error("You must be logged in to complete onboarding");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      // Include risk appetite in the company details
      const enhancedDetails = {
        ...companyDetails,
        riskAppetite,
        executiveTeamEnabled
      };
      
      console.log("Saving onboarding info:", user.id, companyName, industry, goals, enhancedDetails);
      const result = await saveOnboardingInfo(user.id, companyName, industry, goals, enhancedDetails);
      
      if (!result.success) {
        throw new Error(result.error || "Failed to save company information");
      }
      
      // Refresh user profile to get updated data
      await refreshProfile();
      
      toast.success("Company setup completed successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Onboarding error:", error);
      const errorMsg = error.message || "An error occurred during setup";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
      
      if (errorMsg.includes("row-level security policy")) {
        toast.error("Permission error. Please contact support.", {
          description: "There's an issue with the database permissions."
        });
      }
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
    companyDetails,
    updateCompanyDetails,
    isLoading,
    errorMessage,
    riskAppetite,
    setRiskAppetite,
    executiveTeamEnabled,
    setExecutiveTeamEnabled,
    handleNext,
    handleBack,
    toggleGoal
  };
}
