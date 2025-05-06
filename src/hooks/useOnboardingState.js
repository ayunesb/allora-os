"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
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
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useOnboardingState;
var react_1 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
var onboarding_1 = require("@/utils/onboarding");
var sonner_1 = require("sonner");
var react_router_dom_1 = require("react-router-dom");
function useOnboardingState() {
  var _this = this;
  var _a = (0, react_1.useState)(1),
    step = _a[0],
    setStep = _a[1];
  var _b = (0, react_1.useState)(""),
    companyName = _b[0],
    setCompanyName = _b[1];
  var _c = (0, react_1.useState)(""),
    industry = _c[0],
    setIndustry = _c[1];
  var _d = (0, react_1.useState)([]),
    goals = _d[0],
    setGoals = _d[1];
  var _e = (0, react_1.useState)({
      // Using properties that exist in the updated interface
      emailEnabled: true,
      whatsAppEnabled: false,
      phoneEnabled: true,
      zoomEnabled: true,
      communicationChannels: ["email", "phone", "zoom"],
      primaryColor: "#4f46e5",
      secondaryColor: "#ffffff",
      companySize: "10-50",
      marketingBudget: "$5,000-$10,000",
      targetMarkets: ["North America"],
    }),
    companyDetails = _e[0],
    setCompanyDetails = _e[1];
  var _f = (0, react_1.useState)(false),
    isLoading = _f[0],
    setIsLoading = _f[1];
  var _g = (0, react_1.useState)(null),
    errorMessage = _g[0],
    setErrorMessage = _g[1];
  var _h = (0, react_1.useState)("medium"),
    riskAppetite = _h[0],
    setRiskAppetite = _h[1];
  var _j = (0, react_1.useState)(true),
    executiveTeamEnabled = _j[0],
    setExecutiveTeamEnabled = _j[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _k = (0, AuthContext_1.useAuth)(),
    user = _k.user,
    profile = _k.profile,
    refreshProfile = _k.refreshProfile;
  // Pre-fill fields if user has partial profile data (common with social logins)
  (0, react_1.useEffect)(
    function () {
      if (profile) {
        if (profile.company) setCompanyName(profile.company);
        if (profile.industry) setIndustry(profile.industry);
        // If both company and industry are already set from registration,
        // skip to the goals step (step 4) - we're now starting at step 1 (website)
        if (profile.company && profile.industry && step === 1) {
          setStep(4); // Skip to goals step
        }
      }
    },
    [profile, step],
  );
  var handleNext = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        // Validate required fields before proceeding
        if (step === 2 && !companyName.trim()) {
          setErrorMessage("Company name is required");
          return [2 /*return*/, Promise.resolve()];
        }
        if (step === 3 && !industry) {
          setErrorMessage("Please select an industry");
          return [2 /*return*/, Promise.resolve()];
        }
        if (step === 4 && goals.length === 0) {
          setErrorMessage("Please select at least one business goal");
          return [2 /*return*/, Promise.resolve()];
        }
        // Clear any error message
        setErrorMessage(null);
        if (step < 11) {
          // Updated to 11 total steps
          setStep(step + 1);
          return [2 /*return*/, Promise.resolve()];
        } else {
          return [2 /*return*/, handleComplete()];
        }
        return [2 /*return*/];
      });
    });
  };
  var handleBack = function () {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  var toggleGoal = function (goal) {
    if (goals.includes(goal)) {
      setGoals(
        goals.filter(function (g) {
          return g !== goal;
        }),
      );
    } else {
      setGoals(__spreadArray(__spreadArray([], goals, true), [goal], false));
    }
  };
  var updateCompanyDetails = function (details) {
    setCompanyDetails(__assign(__assign({}, companyDetails), details));
  };
  var handleComplete = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var enhancedDetails, result, error_1, errorMsg;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setErrorMessage(null);
            if (!user) {
              sonner_1.toast.error(
                "You must be logged in to complete onboarding",
              );
              navigate("/login");
              return [2 /*return*/, Promise.reject("Not logged in")];
            }
            setIsLoading(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 4, 5, 6]);
            enhancedDetails = __assign(__assign({}, companyDetails), {
              riskAppetite: riskAppetite,
              executiveTeamEnabled: executiveTeamEnabled,
              goals: goals,
            });
            console.log(
              "Saving onboarding info:",
              user.id,
              companyName,
              industry,
              goals,
              enhancedDetails,
            );
            return [
              4 /*yield*/,
              (0, onboarding_1.saveOnboardingInfo)(
                user.id,
                companyName,
                industry,
                goals,
                enhancedDetails,
              ),
            ];
          case 2:
            result = _a.sent();
            if (!result.success) {
              throw new Error(
                result.error || "Failed to save company information",
              );
            }
            // Refresh user profile to get updated data
            return [4 /*yield*/, refreshProfile()];
          case 3:
            // Refresh user profile to get updated data
            _a.sent();
            sonner_1.toast.success("Company setup completed successfully!");
            navigate("/dashboard");
            return [2 /*return*/, Promise.resolve()];
          case 4:
            error_1 = _a.sent();
            console.error("Onboarding error:", error_1);
            errorMsg = error_1.message || "An error occurred during setup";
            setErrorMessage(errorMsg);
            sonner_1.toast.error(errorMsg);
            if (errorMsg.includes("row-level security policy")) {
              sonner_1.toast.error(
                "Permission error. Please contact support.",
                {
                  description:
                    "There's an issue with the database permissions.",
                },
              );
            }
            return [2 /*return*/, Promise.reject(errorMsg)];
          case 5:
            setIsLoading(false);
            return [7 /*endfinally*/];
          case 6:
            return [2 /*return*/];
        }
      });
    });
  };
  return {
    step: step,
    setStep: setStep,
    companyName: companyName,
    setCompanyName: setCompanyName,
    industry: industry,
    setIndustry: setIndustry,
    goals: goals,
    companyDetails: companyDetails,
    updateCompanyDetails: updateCompanyDetails,
    isLoading: isLoading,
    errorMessage: errorMessage,
    riskAppetite: riskAppetite,
    setRiskAppetite: setRiskAppetite,
    executiveTeamEnabled: executiveTeamEnabled,
    setExecutiveTeamEnabled: setExecutiveTeamEnabled,
    handleNext: handleNext,
    handleBack: handleBack,
    toggleGoal: toggleGoal,
  };
}
