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
exports.updateCompanyDetails = updateCompanyDetails;
var supabase_1 = require("@/backend/supabase");
/**
 * Updates or creates a company record with detailed information
 */
function updateCompanyDetails(userId, companyDetails) {
  return __awaiter(this, void 0, void 0, function () {
    var _a,
      profile,
      profileError,
      companyId,
      extraDetails,
      updateError,
      profileUpdateError_1,
      _b,
      companyData,
      companyError,
      profileUpdateError,
      error_1;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          _c.trys.push([0, 7, , 8]);
          console.log("Starting company update process for user:", userId);
          console.log("Company details:", companyDetails);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("profiles")
              .select("company_id, company")
              .eq("id", userId)
              .single(),
          ];
        case 1:
          (_a = _c.sent()), (profile = _a.data), (profileError = _a.error);
          if (profileError && profileError.code !== "PGRST116") {
            console.error("Error fetching profile:", profileError);
            throw profileError;
          }
          companyId =
            profile === null || profile === void 0
              ? void 0
              : profile.company_id;
          console.log("User company_id:", companyId);
          extraDetails = __assign(
            {
              description: companyDetails.description,
              mission: companyDetails.mission,
              vision: companyDetails.vision,
              headquarters: companyDetails.headquarters,
              phone: companyDetails.phone,
              website: companyDetails.website,
              email: companyDetails.email,
              businessModel: companyDetails.businessModel,
              marketInfo: companyDetails.marketInfo,
              products: companyDetails.products,
              team: companyDetails.team,
              financials: companyDetails.financials,
              techStack: companyDetails.techStack,
              legalEntity: companyDetails.legalEntity,
              stage: companyDetails.stage,
            },
            companyDetails.additionalDetails,
          );
          if (!companyId) return [3 /*break*/, 4];
          console.log("Updating existing company:", companyId);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("companies")
              .update({
                name: companyDetails.name,
                industry: companyDetails.industry,
                details: extraDetails,
              })
              .eq("id", companyId),
          ];
        case 2:
          updateError = _c.sent().error;
          if (updateError) {
            console.error("Company update error:", updateError);
            throw updateError;
          }
          console.log("Company updated successfully");
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("profiles")
              .update({
                company: companyDetails.name,
                industry: companyDetails.industry,
              })
              .eq("id", userId),
          ];
        case 3:
          profileUpdateError_1 = _c.sent().error;
          if (profileUpdateError_1) {
            console.error("Profile update error:", profileUpdateError_1);
            throw profileUpdateError_1;
          }
          console.log("User profile updated successfully");
          return [2 /*return*/, { success: true, companyId: companyId }];
        case 4:
          // Create new company if user doesn't have one
          console.log("Creating new company for user:", userId);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("companies")
              .insert([
                {
                  name: companyDetails.name,
                  industry: companyDetails.industry,
                  details: extraDetails,
                },
              ])
              .select("id")
              .single(),
          ];
        case 5:
          (_b = _c.sent()), (companyData = _b.data), (companyError = _b.error);
          if (companyError) {
            console.error("Company creation error:", companyError);
            throw companyError;
          }
          companyId = companyData.id;
          console.log("New company created with ID:", companyId);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("profiles")
              .update({
                company: companyDetails.name,
                industry: companyDetails.industry,
                company_id: companyId,
                role: "admin",
              })
              .eq("id", userId),
          ];
        case 6:
          profileUpdateError = _c.sent().error;
          if (profileUpdateError) {
            console.error("Profile update error:", profileUpdateError);
            throw profileUpdateError;
          }
          console.log("User profile updated with new company ID");
          return [2 /*return*/, { success: true, companyId: companyId }];
        case 7:
          error_1 = _c.sent();
          console.error("Failed to update company details:", error_1);
          return [
            2 /*return*/,
            {
              success: false,
              error:
                error_1.message ||
                "An unexpected error occurred updating company details",
            },
          ];
        case 8:
          return [2 /*return*/];
      }
    });
  });
}
