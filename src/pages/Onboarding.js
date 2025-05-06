"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Onboarding;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_router_dom_1 = require("react-router-dom");
var OnboardingLayout_1 = require("@/components/onboarding/OnboardingLayout");
var useOnboardingState_1 = require("@/hooks/useOnboardingState");
var AuthContext_1 = require("@/context/AuthContext");
var sonner_1 = require("sonner");
var AuthLoadingState_1 = require("@/components/auth/AuthLoadingState");
var useOnboardingStatusCheck_1 = require("@/hooks/useOnboardingStatusCheck");
var useOnboardingValidation_1 = require("@/hooks/useOnboardingValidation");
var Steps = require("@/components/onboarding/steps");
var useCompanyWebsite_1 = require("@/hooks/useCompanyWebsite");
var AccessibilityContext_1 = require("@/context/AccessibilityContext");
var stepDescriptions = {
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
function Onboarding() {
  var _this = this;
  var _a = (0, useOnboardingState_1.default)(),
    step = _a.step,
    companyName = _a.companyName,
    setCompanyName = _a.setCompanyName,
    industry = _a.industry,
    setIndustry = _a.setIndustry,
    goals = _a.goals,
    companyDetails = _a.companyDetails,
    updateCompanyDetails = _a.updateCompanyDetails,
    riskAppetite = _a.riskAppetite,
    setRiskAppetite = _a.setRiskAppetite,
    executiveTeamEnabled = _a.executiveTeamEnabled,
    setExecutiveTeamEnabled = _a.setExecutiveTeamEnabled,
    isOnboardingLoading = _a.isLoading,
    errorMessage = _a.errorMessage,
    handleNext = _a.handleNext,
    handleBack = _a.handleBack,
    toggleGoal = _a.toggleGoal,
    setStep = _a.setStep;
  var _b = (0, AuthContext_1.useAuth)(),
    isAuthLoading = _b.isLoading,
    signOut = _b.signOut;
  var _c = (0, useOnboardingStatusCheck_1.useOnboardingStatusCheck)(),
    isCheckingStatus = _c.isCheckingStatus,
    retryCount = _c.retryCount,
    user = _c.user;
  var _d = (0, useOnboardingValidation_1.useOnboardingValidation)(),
    isCompleting = _d.isCompleting,
    validationError = _d.validationError,
    handleComplete = _d.handleComplete;
  var _e = (0, useCompanyWebsite_1.useCompanyWebsite)(),
    scrapedData = _e.scrapedData,
    applyScrapedDataToCompanyDetails = _e.applyScrapedDataToCompanyDetails;
  var navigate = (0, react_router_dom_1.useNavigate)();
  var handleSignOut = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, signOut()];
          case 1:
            _a.sent();
            sonner_1.toast.success("You have been logged out");
            navigate("/login");
            return [3 /*break*/, 3];
          case 2:
            error_1 = _a.sent();
            console.error("Error signing out:", error_1);
            sonner_1.toast.error("Failed to sign out. Please try again.");
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/];
        }
      });
    });
  };
  var handleRefresh = function () {
    window.location.reload();
  };
  var handleFinalComplete = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var success, error_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            _a.trys.push([0, 2, , 3]);
            return [4 /*yield*/, handleComplete()];
          case 1:
            success = _a.sent();
            if (success) {
              sonner_1.toast.success(
                "Onboarding completed successfully! Redirecting to AI workflow setup...",
              );
              navigate("/dashboard/ai-workflow");
            }
            return [3 /*break*/, 3];
          case 2:
            error_2 = _a.sent();
            sonner_1.toast.error(
              "Failed to complete onboarding. Please try again.",
            );
            return [3 /*break*/, 3];
          case 3:
            return [2 /*return*/, Promise.resolve()];
        }
      });
    });
  };
  var handleCompanyDataFetched = function (success) {
    if (success && scrapedData) {
      var updatedDetails = applyScrapedDataToCompanyDetails(
        companyDetails,
        setCompanyName,
        setIndustry,
      );
      updateCompanyDetails(updatedDetails);
      sonner_1.toast.success(
        "Company data applied! Please review and make any necessary adjustments.",
      );
    } else if (!success) {
      sonner_1.toast.error(
        "We couldn't fetch data from your website. Please enter your information manually.",
      );
    }
    setStep(2);
  };
  if (isAuthLoading || isCheckingStatus) {
    return (0, jsx_runtime_1.jsx)(AuthLoadingState_1.AuthLoadingState, {});
  }
  if (retryCount >= 3 && !user) {
    return (0, jsx_runtime_1.jsx)(Steps.AuthIssue, {
      onSignOut: handleSignOut,
      onRefresh: handleRefresh,
    });
  }
  var totalSteps = 11;
  var getStepContent = function () {
    switch (step) {
      case 1:
        return (0, jsx_runtime_1.jsx)(Steps.CompanyWebsite, {
          onCompanyDataFetched: handleCompanyDataFetched,
        });
      case 2:
        return (0, jsx_runtime_1.jsx)(Steps.CompanyInfo, {
          companyName: companyName,
          setCompanyName: setCompanyName,
          companyDetails: companyDetails,
          updateCompanyDetails: updateCompanyDetails,
          errorMessage: errorMessage,
        });
      case 3:
        return (0, jsx_runtime_1.jsx)(Steps.Industry, {
          industry: industry,
          setIndustry: setIndustry,
          errorMessage: errorMessage,
        });
      case 4:
        return (0, jsx_runtime_1.jsx)(Steps.Goals, {
          goals: goals,
          toggleGoal: toggleGoal,
          companyName: companyName,
          industry: industry,
          companyDetails: companyDetails,
          updateCompanyDetails: updateCompanyDetails,
          errorMessage: errorMessage,
        });
      case 5:
        return (0, jsx_runtime_1.jsx)(Steps.RiskProfile, {
          riskAppetite: riskAppetite,
          setRiskAppetite: setRiskAppetite,
          executiveTeamEnabled: executiveTeamEnabled,
          setExecutiveTeamEnabled: setExecutiveTeamEnabled,
          companyName: companyName,
        });
      case 6:
        return (0, jsx_runtime_1.jsx)(Steps.BrandIdentity, {
          companyDetails: companyDetails,
          updateCompanyDetails: updateCompanyDetails,
        });
      case 7:
        return (0, jsx_runtime_1.jsx)(Steps.CommunicationPreferences, {
          companyDetails: companyDetails,
          updateCompanyDetails: updateCompanyDetails,
        });
      case 8:
        return (0, jsx_runtime_1.jsx)(Steps.CrmIntegrations, {
          companyDetails: companyDetails,
          updateCompanyDetails: updateCompanyDetails,
        });
      case 9:
        return (0, jsx_runtime_1.jsx)(Steps.CompanyDetails, {
          companyDetails: companyDetails,
          updateCompanyDetails: updateCompanyDetails,
          onNext: handleNext,
        });
      case 10:
        return (0, jsx_runtime_1.jsx)(Steps.AdPlatformsConnection, {
          companyName: companyName,
          onComplete: handleNext,
          isLoading: isOnboardingLoading || isCompleting,
        });
      case 11:
        return (0, jsx_runtime_1.jsx)(Steps.ExecutiveTeam, {
          executiveTeamEnabled: executiveTeamEnabled,
          setExecutiveTeamEnabled: setExecutiveTeamEnabled,
          riskAppetite: riskAppetite,
          companyName: companyName,
          onComplete: handleFinalComplete,
          isLoading: isCompleting,
        });
      default:
        return (0, jsx_runtime_1.jsx)("div", { children: "Unknown step" });
    }
  };
  var isLastStep = step === totalSteps;
  return (0, jsx_runtime_1.jsx)(AccessibilityContext_1.AccessibilityProvider, {
    children: (0, jsx_runtime_1.jsxs)(OnboardingLayout_1.default, {
      step: step,
      totalSteps: totalSteps,
      onNext: isLastStep ? handleFinalComplete : handleNext,
      onBack: handleBack,
      isNextDisabled: isOnboardingLoading || isCompleting,
      isBackDisabled: step === 1 || isOnboardingLoading || isCompleting,
      nextLabel: isLastStep ? "Complete Setup" : "Continue",
      isLoading: isOnboardingLoading || isCompleting,
      isLastStep: isLastStep,
      title: "Allora AI Setup",
      stepDescription: stepDescriptions[step],
      children: [
        getStepContent(),
        validationError &&
          (0, jsx_runtime_1.jsx)("div", {
            className:
              "mt-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md",
            role: "alert",
            children: validationError,
          }),
      ],
    }),
  });
}
