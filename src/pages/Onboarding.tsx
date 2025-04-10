
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

  const { user, signOut, isLoading: isAuthLoading, hasInitialized, profile } = useAuth();
  const navigate = useNavigate();
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  // Check if user has already completed onboarding
  useEffect(() => {
    let isMounted = true;
    
    const checkStatus = async () => {
      if (!user && retryCount < 3) {
        // Wait a bit and retry if user is not loaded yet
        setTimeout(() => {
          if (isMounted) {
            setRetryCount(prev => prev + 1);
          }
        }, 1500);
        return;
      }
      
      if (!user) {
        if (hasInitialized) {
          // If we've fully initialized and still don't have a user, redirect to login
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
    if (!user || !profile?.company_id) {
      toast.error("Missing user information. Please try again.");
      return;
    }

    setIsCompleting(true);
    
    try {
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
      toast.error(error.message || "An error occurred during onboarding");
    } finally {
      setIsCompleting(false);
    }
  };

  // Show loading state
  if (isAuthLoading || isCheckingStatus) {
    return <AuthLoadingState />;
  }

  // If we've retried 3 times and still no user, show refresh button
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
          />
        );
      case 5:
        return (
          <RiskProfileForm
            riskAppetite={riskAppetite}
            setRiskAppetite={setRiskAppetite}
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
      currentStep={step}
      totalSteps={6}
      onNext={isLastStep ? handleComplete : handleNext}
      onBack={handleBack}
      isNextDisabled={isOnboardingLoading || isCompleting}
      isBackDisabled={step === 1 || isOnboardingLoading || isCompleting}
      nextLabel={isLastStep ? "Complete Setup" : "Continue"}
      isLoading={isOnboardingLoading || isCompleting}
    >
      {getStepContent()}
    </OnboardingLayout>
  );
}
