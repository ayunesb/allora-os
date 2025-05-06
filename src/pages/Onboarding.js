var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import useOnboardingState from "@/hooks/useOnboardingState";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { AuthLoadingState } from "@/components/auth/AuthLoadingState";
import { useOnboardingStatusCheck } from "@/hooks/useOnboardingStatusCheck";
import { useOnboardingValidation } from "@/hooks/useOnboardingValidation";
import * as Steps from "@/components/onboarding/steps";
import { useCompanyWebsite } from "@/hooks/useCompanyWebsite";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
const stepDescriptions = {
    1: "Start with your company website",
    2: "Tell us about your company",
    3: "Select your industry for customized insights",
    4: "Define your main business goals",
    5: "Determine your strategic risk profile",
    6: "Customize your brand identity",
    7: "Set your communication preferences",
    8: "Connect your existing business tools",
    9: "Share more about your company",
    10: "Connect your advertising accounts",
    11: "Meet your AI executive team",
};
export default function Onboarding() {
    const { step, companyName, setCompanyName, industry, setIndustry, goals, companyDetails, updateCompanyDetails, riskAppetite, setRiskAppetite, executiveTeamEnabled, setExecutiveTeamEnabled, isLoading: isOnboardingLoading, errorMessage, handleNext, handleBack, toggleGoal, setStep, } = useOnboardingState();
    const { isLoading: isAuthLoading, signOut } = useAuth();
    const { isCheckingStatus, retryCount, user } = useOnboardingStatusCheck();
    const { isCompleting, validationError, handleComplete } = useOnboardingValidation();
    const { scrapedData, applyScrapedDataToCompanyDetails } = useCompanyWebsite();
    const navigate = useNavigate();
    const handleSignOut = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield signOut();
            toast.success("You have been logged out");
            navigate("/login");
        }
        catch (error) {
            console.error("Error signing out:", error);
            toast.error("Failed to sign out. Please try again.");
        }
    });
    const handleRefresh = () => {
        window.location.reload();
    };
    const handleFinalComplete = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const success = yield handleComplete();
            if (success) {
                toast.success("Onboarding completed successfully! Redirecting to AI workflow setup...");
                navigate("/dashboard/ai-workflow");
            }
        }
        catch (error) {
            toast.error("Failed to complete onboarding. Please try again.");
        }
        return Promise.resolve();
    });
    const handleCompanyDataFetched = (success) => {
        if (success && scrapedData) {
            const updatedDetails = applyScrapedDataToCompanyDetails(companyDetails, setCompanyName, setIndustry);
            updateCompanyDetails(updatedDetails);
            toast.success("Company data applied! Please review and make any necessary adjustments.");
        }
        else if (!success) {
            toast.error("We couldn't fetch data from your website. Please enter your information manually.");
        }
        setStep(2);
    };
    if (isAuthLoading || isCheckingStatus) {
        return _jsx(AuthLoadingState, {});
    }
    if (retryCount >= 3 && !user) {
        return (_jsx(Steps.AuthIssue, { onSignOut: handleSignOut, onRefresh: handleRefresh }));
    }
    const totalSteps = 11;
    const getStepContent = () => {
        switch (step) {
            case 1:
                return (_jsx(Steps.CompanyWebsite, { onCompanyDataFetched: handleCompanyDataFetched }));
            case 2:
                return (_jsx(Steps.CompanyInfo, { companyName: companyName, setCompanyName: setCompanyName, companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetails, errorMessage: errorMessage }));
            case 3:
                return (_jsx(Steps.Industry, { industry: industry, setIndustry: setIndustry, errorMessage: errorMessage }));
            case 4:
                return (_jsx(Steps.Goals, { goals: goals, toggleGoal: toggleGoal, companyName: companyName, industry: industry, companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetails, errorMessage: errorMessage }));
            case 5:
                return (_jsx(Steps.RiskProfile, { riskAppetite: riskAppetite, setRiskAppetite: setRiskAppetite, executiveTeamEnabled: executiveTeamEnabled, setExecutiveTeamEnabled: setExecutiveTeamEnabled, companyName: companyName }));
            case 6:
                return (_jsx(Steps.BrandIdentity, { companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetails }));
            case 7:
                return (_jsx(Steps.CommunicationPreferences, { companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetails }));
            case 8:
                return (_jsx(Steps.CrmIntegrations, { companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetails }));
            case 9:
                return (_jsx(Steps.CompanyDetails, { companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetails, onNext: handleNext }));
            case 10:
                return (_jsx(Steps.AdPlatformsConnection, { companyName: companyName, onComplete: handleNext, isLoading: isOnboardingLoading || isCompleting }));
            case 11:
                return (_jsx(Steps.ExecutiveTeam, { executiveTeamEnabled: executiveTeamEnabled, setExecutiveTeamEnabled: setExecutiveTeamEnabled, riskAppetite: riskAppetite, companyName: companyName, onComplete: handleFinalComplete, isLoading: isCompleting }));
            default:
                return _jsx("div", { children: "Unknown step" });
        }
    };
    const isLastStep = step === totalSteps;
    return (_jsx(AccessibilityProvider, { children: _jsxs(OnboardingLayout, { step: step, totalSteps: totalSteps, onNext: isLastStep ? handleFinalComplete : handleNext, onBack: handleBack, isNextDisabled: isOnboardingLoading || isCompleting, isBackDisabled: step === 1 || isOnboardingLoading || isCompleting, nextLabel: isLastStep ? "Complete Setup" : "Continue", isLoading: isOnboardingLoading || isCompleting, isLastStep: isLastStep, title: "Allora AI Setup", stepDescription: stepDescriptions[step], children: [getStepContent(), validationError && (_jsx("div", { className: "mt-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md", role: "alert", children: validationError }))] }) }));
}
