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
exports.useOnboardingValidation = useOnboardingValidation;
var react_1 = require("react");
var AuthContext_1 = require("@/context/AuthContext");
var sonner_1 = require("sonner");
var heygenHelpers_1 = require("@/utils/heygenHelpers");
function useOnboardingValidation() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isCompleting = _a[0],
    setIsCompleting = _a[1];
  var _b = (0, react_1.useState)(null),
    validationError = _b[0],
    setValidationError = _b[1];
  var _c = (0, AuthContext_1.useAuth)(),
    user = _c.user,
    profile = _c.profile,
    refreshProfile = _c.refreshProfile;
  var handleComplete = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var companyName, userName, welcomeText, error_1;
      var _a;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!user) {
              setValidationError(
                "You must be logged in to complete onboarding",
              );
              return [2 /*return*/, false];
            }
            setIsCompleting(true);
            setValidationError(null);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            // Refresh user profile to get the latest data
            return [4 /*yield*/, refreshProfile()];
          case 2:
            // Refresh user profile to get the latest data
            _b.sent();
            companyName =
              (profile === null || profile === void 0
                ? void 0
                : profile.company) || "your company";
            userName =
              ((_a =
                profile === null || profile === void 0
                  ? void 0
                  : profile.name) === null || _a === void 0
                ? void 0
                : _a.split(" ")[0]) || "there";
            // Generate welcome video in background
            try {
              welcomeText = "Hello "
                .concat(
                  userName,
                  "! Welcome to Allora AI's Executive Advisory for ",
                )
                .concat(
                  companyName,
                  ". I'm excited to be your AI CEO and help you grow your business with strategies from our team of AI executives. Check out our recommendations in the dashboard and let's start growing your business today!",
                );
              (0, heygenHelpers_1.generateVideo)(
                welcomeText,
                "avatar_twinsen", // Default avatar ID
                "voice_1", // Default voice ID
                companyName,
              ).then(function (result) {
                if (!result.success) {
                  console.error(
                    "Failed to generate welcome video:",
                    result.error,
                  );
                }
              });
            } catch (videoError) {
              // Don't fail the onboarding process if video generation fails
              console.error("Error generating welcome video:", videoError);
            }
            sonner_1.toast.success("Onboarding completed successfully!");
            return [2 /*return*/, true];
          case 3:
            error_1 = _b.sent();
            console.error("Onboarding validation error:", error_1);
            setValidationError(
              error_1.message || "An unexpected error occurred",
            );
            sonner_1.toast.error("Failed to complete onboarding");
            return [2 /*return*/, false];
          case 4:
            setIsCompleting(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return {
    isCompleting: isCompleting,
    validationError: validationError,
    handleComplete: handleComplete,
  };
}
