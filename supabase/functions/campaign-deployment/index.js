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
var server_ts_1 = require("https://deno.land/std@0.177.0/http/server.ts");
var supabase_js_2_38_0_1 = require("https://esm.sh/@supabase/supabase-js@2.38.0");
var SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
var SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
var META_API_VERSION = "v18.0";
var TIKTOK_API_VERSION = "v1.3";
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var supabase,
      _a,
      user,
      authError,
      _b,
      action,
      campaignId,
      _c,
      campaign,
      campaignError,
      _d,
      connection,
      connectionError,
      response_1,
      response_2,
      response_3,
      response_4,
      err_1;
    return __generator(this, function (_e) {
      switch (_e.label) {
        case 0:
          // Handle CORS
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          supabase = (0, supabase_js_2_38_0_1.createClient)(
            SUPABASE_URL,
            SUPABASE_ANON_KEY,
            {
              auth: {
                autoRefreshToken: false,
                persistSession: false,
                detectSessionInUrl: false,
              },
              global: {
                headers: {
                  Authorization: req.headers.get("Authorization") || "",
                },
              },
            },
          );
          _e.label = 1;
        case 1:
          _e.trys.push([1, 19, , 20]);
          return [4 /*yield*/, supabase.auth.getUser()];
        case 2:
          (_a = _e.sent()), (user = _a.data.user), (authError = _a.error);
          if (authError || !user) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          return [4 /*yield*/, req.json()];
        case 3:
          (_b = _e.sent()), (action = _b.action), (campaignId = _b.campaignId);
          if (!campaignId) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Campaign ID is required" }),
                {
                  status: 400,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            4 /*yield*/,
            supabase
              .from("campaigns")
              .select("*, companies(id)")
              .eq("id", campaignId)
              .single(),
          ];
        case 4:
          (_c = _e.sent()), (campaign = _c.data), (campaignError = _c.error);
          if (campaignError || !campaign) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Campaign not found",
                  details: campaignError,
                }),
                {
                  status: 404,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          // Check if payment is complete
          if (campaign.payment_status !== "paid") {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Campaign payment not completed" }),
                {
                  status: 400,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            4 /*yield*/,
            supabase
              .from("ad_platform_connections")
              .select("*")
              .eq("company_id", campaign.company_id)
              .eq("platform", campaign.ad_platform)
              .eq("is_active", true)
              .single(),
          ];
        case 5:
          (_d = _e.sent()),
            (connection = _d.data),
            (connectionError = _d.error);
          if (connectionError || !connection) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "No active ".concat(
                    campaign.ad_platform,
                    " connection found",
                  ),
                  details: connectionError,
                }),
                {
                  status: 404,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          // Check if token is expired
          if (new Date(connection.token_expires_at) < new Date()) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error:
                    "Ad platform token expired. Please reconnect your account.",
                }),
                {
                  status: 401,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          if (!(action === "deploy")) return [3 /*break*/, 11];
          if (!(campaign.ad_platform === "meta")) return [3 /*break*/, 7];
          return [4 /*yield*/, deployToMetaAds(campaign, connection)];
        case 6:
          response_1 = _e.sent();
          return [
            2 /*return*/,
            new Response(JSON.stringify(response_1), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 7:
          if (!(campaign.ad_platform === "tiktok")) return [3 /*break*/, 9];
          return [4 /*yield*/, deployToTikTokAds(campaign, connection)];
        case 8:
          response_2 = _e.sent();
          return [
            2 /*return*/,
            new Response(JSON.stringify(response_2), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 9:
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: "Unsupported ad platform" }), {
              status: 400,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 10:
          return [3 /*break*/, 18];
        case 11:
          if (!(action === "sync")) return [3 /*break*/, 17];
          if (!(campaign.ad_platform === "meta")) return [3 /*break*/, 13];
          return [4 /*yield*/, syncFromMetaAds(campaign, connection)];
        case 12:
          response_3 = _e.sent();
          return [
            2 /*return*/,
            new Response(JSON.stringify(response_3), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 13:
          if (!(campaign.ad_platform === "tiktok")) return [3 /*break*/, 15];
          return [4 /*yield*/, syncFromTikTokAds(campaign, connection)];
        case 14:
          response_4 = _e.sent();
          return [
            2 /*return*/,
            new Response(JSON.stringify(response_4), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 15:
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: "Unsupported ad platform" }), {
              status: 400,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 16:
          return [3 /*break*/, 18];
        case 17:
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: "Invalid action" }), {
              status: 400,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 18:
          return [3 /*break*/, 20];
        case 19:
          err_1 = _e.sent();
          console.error("Campaign deployment error: ".concat(err_1.message));
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: err_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 20:
          return [2 /*return*/];
      }
    });
  });
});
// Function to deploy campaign to Meta Ads
function deployToMetaAds(campaign, connection) {
  return __awaiter(this, void 0, void 0, function () {
    var platformCampaignId, error, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          // In a real implementation, this would use the Meta Marketing API to create a campaign
          // For demo purposes, we'll simulate a successful deployment
          // Simulate API call delay
          return [
            4 /*yield*/,
            new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            }),
          ];
        case 1:
          // In a real implementation, this would use the Meta Marketing API to create a campaign
          // For demo purposes, we'll simulate a successful deployment
          // Simulate API call delay
          _a.sent();
          platformCampaignId = "fb_".concat(
            Math.floor(Math.random() * 1000000000),
          );
          return [
            4 /*yield*/,
            supabase
              .from("campaigns")
              .update({
                platform_specific_id: platformCampaignId,
                platform_status: "ACTIVE",
                deployment_status: "deployed",
                last_synced_at: new Date().toISOString(),
              })
              .eq("id", campaign.id),
          ];
        case 2:
          error = _a.sent().error;
          if (error) {
            throw new Error(
              "Failed to update campaign status: ".concat(error.message),
            );
          }
          return [
            2 /*return*/,
            {
              success: true,
              platform_campaign_id: platformCampaignId,
              status: "ACTIVE",
              message: "Campaign successfully deployed to Meta Ads",
            },
          ];
        case 3:
          error_1 = _a.sent();
          console.error("Meta deployment error:", error_1);
          return [
            2 /*return*/,
            {
              success: false,
              error: error_1.message,
            },
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
// Function to deploy campaign to TikTok Ads
function deployToTikTokAds(campaign, connection) {
  return __awaiter(this, void 0, void 0, function () {
    var platformCampaignId, error, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          // In a real implementation, this would use the TikTok Ads API to create a campaign
          // For demo purposes, we'll simulate a successful deployment
          // Simulate API call delay
          return [
            4 /*yield*/,
            new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            }),
          ];
        case 1:
          // In a real implementation, this would use the TikTok Ads API to create a campaign
          // For demo purposes, we'll simulate a successful deployment
          // Simulate API call delay
          _a.sent();
          platformCampaignId = "tt_".concat(
            Math.floor(Math.random() * 1000000000),
          );
          return [
            4 /*yield*/,
            supabase
              .from("campaigns")
              .update({
                platform_specific_id: platformCampaignId,
                platform_status: "CAMPAIGN_STATUS_ENABLE",
                deployment_status: "deployed",
                last_synced_at: new Date().toISOString(),
              })
              .eq("id", campaign.id),
          ];
        case 2:
          error = _a.sent().error;
          if (error) {
            throw new Error(
              "Failed to update campaign status: ".concat(error.message),
            );
          }
          return [
            2 /*return*/,
            {
              success: true,
              platform_campaign_id: platformCampaignId,
              status: "CAMPAIGN_STATUS_ENABLE",
              message: "Campaign successfully deployed to TikTok Ads",
            },
          ];
        case 3:
          error_2 = _a.sent();
          console.error("TikTok deployment error:", error_2);
          return [
            2 /*return*/,
            {
              success: false,
              error: error_2.message,
            },
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
// Function to sync campaign data from Meta Ads
function syncFromMetaAds(campaign, connection) {
  return __awaiter(this, void 0, void 0, function () {
    var metrics, error, error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          // In a real implementation, this would use the Meta Marketing API to get campaign insights
          // For demo purposes, we'll generate mock performance metrics
          // Simulate API call delay
          return [
            4 /*yield*/,
            new Promise(function (resolve) {
              return setTimeout(resolve, 800);
            }),
          ];
        case 1:
          // In a real implementation, this would use the Meta Marketing API to get campaign insights
          // For demo purposes, we'll generate mock performance metrics
          // Simulate API call delay
          _a.sent();
          metrics = {
            impressions: Math.floor(Math.random() * 100000) + 5000,
            clicks: Math.floor(Math.random() * 5000) + 100,
            ctr: (Math.random() * 5 + 0.5).toFixed(2),
            spend: (Math.random() * campaign.budget * 0.8).toFixed(2),
            conversions: Math.floor(Math.random() * 100) + 5,
            cpa: (Math.random() * 50 + 10).toFixed(2),
          };
          return [
            4 /*yield*/,
            supabase
              .from("campaigns")
              .update({
                performance_metrics: metrics,
                last_synced_at: new Date().toISOString(),
              })
              .eq("id", campaign.id),
          ];
        case 2:
          error = _a.sent().error;
          if (error) {
            throw new Error(
              "Failed to update campaign metrics: ".concat(error.message),
            );
          }
          return [
            2 /*return*/,
            {
              success: true,
              metrics: metrics,
              message: "Campaign metrics successfully synced from Meta Ads",
            },
          ];
        case 3:
          error_3 = _a.sent();
          console.error("Meta sync error:", error_3);
          return [
            2 /*return*/,
            {
              success: false,
              error: error_3.message,
            },
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
// Function to sync campaign data from TikTok Ads
function syncFromTikTokAds(campaign, connection) {
  return __awaiter(this, void 0, void 0, function () {
    var metrics, error, error_4;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 3, , 4]);
          // In a real implementation, this would use the TikTok Ads API to get campaign insights
          // For demo purposes, we'll generate mock performance metrics
          // Simulate API call delay
          return [
            4 /*yield*/,
            new Promise(function (resolve) {
              return setTimeout(resolve, 800);
            }),
          ];
        case 1:
          // In a real implementation, this would use the TikTok Ads API to get campaign insights
          // For demo purposes, we'll generate mock performance metrics
          // Simulate API call delay
          _a.sent();
          metrics = {
            impressions: Math.floor(Math.random() * 150000) + 10000,
            clicks: Math.floor(Math.random() * 8000) + 200,
            ctr: (Math.random() * 7 + 0.8).toFixed(2),
            spend: (Math.random() * campaign.budget * 0.7).toFixed(2),
            conversions: Math.floor(Math.random() * 80) + 10,
            cpa: (Math.random() * 40 + 15).toFixed(2),
            video_views: Math.floor(Math.random() * 80000) + 5000,
          };
          return [
            4 /*yield*/,
            supabase
              .from("campaigns")
              .update({
                performance_metrics: metrics,
                last_synced_at: new Date().toISOString(),
              })
              .eq("id", campaign.id),
          ];
        case 2:
          error = _a.sent().error;
          if (error) {
            throw new Error(
              "Failed to update campaign metrics: ".concat(error.message),
            );
          }
          return [
            2 /*return*/,
            {
              success: true,
              metrics: metrics,
              message: "Campaign metrics successfully synced from TikTok Ads",
            },
          ];
        case 3:
          error_4 = _a.sent();
          console.error("TikTok sync error:", error_4);
          return [
            2 /*return*/,
            {
              success: false,
              error: error_4.message,
            },
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
// In a production environment, we would implement functions to:
// 1. Create ad creatives
// 2. Set up targeting
// 3. Define budget and schedule
// 4. Create the campaign
// 5. Create ad sets/ad groups
// 6. Create ads
// 7. Sync campaign performance data
