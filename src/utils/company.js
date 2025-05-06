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
exports.fetchCompanyDetails = fetchCompanyDetails;
var client_1 = require("@/integrations/supabase/client");
var profileHelpers_1 = require("./profileHelpers");
function updateCompanyDetails(userId, details) {
  return __awaiter(this, void 0, void 0, function () {
    var _a,
      profile,
      profileError,
      created,
      _b,
      updatedProfile,
      updateProfileError,
      companyError,
      updateError,
      error_1;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          _c.trys.push([0, 7, , 8]);
          console.log("Updating company details for user:", userId);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("profiles")
              .select("company_id, company, industry")
              .eq("id", userId)
              .single(),
          ];
        case 1:
          (_a = _c.sent()), (profile = _a.data), (profileError = _a.error);
          if (profileError) {
            console.error("Error fetching profile:", profileError);
            return [
              2 /*return*/,
              { success: false, error: "Failed to fetch user profile" },
            ];
          }
          if (!!profile.company_id) return [3 /*break*/, 4];
          console.log("User has no company, creating one:", details.name);
          return [
            4 /*yield*/,
            (0, profileHelpers_1.saveCompanyInfo)(
              userId,
              details.name,
              details.industry,
            ),
          ];
        case 2:
          created = _c.sent();
          if (!created) {
            return [
              2 /*return*/,
              { success: false, error: "Failed to create company" },
            ];
          }
          return [
            4 /*yield*/,
            client_1.supabase
              .from("profiles")
              .select("company_id")
              .eq("id", userId)
              .single(),
          ];
        case 3:
          (_b = _c.sent()),
            (updatedProfile = _b.data),
            (updateProfileError = _b.error);
          if (updateProfileError || !updatedProfile.company_id) {
            return [
              2 /*return*/,
              {
                success: false,
                error: "Failed to get company ID after creation",
              },
            ];
          }
          profile.company_id = updatedProfile.company_id;
          _c.label = 4;
        case 4:
          return [
            4 /*yield*/,
            client_1.supabase
              .from("companies")
              .update({
                name: details.name,
                industry: details.industry,
                details: __assign(
                  {
                    description: details.description,
                    mission: details.mission,
                    vision: details.vision,
                    headquarters: details.headquarters,
                    phone: details.phone,
                  },
                  details.additionalDetails,
                ),
              })
              .eq("id", profile.company_id),
          ];
        case 5:
          companyError = _c.sent().error;
          if (companyError) {
            console.error("Error updating company:", companyError);
            return [
              2 /*return*/,
              { success: false, error: "Failed to update company details" },
            ];
          }
          return [
            4 /*yield*/,
            client_1.supabase
              .from("profiles")
              .update({
                company: details.name,
                industry: details.industry,
              })
              .eq("id", userId),
          ];
        case 6:
          updateError = _c.sent().error;
          if (updateError) {
            console.error("Error updating profile company info:", updateError);
            return [
              2 /*return*/,
              {
                success: false,
                error: "Failed to update profile company information",
              },
            ];
          }
          return [2 /*return*/, { success: true }];
        case 7:
          error_1 = _c.sent();
          console.error("Unexpected error updating company details:", error_1);
          return [
            2 /*return*/,
            {
              success: false,
              error: error_1.message || "An unexpected error occurred",
            },
          ];
        case 8:
          return [2 /*return*/];
      }
    });
  });
}
function fetchCompanyDetails(companyId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("companies")
              .select("details")
              .eq("id", companyId)
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error fetching company details:", error);
            return [2 /*return*/, null];
          }
          return [
            2 /*return*/,
            (data === null || data === void 0 ? void 0 : data.details) || {},
          ];
        case 2:
          error_2 = _b.sent();
          console.error("Unexpected error fetching company details:", error_2);
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
