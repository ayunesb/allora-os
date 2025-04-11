import React from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import useOnboardingState from "@/hooks/useOnboardingState";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { AuthLoadingState } from "@/components/auth/AuthLoadingState";
import { useOnboardingStatusCheck } from "@/hooks/useOnboardingStatusCheck";
import { useOnboardingValidation } from "@/hooks/useOnboardingValidation";
import * as Steps from "@/components/onboarding/steps";

export default function Onboarding() {
  const {
    step,
    companyName,
    setCompanyName,
    industry,
    setIndustry,
    goals,
    companyDetails,
    updateCompanyDetails,
    riskAppetite,
    setRiskAppetite,
    executiveTeamEnabled,
    setExecutiveTeamEnabled,
    isLoading: isOnboardingLoading,
    errorMessage,
    handleNext,
    handleBack,
    toggleGoal
  } = useOnboardingState();

  const { isLoading: isAuthLoading, signOut } = useAuth();
  const { isCheckingStatus, retryCount, user } = useOnboardingStatusCheck();
  const { isCompleting, validationError, handleComplete } = useOnboardingValidation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("You have been logged out");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleFinalComplete = async (): Promise<void> => {
    const success = await handleComplete();
    if (success) {
      navigate("/dashboard");
    }
    return Promise.resolve();
  };

  if (isAuthLoading || isCheckingStatus) {
    return <AuthLoadingState />;
  }

  if (retryCount >= 3 && !user) {
    return <Steps.AuthIssue onSignOut={handleSignOut} onRefresh={handleRefresh} />;
  }

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Steps.CompanyInfo 
            companyName={companyName}
            setCompanyName={setCompanyName}
            errorMessage={errorMessage}
          />
        );
      case 2:
        return (
          <Steps.Industry
            industry={industry}
            setIndustry={setIndustry}
            errorMessage={errorMessage}
          />
        );
      case 3:
        return (
          <Steps.Goals
            goals={goals}
            toggleGoal={toggleGoal}
            companyName={companyName}
            industry={industry}
            errorMessage={errorMessage}
          />
        );
      case 4:
        return (
          <Steps.CompanyDetails
            companyDetails={companyDetails}
            updateCompanyDetails={updateCompanyDetails}
            onNext={handleNext}
          />
        );
      case 5:
        return (
          <Steps.RiskProfile
            riskAppetite={riskAppetite}
            setRiskAppetite={setRiskAppetite}
            executiveTeamEnabled={executiveTeamEnabled}
            setExecutiveTeamEnabled={setExecutiveTeamEnabled}
            companyName={companyName}
          />
        );
      case 6:
        return (
          <Steps.ExecutiveTeam
            executiveTeamEnabled={executiveTeamEnabled}
            setExecutiveTeamEnabled={setExecutiveTeamEnabled}
            riskAppetite={riskAppetite}
            companyName={companyName}
            onComplete={handleFinalComplete}
            isLoading={isCompleting}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  const isLastStep = step === 6;
  
  return (
    <OnboardingLayout
      step={step}
      totalSteps={6}
      onNext={isLastStep ? handleFinalComplete : handleNext}
      onBack={handleBack}
      isNextDisabled={isOnboardingLoading || isCompleting}
      isBackDisabled={step === 1 || isOnboardingLoading || isCompleting}
      nextLabel={isLastStep ? "Complete Setup" : "Continue"}
      isLoading={isOnboardingLoading || isCompleting}
      isLastStep={isLastStep}
      title="Allora AI Setup"
    >
      {getStepContent()}
      
      {validationError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md">
          {validationError}
        </div>
      )}
    </OnboardingLayout>
  );
}
