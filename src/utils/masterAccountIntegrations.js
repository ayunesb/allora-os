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
exports.setupCompanyIntegrations = setupCompanyIntegrations;
exports.getCompanyIntegrationIds = getCompanyIntegrationIds;
exports.createLocalCustomer = createLocalCustomer;
var supabase_1 = require("@/backend/supabase");
var stripe_1 = require("@/backend/stripe");
/**
 * Creates integration records for a new company in all master service accounts
 * This function is called during the onboarding process to set up a company with all integrations
 */
function setupCompanyIntegrations(companyId, companyName, industry, email) {
  return __awaiter(this, void 0, void 0, function () {
    var integrationIds, stripeResult, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          console.log("Setting up integrations for company:", companyName);
          integrationIds = {};
          return [
            4 /*yield*/,
            createStripeCustomer(companyName, email, industry),
          ];
        case 1:
          stripeResult = _a.sent();
          if (stripeResult.success && stripeResult.customerId) {
            integrationIds.stripe_customer_id = stripeResult.customerId;
            console.log("Created Stripe customer:", stripeResult.customerId);
          } else {
            console.warn(
              "Failed to create Stripe customer:",
              stripeResult.error,
            );
          }
          // 2. Store all integration IDs in Supabase
          return [4 /*yield*/, storeIntegrationIds(companyId, integrationIds)];
        case 2:
          // 2. Store all integration IDs in Supabase
          _a.sent();
          console.log("Successfully set up company integrations");
          return [2 /*return*/, { success: true }];
        case 3:
          error_1 = _a.sent();
          console.error("Failed to set up company integrations:", error_1);
          return [
            2 /*return*/,
            {
              success: false,
              error:
                error_1.message ||
                "An unexpected error occurred during integration setup",
            },
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Creates a Stripe customer for a company in the master Stripe account
 */
function createStripeCustomer(companyName, email, industry) {
  return __awaiter(this, void 0, void 0, function () {
    var customerId, customerData, error_2;
    var _a;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          console.log("Creating Stripe customer for:", companyName, email);
          customerId = companyName;
          customerData = {
            email: email,
            industry: industry,
            source: "allora_platform",
          };
          return [
            4 /*yield*/,
            (0, stripe_1.createCustomer)(String(customerId)),
          ];
        case 1:
          _b.sent();
          if (!response.success) {
            throw new Error(
              (_a = response.message) !== null && _a !== void 0
                ? _a
                : "Unknown error",
            ); // Ensure `message` is accessed correctly
          }
          return [
            2 /*return*/,
            {
              success: true,
              customerId: response.customerId,
            },
          ];
        case 2:
          error_2 = _b.sent();
          console.error("Failed to create Stripe customer:", error_2);
          return [
            2 /*return*/,
            {
              success: false,
              error: error_2.message || "Failed to create Stripe customer",
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Stores integration IDs in the company_integrations table
 */
function storeIntegrationIds(companyId, integrationIds) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, fetchError, updateError, insertError, error_3;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 6, , 7]);
          console.log(
            "Storing integration IDs for company:",
            companyId,
            integrationIds,
          );
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("company_integrations")
              .select("*")
              .eq("company_id", companyId)
              .maybeSingle(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (fetchError = _a.error);
          if (fetchError) {
            console.error(
              "Error fetching existing integration record:",
              fetchError,
            );
            throw fetchError;
          }
          if (!data) return [3 /*break*/, 3];
          console.log("Updating existing integration record");
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("company_integrations")
              .update({
                integration_ids: integrationIds,
              })
              .eq("company_id", companyId),
          ];
        case 2:
          updateError = _b.sent().error;
          if (updateError) {
            console.error("Error updating integration record:", updateError);
            throw updateError;
          }
          return [3 /*break*/, 5];
        case 3:
          console.log("Creating new integration record");
          return [
            4 /*yield*/,
            supabase_1.supabase.from("company_integrations").insert({
              company_id: companyId,
              integration_ids: integrationIds,
            }),
          ];
        case 4:
          insertError = _b.sent().error;
          if (insertError) {
            console.error("Error inserting integration record:", insertError);
            throw insertError;
          }
          _b.label = 5;
        case 5:
          console.log("Successfully stored integration IDs");
          return [3 /*break*/, 7];
        case 6:
          error_3 = _b.sent();
          console.error("Failed to store integration IDs:", error_3);
          throw error_3;
        case 7:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Retrieves the integration IDs for a company
 */
function getCompanyIntegrationIds(companyId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, typedIntegrationIds_1, error_4;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          console.log("Getting integration IDs for company:", companyId);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("company_integrations")
              .select("integration_ids")
              .eq("company_id", companyId)
              .maybeSingle(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error fetching integration IDs:", error);
            throw error;
          }
          // Ensure we're returning a Record<string, string> or null
          if (
            data === null || data === void 0 ? void 0 : data.integration_ids
          ) {
            typedIntegrationIds_1 = {};
            // Convert the JSONB data to the expected type
            if (typeof data.integration_ids === "object") {
              Object.entries(data.integration_ids).forEach(function (_a) {
                var key = _a[0],
                  value = _a[1];
                if (typeof value === "string") {
                  typedIntegrationIds_1[key] = value;
                }
              });
            }
            console.log("Found integration IDs:", typedIntegrationIds_1);
            return [2 /*return*/, typedIntegrationIds_1];
          }
          console.log("No integration IDs found");
          return [2 /*return*/, null];
        case 2:
          error_4 = _b.sent();
          console.error(
            "Failed to get company integration IDs:",
            error_4.message,
          );
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function createLocalCustomer(data) {
  return __awaiter(this, void 0, void 0, function () {
    return __generator(this, function (_a) {
      return [2 /*return*/];
    });
  });
}
