
import { useAuth } from "@/context/AuthContext";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import CompanyInfoForm from "@/components/onboarding/CompanyInfoForm";
import IndustryForm from "@/components/onboarding/IndustryForm";
import GoalsForm from "@/components/onboarding/GoalsForm";
import useOnboardingState from "@/hooks/useOnboardingState";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Onboarding() {
  const {
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
  } = useOnboardingState();
  
  const [errors, setErrors] = useState<{
    companyName?: string;
    industry?: string;
    goals?: string;
  }>({});
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  
  const validateCurrentStep = () => {
    setErrors({});
    
    if (step === 1) {
      if (!companyName.trim()) {
        setErrors({ companyName: "Company name is required" });
        return false;
      } else if (companyName.trim().length < 2) {
        setErrors({ companyName: "Company name must be at least 2 characters" });
        return false;
      }
    } else if (step === 2) {
      if (!industry) {
        setErrors({ industry: "Please select your industry" });
        return false;
      }
    } else if (step === 3) {
      if (goals.length === 0) {
        setErrors({ goals: "Please select at least one business goal" });
        return false;
      }
    }
    
    return true;
  };
  
  const handleStepNext = () => {
    if (validateCurrentStep()) {
      handleNext();
    }
  };

  return (
    <OnboardingLayout
      title="Welcome to Allora AI"
      step={step}
      totalSteps={3}
      onBack={handleBack}
      onNext={handleStepNext}
      isLoading={isLoading}
      isLastStep={step === 3}
    >
      {step === 1 && (
        <CompanyInfoForm 
          companyName={companyName} 
          setCompanyName={setCompanyName}
          error={errors.companyName}
        />
      )}

      {step === 2 && (
        <IndustryForm 
          industry={industry} 
          setIndustry={setIndustry}
          error={errors.industry}
        />
      )}

      {step === 3 && (
        <GoalsForm 
          goals={goals} 
          toggleGoal={toggleGoal} 
          companyName={companyName}
          industry={industry}
          error={errors.goals}
        />
      )}
    </OnboardingLayout>
  );
}
