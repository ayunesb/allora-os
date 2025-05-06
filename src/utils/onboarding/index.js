"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOnboardingStatus = checkOnboardingStatus;
// Re-export for simplified imports
__exportStar(require("./saveOnboarding"), exports);
__exportStar(require("./completeOnboarding"), exports);
var client_1 = require("@/integrations/supabase/client");
/**
 * Checks if a user has already completed onboarding
 * @param userId The user ID to check
 * @returns Boolean indicating if onboarding is completed
 */
function checkOnboardingStatus(userId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, profileData, profileError, _b, companyData, companyError, error_1;
    var _c;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          _d.trys.push([0, 4, , 5]);
          if (!userId) return [2 /*return*/, false];
          return [
            4 /*yield*/,
            client_1.supabase
              .from("profiles")
              .select("onboarding_completed, company_id")
              .eq("id", userId)
              .single(),
          ];
        case 1:
          (_a = _d.sent()), (profileData = _a.data), (profileError = _a.error);
          if (profileError) {
            console.error(
              "Error checking profile onboarding status:",
              profileError,
            );
            return [2 /*return*/, false];
          }
          // If the profile has the onboarding_completed flag set, onboarding is completed
          if (
            (profileData === null || profileData === void 0
              ? void 0
              : profileData.onboarding_completed) === true
          ) {
            return [2 /*return*/, true];
          }
          if (
            !(profileData === null || profileData === void 0
              ? void 0
              : profileData.company_id)
          )
            return [3 /*break*/, 3];
          return [
            4 /*yield*/,
            client_1.supabase
              .from("companies")
              .select("details")
              .eq("id", profileData.company_id)
              .single(),
          ];
        case 2:
          (_b = _d.sent()), (companyData = _b.data), (companyError = _b.error);
          if (companyError) {
            console.error(
              "Error checking company onboarding status:",
              companyError,
            );
            return [2 /*return*/, false];
          }
          // Check if the company has the onboarding_completed flag in its details
          if (
            ((_c =
              companyData === null || companyData === void 0
                ? void 0
                : companyData.details) === null || _c === void 0
              ? void 0
              : _c.onboarding_completed) === true
          ) {
            return [2 /*return*/, true];
          }
          _d.label = 3;
        case 3:
          // If we got here, onboarding is not completed
          return [2 /*return*/, false];
        case 4:
          error_1 = _d.sent();
          console.error("Error in checkOnboardingStatus:", error_1);
          return [2 /*return*/, false];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
