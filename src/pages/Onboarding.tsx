
import { useAuth } from "@/context/AuthContext";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import CompanyInfoForm from "@/components/onboarding/CompanyInfoForm";
import IndustryForm from "@/components/onboarding/IndustryForm";
import GoalsForm from "@/components/onboarding/GoalsForm";
import useOnboardingState from "@/hooks/useOnboardingState";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <OnboardingLayout
      title="Welcome to Allora AI"
      step={step}
      totalSteps={3}
      onBack={handleBack}
      onNext={handleNext}
      isLoading={isLoading}
      isLastStep={step === 3}
    >
      {step === 1 && (
        <CompanyInfoForm 
          companyName={companyName} 
          setCompanyName={setCompanyName} 
        />
      )}

      {step === 2 && (
        <IndustryForm 
          industry={industry} 
          setIndustry={setIndustry} 
        />
      )}

      {step === 3 && (
        <GoalsForm 
          goals={goals} 
          toggleGoal={toggleGoal} 
          companyName={companyName}
          industry={industry}
        />
      )}
    </OnboardingLayout>
  );
}
