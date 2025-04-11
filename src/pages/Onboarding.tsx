import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import CompanyInfoForm from "@/components/onboarding/CompanyInfoForm";
import IndustryForm from "@/components/onboarding/IndustryForm";
import GoalsForm from "@/components/onboarding/GoalsForm";
import useOnboardingState from "@/hooks/useOnboardingState";
import { CompanyDetailsSurvey } from "@/components/onboarding/company-details";
import RiskProfileForm from "@/components/onboarding/RiskProfileForm";
import ExecutiveTeamIntro from "@/components/onboarding/ExecutiveTeamIntro";
import { Button } from "@/components/ui/button";
import { LogOut, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { checkOnboardingStatus } from "@/utils/onboarding";
import { completeOnboarding } from "@/utils/onboarding/completeOnboarding"; 
import { AuthLoadingState } from "@/components/auth/AuthLoadingState";

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

  const { user, signOut, isLoading: isAuthLoading, hasInitialized, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const checkStatus = async () => {
      if (!user && retryCount < 3) {
        setTimeout(() => {
          if (isMounted) {
            setRetryCount(prev => prev + 1);
          }
        }, 1500);
        return;
      }
      
      if (!user) {
        if (hasInitialized) {
          toast.error("You must be logged in to complete onboarding");
          navigate("/login");
        }
        return;
      }

      try {
        const isCompleted = await checkOnboardingStatus(user.id);
        if (isCompleted && isMounted) {
          toast.info("You've already completed onboarding");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      } finally {
        if (isMounted) {
          setIsCheckingStatus(false);
        }
      }
    };

    checkStatus();
    
    return () => {
      isMounted = false;
    };
  }, [user, navigate, retryCount, hasInitialized]);

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

  const handleComplete = async () => {
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
      
      if (!industry) {
        throw new Error("Please select an industry before continuing.");
      }

      const enhancedDetails = {
        whatsAppEnabled: true,
        emailEnabled: true,
        executiveTeamEnabled
      };
      
      console.log("Completing onboarding with data:", {
        userId: user.id,
        companyId: profile.company_id,
        industry,
        enhancedDetails
      });
      
      await refreshProfile();
      
      const result = await completeOnboarding(
        user.id, 
        profile.company_id, 
        industry
      );
      
      if (result.success) {
        toast.success("Onboarding completed! Welcome to Allora AI.");
        navigate("/dashboard");
      } else {
        throw new Error(result.error || "Failed to complete onboarding");
      }
    } catch (error: any) {
      console.error("Error completing onboarding:", error);
      setValidationError(error.message || "An error occurred during onboarding");
      toast.error(error.message || "An error occurred during onboarding");
    } finally {
      setIsCompleting(false);
    }
  };

  if (isAuthLoading || isCheckingStatus) {
    return <AuthLoadingState />;
  }

  if (retryCount >= 3 && !user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-card border rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Authentication Issue</h2>
          <p className="text-muted-foreground mb-6">
            There was a problem loading your account information. This might be due to a temporary connection issue.
          </p>
          <div className="flex gap-4 justify-end">
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
            <Button onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh page
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
          <CompanyDetailsSurvey
            companyDetails={companyDetails}
            updateCompanyDetails={updateCompanyDetails}
            onNext={handleNext}
          />
        );
      case 5:
        return (
          <RiskProfileForm
            riskAppetite={riskAppetite}
            setRiskAppetite={setRiskAppetite}
            executiveTeamEnabled={executiveTeamEnabled}
            setExecutiveTeamEnabled={setExecutiveTeamEnabled}
            companyName={companyName}
          />
        );
      case 6:
        return (
          <ExecutiveTeamIntro
            executiveTeamEnabled={executiveTeamEnabled}
            setExecutiveTeamEnabled={setExecutiveTeamEnabled}
            riskAppetite={riskAppetite}
            companyName={companyName}
            onComplete={handleComplete}
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
      onNext={isLastStep ? handleComplete : handleNext}
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
