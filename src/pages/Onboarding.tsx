
import React from "react";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import CompanyInfoForm from "@/components/onboarding/CompanyInfoForm";
import IndustryForm from "@/components/onboarding/IndustryForm";
import GoalsForm from "@/components/onboarding/GoalsForm";
import useOnboardingState from "@/hooks/useOnboardingState";
import CompanyDetailsSurvey from "@/components/onboarding/CompanyDetailsSurvey";
import RiskProfileForm from "@/components/onboarding/RiskProfileForm";
import ExecutiveTeamIntro from "@/components/onboarding/ExecutiveTeamIntro";

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
    isLoading,
    errorMessage,
    handleNext,
    handleBack,
    toggleGoal
  } = useOnboardingState();

  const getStepContent = () => {
    switch (step) {
      case 1:
        return (
          <CompanyInfoForm
            companyName={companyName}
            setCompanyName={setCompanyName}
            error={errorMessage?.includes("company") ? errorMessage : undefined}
          />
        );
      case 2:
        return (
          <IndustryForm
            industry={industry}
            setIndustry={setIndustry}
            error={errorMessage?.includes("industry") ? errorMessage : undefined}
          />
        );
      case 3:
        return (
          <GoalsForm
            goals={goals}
            toggleGoal={toggleGoal}
            companyName={companyName}
            industry={industry}
            error={errorMessage?.includes("goal") ? errorMessage : undefined}
          />
        );
      case 4:
        return (
          <RiskProfileForm
            riskAppetite={riskAppetite}
            setRiskAppetite={setRiskAppetite}
            executiveTeamEnabled={executiveTeamEnabled}
            setExecutiveTeamEnabled={setExecutiveTeamEnabled}
            error={errorMessage?.includes("risk") ? errorMessage : undefined}
          />
        );
      case 5:
        return (
          <ExecutiveTeamIntro />
        );
      default:
        return (
          <CompanyDetailsSurvey
            companyDetails={companyDetails}
            updateCompanyDetails={updateCompanyDetails}
            error={errorMessage}
          />
        );
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Company Information";
      case 2:
        return "Industry Details";
      case 3:
        return "Business Goals";
      case 4:
        return "Strategy Risk Profile";
      case 5:
        return "Your AI Executive Team";
      default:
        return "Business Setup";
    }
  };

  return (
    <OnboardingLayout
      title={getStepTitle()}
      step={step}
      totalSteps={5}
      onBack={handleBack}
      onNext={handleNext}
      isLoading={isLoading}
      isLastStep={step === 5}
    >
      {getStepContent()}
    </OnboardingLayout>
  );
}
