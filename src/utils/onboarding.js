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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTenant = createTenant;
exports.checkOnboardingStatus = checkOnboardingStatus;
exports.completeOnboarding = completeOnboarding;
exports.saveOnboardingInfo = saveOnboardingInfo;
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
/**
 * Create a new tenant and assign the current user as admin
 * @param userId Current user ID
 * @param companyData Company profile data
 * @returns Success status
 */
function createTenant(userId, companyData) {
  return __awaiter(this, void 0, void 0, function () {
    var _a,
      tenant,
      tenantError,
      tenantId,
      companyError,
      userTenantError,
      profileError,
      error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (!userId) {
            return [
              2 /*return*/,
              { success: false, error: "User ID is required" },
            ];
          }
          _b.label = 1;
        case 1:
          _b.trys.push([1, 6, , 7]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("tenants")
              .insert([{ name: companyData.name }])
              .select("id")
              .single(),
          ];
        case 2:
          (_a = _b.sent()), (tenant = _a.data), (tenantError = _a.error);
          if (tenantError) throw tenantError;
          tenantId = tenant.id;
          return [
            4 /*yield*/,
            client_1.supabase.from("company_profiles").insert([
              {
                tenant_id: tenantId,
                company_name: companyData.name,
                industry: companyData.industry,
                website_url: companyData.website_url,
                target_customer: companyData.target_customer,
              },
            ]),
          ];
        case 3:
          companyError = _b.sent().error;
          if (companyError) throw companyError;
          return [
            4 /*yield*/,
            client_1.supabase.from("tenant_users").insert([
              {
                tenant_id: tenantId,
                user_id: userId,
                role: "admin",
              },
            ]),
          ];
        case 4:
          userTenantError = _b.sent().error;
          if (userTenantError) throw userTenantError;
          return [
            4 /*yield*/,
            client_1.supabase
              .from("profiles")
              .update({ tenant_id: tenantId, onboarding_complete: true })
              .eq("id", userId),
          ];
        case 5:
          profileError = _b.sent().error;
          if (profileError) throw profileError;
          return [2 /*return*/, { success: true, tenantId: tenantId }];
        case 6:
          error_1 = _b.sent();
          console.error("Error creating tenant:", error_1);
          return [
            2 /*return*/,
            {
              success: false,
              error:
                error_1 instanceof Error
                  ? error_1.message
                  : "Unknown error creating tenant",
            },
          ];
        case 7:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Check if onboarding is complete for a user
 * @param userId The user ID to check
 */
function checkOnboardingStatus(userId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("profiles")
              .select("onboarding_complete")
              .eq("id", userId)
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [
            2 /*return*/,
            !!(data === null || data === void 0
              ? void 0
              : data.onboarding_complete),
          ];
        case 2:
          error_2 = _b.sent();
          console.error("Error checking onboarding status:", error_2);
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Complete the onboarding process
 */
function completeOnboarding(userId, data) {
  return __awaiter(this, void 0, void 0, function () {
    var result, error_3;
    var _a, _b;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          _c.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            createTenant(userId, {
              name: data.companyName,
              industry: data.industry,
              website_url:
                data.website ||
                ((_a = data.companyDetails) === null || _a === void 0
                  ? void 0
                  : _a.website_url),
              target_customer:
                (_b = data.companyDetails) === null || _b === void 0
                  ? void 0
                  : _b.target_customer,
              risk_appetite: data.riskAppetite,
              goals: data.goals,
            }),
          ];
        case 1:
          result = _c.sent();
          if (!result.success) {
            sonner_1.toast.error("Failed to complete onboarding", {
              description: result.error || "Please try again",
            });
            return [2 /*return*/, false];
          }
          sonner_1.toast.success("Onboarding completed successfully!");
          return [2 /*return*/, true];
        case 2:
          error_3 = _c.sent();
          console.error("Error completing onboarding:", error_3);
          sonner_1.toast.error("Failed to complete onboarding");
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Recreate the function that was missing and caused the build errors
function saveOnboardingInfo(userId, data) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_4;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          if (!userId) {
            console.error("No user ID provided for saving onboarding info");
            return [2 /*return*/, false];
          }
          return [
            4 /*yield*/,
            client_1.supabase
              .from("profiles")
              .update(
                __assign(
                  { onboarding_step: data.step, industry: data.industry },
                  data,
                ),
              )
              .eq("id", userId),
          ];
        case 1:
          error = _a.sent().error;
          if (error) throw error;
          return [2 /*return*/, true];
        case 2:
          error_4 = _a.sent();
          console.error("Error saving onboarding info:", error_4);
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
