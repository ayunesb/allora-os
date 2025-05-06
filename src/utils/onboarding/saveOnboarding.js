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
exports.saveOnboardingInfo = saveOnboardingInfo;
var client_1 = require("@/integrations/supabase/client");
var masterAccountIntegrations_1 = require("@/utils/masterAccountIntegrations");
/**
 * Saves onboarding information for a user and sets up external service integrations
 */
function saveOnboardingInfo(
  userId,
  companyName,
  industry,
  goals,
  companyDetails,
) {
  return __awaiter(this, void 0, void 0, function () {
    var session,
      userEmail,
      _a,
      profileData,
      profileCheckError,
      companyId,
      enhancedDetails,
      updateError,
      enhancedDetails,
      _b,
      newCompany,
      createError,
      updateData,
      integrationResult,
      error_1,
      profileUpdateError,
      error_2;
    var _c;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          _d.trys.push([0, 12, , 13]);
          if (!userId) {
            throw new Error("User ID is required");
          }
          if (!companyName || companyName.trim().length < 2) {
            throw new Error(
              "Company name is required and must be at least 2 characters",
            );
          }
          if (!industry) {
            throw new Error("Industry is required");
          }
          if (!goals.length) {
            throw new Error("At least one business goal must be selected");
          }
          console.log("Saving onboarding info:", {
            userId: userId,
            companyName: companyName,
            industry: industry,
            goals: goals,
          });
          console.log("Company details:", companyDetails);
          return [4 /*yield*/, client_1.supabase.auth.getSession()];
        case 1:
          session = _d.sent().data.session;
          if (!session) {
            throw new Error("No active session found. Please log in again.");
          }
          userEmail = session.user.email;
          if (!userEmail) {
            throw new Error("User email is required for account setup.");
          }
          return [
            4 /*yield*/,
            client_1.supabase
              .from("profiles")
              .select("company_id, company")
              .eq("id", userId)
              .maybeSingle(),
          ];
        case 2:
          (_a = _d.sent()),
            (profileData = _a.data),
            (profileCheckError = _a.error);
          if (profileCheckError && profileCheckError.code !== "PGRST116") {
            console.error("Profile check error:", profileCheckError);
            throw new Error(
              "Failed to check user profile: ".concat(
                profileCheckError.message,
              ),
            );
          }
          companyId = null;
          if (
            !(profileData === null || profileData === void 0
              ? void 0
              : profileData.company_id)
          )
            return [3 /*break*/, 4];
          console.log(
            "User already has a company, updating existing company:",
            profileData.company_id,
          );
          enhancedDetails = __assign(__assign({}, companyDetails || {}), {
            goals: goals,
            communication_preferences: {
              whatsapp_enabled:
                (companyDetails === null || companyDetails === void 0
                  ? void 0
                  : companyDetails.whatsAppEnabled) !== false,
              email_enabled:
                (companyDetails === null || companyDetails === void 0
                  ? void 0
                  : companyDetails.emailEnabled) !== false,
            },
            executive_team_enabled:
              (companyDetails === null || companyDetails === void 0
                ? void 0
                : companyDetails.executiveTeamEnabled) !== false,
          });
          return [
            4 /*yield*/,
            client_1.supabase
              .from("companies")
              .update({
                name: companyName,
                industry: industry,
                details: enhancedDetails,
              })
              .eq("id", profileData.company_id),
          ];
        case 3:
          updateError = _d.sent().error;
          if (updateError) {
            console.error("Company update error:", updateError);
            throw new Error(
              "Failed to update company: ".concat(updateError.message),
            );
          }
          companyId = profileData.company_id;
          return [3 /*break*/, 6];
        case 4:
          enhancedDetails = __assign(__assign({}, companyDetails || {}), {
            goals: goals,
            communication_preferences: {
              whatsapp_enabled:
                (companyDetails === null || companyDetails === void 0
                  ? void 0
                  : companyDetails.whatsAppEnabled) !== false,
              email_enabled:
                (companyDetails === null || companyDetails === void 0
                  ? void 0
                  : companyDetails.emailEnabled) !== false,
            },
            executive_team_enabled:
              (companyDetails === null || companyDetails === void 0
                ? void 0
                : companyDetails.executiveTeamEnabled) !== false,
          });
          return [
            4 /*yield*/,
            client_1.supabase
              .from("companies")
              .insert([
                {
                  name: companyName,
                  industry: industry,
                  details: enhancedDetails,
                },
              ])
              .select("id")
              .single(),
          ];
        case 5:
          (_b = _d.sent()), (newCompany = _b.data), (createError = _b.error);
          if (createError) {
            console.error("Company creation error:", createError);
            // If there's an RLS error or permission issue, fall back to just setting the profile
            if (
              createError.code === "42501" ||
              ((_c = createError.message) === null || _c === void 0
                ? void 0
                : _c.includes("permission"))
            ) {
              console.log(
                "Falling back to profile update only due to permission issue",
              );
            } else {
              throw new Error(
                "Failed to create company: ".concat(createError.message),
              );
            }
          } else if (newCompany) {
            companyId = newCompany.id;
            console.log("Created new company with ID:", companyId);
          }
          _d.label = 6;
        case 6:
          updateData = {
            company: companyName,
            industry: industry,
            role: "admin",
          };
          if (!companyId) return [3 /*break*/, 10];
          updateData.company_id = companyId;
          // Set up external service integrations for the company
          console.log("Setting up integrations for company:", companyId);
          _d.label = 7;
        case 7:
          _d.trys.push([7, 9, , 10]);
          return [
            4 /*yield*/,
            (0, masterAccountIntegrations_1.setupCompanyIntegrations)(
              companyId,
              companyName,
              industry,
              userEmail,
            ),
          ];
        case 8:
          integrationResult = _d.sent();
          if (!integrationResult.success) {
            console.warn(
              "Warning: Failed to set up some integrations:",
              integrationResult.error,
            );
            // Continue with onboarding even if some integrations fail
          } else {
            console.log("Integration setup successful");
          }
          return [3 /*break*/, 10];
        case 9:
          error_1 = _d.sent();
          // Don't fail the whole process if integration setup fails
          console.warn("Error setting up integrations:", error_1);
          return [3 /*break*/, 10];
        case 10:
          return [
            4 /*yield*/,
            client_1.supabase
              .from("profiles")
              .update(updateData)
              .eq("id", userId),
          ];
        case 11:
          profileUpdateError = _d.sent().error;
          if (profileUpdateError) {
            console.error("Profile update error:", profileUpdateError);
            throw new Error(
              "Failed to update profile: ".concat(profileUpdateError.message),
            );
          }
          // Store the business goals (in a real app, you would create a goals table)
          console.log("Company goals would be stored:", goals);
          console.log("Onboarding completed successfully!");
          return [2 /*return*/, { success: true }];
        case 12:
          error_2 = _d.sent();
          console.error("Error in saveOnboardingInfo:", error_2);
          return [
            2 /*return*/,
            {
              success: false,
              error: error_2.message || "An unexpected error occurred",
            },
          ];
        case 13:
          return [2 /*return*/];
      }
    });
  });
}
