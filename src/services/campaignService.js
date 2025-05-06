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
exports.createCampaign = createCampaign;
exports.createCampaignCheckout = createCampaignCheckout;
exports.checkCampaignPaymentStatus = checkCampaignPaymentStatus;
exports.deployCampaign = deployCampaign;
exports.syncCampaignData = syncCampaignData;
exports.getCampaign = getCampaign;
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
/**
 * Create a new ad campaign
 */
function createCampaign(campaignData) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("campaigns")
              .insert({
                name: campaignData.name,
                platform: campaignData.platform,
                budget: campaignData.budget,
                company_id: campaignData.company_id,
                ad_platform: campaignData.platform,
                targeting: campaignData.targeting,
                creatives: campaignData.creatives,
                payment_status: "pending",
                deployment_status: "pending",
              })
              .select("id")
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data) {
            return [2 /*return*/, { success: true, campaignId: data.id }];
          } else {
            throw new Error("Failed to create campaign");
          }
          return [3 /*break*/, 3];
        case 2:
          error_1 = _b.sent();
          sonner_1.toast.error(
            "Failed to create campaign: ".concat(error_1.message),
          );
          return [2 /*return*/, { success: false, error: error_1.message }];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Creates a checkout session for campaign payment
 */
function createCampaignCheckout(campaignId, cancelUrl) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("campaign-payment", {
              body: {
                action: "create-checkout-session",
                campaignId: campaignId,
                cancelUrl: cancelUrl,
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data.url) {
            return [2 /*return*/, { success: true, url: data.url }];
          } else {
            throw new Error("Failed to create checkout session");
          }
          return [3 /*break*/, 3];
        case 2:
          error_2 = _b.sent();
          sonner_1.toast.error(
            "Payment creation failed: ".concat(error_2.message),
          );
          return [2 /*return*/, { success: false, error: error_2.message }];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Check the payment status of a campaign
 */
function checkCampaignPaymentStatus(campaignId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_3;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("campaign-payment", {
              body: {
                action: "check-payment-status",
                campaignId: campaignId,
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [2 /*return*/, { success: true, status: data.status }];
        case 2:
          error_3 = _b.sent();
          console.error(
            "Payment status check failed: ".concat(error_3.message),
          );
          return [2 /*return*/, { success: false, error: error_3.message }];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Deploy campaign to ad platform
 */
function deployCampaign(campaignId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_4;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("campaign-deployment", {
              body: {
                action: "deploy",
                campaignId: campaignId,
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data.success) {
            sonner_1.toast.success("Campaign deployed successfully");
            return [2 /*return*/, { success: true }];
          } else {
            throw new Error(data.error || "Failed to deploy campaign");
          }
          return [3 /*break*/, 3];
        case 2:
          error_4 = _b.sent();
          sonner_1.toast.error(
            "Campaign deployment failed: ".concat(error_4.message),
          );
          return [2 /*return*/, { success: false, error: error_4.message }];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Sync campaign data from ad platform
 */
function syncCampaignData(campaignId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_5;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("campaign-deployment", {
              body: {
                action: "sync",
                campaignId: campaignId,
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          if (data.success) {
            return [2 /*return*/, { success: true, metrics: data.metrics }];
          } else {
            throw new Error(data.error || "Failed to sync campaign data");
          }
          return [3 /*break*/, 3];
        case 2:
          error_5 = _b.sent();
          console.error("Campaign sync failed: ".concat(error_5.message));
          return [2 /*return*/, { success: false, error: error_5.message }];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Get campaign by ID
function getCampaign(campaignId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_6;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("campaigns")
              .select("*")
              .eq("id", campaignId)
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) throw error;
          return [2 /*return*/, data];
        case 2:
          error_6 = _b.sent();
          console.error("Error fetching campaign: ".concat(error_6.message));
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
