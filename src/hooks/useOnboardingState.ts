
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { saveOnboardingInfo } from "@/utils/onboarding";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PartialCompanyDetails } from "@/models/companyDetails";

export default function useOnboardingState() {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [companyDetails, setCompanyDetails] = useState<PartialCompanyDetails>({
    // Using properties that exist in the updated interface
    emailEnabled: true,
    whatsAppEnabled: false,
    phoneEnabled: true,
    zoomEnabled: true,
    communicationChannels: ["email", "phone", "zoom"],
    primaryColor: "#4f46e5",
    secondaryColor: "#ffffff",
  });
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
      // skip to the goals step (step 4) - we're now starting at step 1 (website)
      if (profile.company && profile.industry && step === 1) {
        setStep(4); // Skip to goals step
      }
    }
  }, [profile, step]);

  const handleNext = async (): Promise<void> => {
    // Validate required fields before proceeding
    if (step === 2 && !companyName.trim()) {
      setErrorMessage("Company name is required");
      return Promise.resolve();
    }
    
    if (step === 3 && !industry) {
      setErrorMessage("Please select an industry");
      return Promise.resolve();
    }
    
    if (step === 4 && goals.length === 0) {
      setErrorMessage("Please select at least one business goal");
      return Promise.resolve();
    }
    
    // Clear any error message
    setErrorMessage(null);
    
    if (step < 11) { // Updated to 11 total steps
      setStep(step + 1);
      return Promise.resolve();
    } else {
      return handleComplete();
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

  const handleComplete = async (): Promise<void> => {
    setErrorMessage(null);
    
    if (!user) {
      toast.error("You must be logged in to complete onboarding");
      navigate("/login");
      return Promise.reject("Not logged in");
    }

    setIsLoading(true);

    try {
      // Include risk appetite in the company details
      const enhancedDetails = {
        ...companyDetails,
        riskAppetite,
        executiveTeamEnabled,
        goals: goals,
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
      return Promise.resolve();
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
      return Promise.reject(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    step,
    setStep,
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
