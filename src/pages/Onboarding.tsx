
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

// Step descriptions for better context
const stepDescriptions = {
  1: "Tell us about your company",
  2: "Select your industry for customized insights",
  3: "Define your main business goals",
  4: "Determine your strategic risk profile",
  5: "Customize your brand identity",
  6: "Set your communication preferences",
  7: "Connect your existing business tools",
  8: "Share more about your company",
  9: "Connect your advertising accounts",
  10: "Meet your AI executive team"
};

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

  // Define total number of steps
  const totalSteps = 10;

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Steps.CompanyInfo 
            companyName={companyName}
            setCompanyName={setCompanyName}
            companyDetails={companyDetails}
            updateCompanyDetails={updateCompanyDetails}
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
            companyDetails={companyDetails}
            updateCompanyDetails={updateCompanyDetails}
            errorMessage={errorMessage}
          />
        );
      case 4:
        return (
          <Steps.RiskProfile
            riskAppetite={riskAppetite}
            setRiskAppetite={setRiskAppetite}
            executiveTeamEnabled={executiveTeamEnabled}
            setExecutiveTeamEnabled={setExecutiveTeamEnabled}
            companyName={companyName}
          />
        );
      case 5:
        return (
          <Steps.BrandIdentity
            companyDetails={companyDetails}
            updateCompanyDetails={updateCompanyDetails}
          />
        );
      case 6:
        return (
          <Steps.CommunicationPreferences
            companyDetails={companyDetails}
            updateCompanyDetails={updateCompanyDetails}
          />
        );
      case 7:
        return (
          <Steps.CrmIntegrations
            companyDetails={companyDetails}
            updateCompanyDetails={updateCompanyDetails}
          />
        );
      case 8:
        return (
          <Steps.CompanyDetails
            companyDetails={companyDetails}
            updateCompanyDetails={updateCompanyDetails}
            onNext={handleNext}
          />
        );
      case 9:
        return (
          <Steps.AdPlatformsConnection
            companyName={companyName}
            onComplete={handleNext}
            isLoading={isOnboardingLoading || isCompleting}
          />
        );
      case 10:
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

  const isLastStep = step === totalSteps;
  
  return (
    <OnboardingLayout
      step={step}
      totalSteps={totalSteps}
      onNext={isLastStep ? handleFinalComplete : handleNext}
      onBack={handleBack}
      isNextDisabled={isOnboardingLoading || isCompleting}
      isBackDisabled={step === 1 || isOnboardingLoading || isCompleting}
      nextLabel={isLastStep ? "Complete Setup" : "Continue"}
      isLoading={isOnboardingLoading || isCompleting}
      isLastStep={isLastStep}
      title="Allora AI Setup"
      stepDescription={stepDescriptions[step as keyof typeof stepDescriptions]}
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
