
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

  const { user, signOut, isLoading: isAuthLoading, hasInitialized } = useAuth();
  const navigate = useNavigate();
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

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
            error={errorMessage}
          />
        );
      case 5:
        return (
          <RiskProfileForm
            riskAppetite={riskAppetite}
            setRiskAppetite={setRiskAppetite}
            executiveTeamEnabled={executiveTeamEnabled}
            setExecutiveTeamEnabled={setExecutiveTeamEnabled}
            error={errorMessage?.includes("risk") ? errorMessage : undefined}
          />
        );
      case 6:
        return (
          <ExecutiveTeamIntro />
        );
      default:
        return null;
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
        return "Company Details";
      case 5:
        return "Strategy Risk Profile";
      case 6:
        return "Your AI Executive Team";
      default:
        return "Business Setup";
    }
  };

  const getTotalSteps = () => {
    return 6;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>

      <OnboardingLayout
        title={getStepTitle()}
        step={step}
        totalSteps={getTotalSteps()}
        onBack={handleBack}
        onNext={handleNext}
        isLoading={isOnboardingLoading}
        isLastStep={step === 6}
      >
        {getStepContent()}
      </OnboardingLayout>
    </div>
  );
}
