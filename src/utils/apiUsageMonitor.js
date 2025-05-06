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
exports.recordApiUsage = recordApiUsage;
exports.getApiUsage = getApiUsage;
exports.getUsageSummary = getUsageSummary;
var client_1 = require("@/integrations/supabase/client");
var monitoring_1 = require("@/utils/monitoring");
var USAGE_TIER_LIMITS = {
  starter: {
    tier: "starter",
    maxApiCalls: 1000,
    maxOpenAiTokens: 100000,
    maxStrategyGenerations: 10,
    maxCampaignGenerations: 10,
    maxScriptGenerations: 20,
    maxAiDebateRuns: 5,
  },
  pro: {
    tier: "pro",
    maxApiCalls: 5000,
    maxOpenAiTokens: 500000,
    maxStrategyGenerations: 50,
    maxCampaignGenerations: 50,
    maxScriptGenerations: 100,
    maxAiDebateRuns: 25,
  },
  enterprise: {
    tier: "enterprise",
    maxApiCalls: 999999, // Unlimited for practical purposes
    maxOpenAiTokens: 9999999,
    maxStrategyGenerations: 999,
    maxCampaignGenerations: 999,
    maxScriptGenerations: 999,
    maxAiDebateRuns: 999,
  },
};
/**
 * Records API usage for a specific company
 */
function recordApiUsage(companyId_1, usageType_1) {
  return __awaiter(
    this,
    arguments,
    void 0,
    function (companyId, usageType, amount) {
      var _a,
        usageData,
        fetchError,
        newUsage,
        columnMap,
        columnName,
        upsertError,
        error_1;
      if (amount === void 0) {
        amount = 1;
      }
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 4, , 5]);
            return [
              4 /*yield*/,
              client_1.supabase
                .from("api_usage")
                .select("*")
                .eq("company_id", companyId)
                .single(),
            ];
          case 1:
            (_a = _b.sent()), (usageData = _a.data), (fetchError = _a.error);
            if (fetchError && fetchError.code !== "PGRST116") {
              // PGRST116 = not found
              console.error("Error fetching API usage:", fetchError);
              return [2 /*return*/, false];
            }
            newUsage = usageData || {
              company_id: companyId,
              total_api_calls: 0,
              openai_tokens_used: 0,
              strategy_generations: 0,
              campaign_generations: 0,
              script_generations: 0,
              ai_debate_runs: 0,
            };
            // Increment the total API calls
            newUsage.total_api_calls = (newUsage.total_api_calls || 0) + 1;
            columnMap = {
              openAiTokensUsed: "openai_tokens_used",
              strategyGenerations: "strategy_generations",
              campaignGenerations: "campaign_generations",
              scriptGenerations: "script_generations",
              aiDebateRuns: "ai_debate_runs",
            };
            columnName = columnMap[usageType];
            if (columnName) {
              // @ts-ignore - we know the column exists
              newUsage[columnName] = (newUsage[columnName] || 0) + amount;
            }
            return [
              4 /*yield*/,
              client_1.supabase.from("api_usage").upsert(newUsage),
            ];
          case 2:
            upsertError = _b.sent().error;
            if (upsertError) {
              console.error("Error updating API usage:", upsertError);
              return [2 /*return*/, false];
            }
            // Check for approaching limits
            return [4 /*yield*/, checkUsageLimits(companyId, newUsage)];
          case 3:
            // Check for approaching limits
            _b.sent();
            return [2 /*return*/, true];
          case 4:
            error_1 = _b.sent();
            console.error("Error recording API usage:", error_1);
            return [2 /*return*/, false];
          case 5:
            return [2 /*return*/];
        }
      });
    },
  );
}
/**
 * Gets API usage for a specific company
 */
function getApiUsage(companyId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("api_usage")
              .select("*")
              .eq("company_id", companyId)
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error fetching API usage:", error);
            return [2 /*return*/, null];
          }
          return [
            2 /*return*/,
            {
              totalApiCalls: data.total_api_calls || 0,
              openAiTokensUsed: data.openai_tokens_used || 0,
              strategyGenerations: data.strategy_generations || 0,
              campaignGenerations: data.campaign_generations || 0,
              scriptGenerations: data.script_generations || 0,
              aiDebateRuns: data.ai_debate_runs || 0,
              lastUpdated: new Date(data.updated_at),
            },
          ];
        case 2:
          error_2 = _b.sent();
          console.error("Error getting API usage:", error_2);
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Checks if the company is approaching API usage limits
 */
function checkUsageLimits(companyId, currentUsage) {
  return __awaiter(this, void 0, void 0, function () {
    var _a,
      companyData,
      companyError,
      tier,
      limits,
      approachingLimits,
      warningThreshold,
      error_3;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 4, , 5]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("profiles")
              .select("subscription_tier")
              .eq("company_id", companyId)
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (companyData = _a.data), (companyError = _a.error);
          if (companyError) {
            console.error(
              "Error fetching company subscription tier:",
              companyError,
            );
            return [2 /*return*/];
          }
          tier =
            (companyData === null || companyData === void 0
              ? void 0
              : companyData.subscription_tier) || "starter";
          limits = USAGE_TIER_LIMITS[tier];
          approachingLimits = [];
          warningThreshold = 0.8;
          // Check API calls
          if (
            currentUsage.total_api_calls >=
            limits.maxApiCalls * warningThreshold
          ) {
            approachingLimits.push(
              "API calls ("
                .concat(currentUsage.total_api_calls, "/")
                .concat(limits.maxApiCalls, ")"),
            );
          }
          // Check OpenAI tokens
          if (
            currentUsage.openai_tokens_used >=
            limits.maxOpenAiTokens * warningThreshold
          ) {
            approachingLimits.push(
              "OpenAI tokens ("
                .concat(currentUsage.openai_tokens_used, "/")
                .concat(limits.maxOpenAiTokens, ")"),
            );
          }
          // Check strategy generations
          if (
            currentUsage.strategy_generations >=
            limits.maxStrategyGenerations * warningThreshold
          ) {
            approachingLimits.push(
              "Strategy generations ("
                .concat(currentUsage.strategy_generations, "/")
                .concat(limits.maxStrategyGenerations, ")"),
            );
          }
          // Check campaign generations
          if (
            currentUsage.campaign_generations >=
            limits.maxCampaignGenerations * warningThreshold
          ) {
            approachingLimits.push(
              "Campaign generations ("
                .concat(currentUsage.campaign_generations, "/")
                .concat(limits.maxCampaignGenerations, ")"),
            );
          }
          // Check script generations
          if (
            currentUsage.script_generations >=
            limits.maxScriptGenerations * warningThreshold
          ) {
            approachingLimits.push(
              "Script generations ("
                .concat(currentUsage.script_generations, "/")
                .concat(limits.maxScriptGenerations, ")"),
            );
          }
          // Check AI debate runs
          if (
            currentUsage.ai_debate_runs >=
            limits.maxAiDebateRuns * warningThreshold
          ) {
            approachingLimits.push(
              "AI debate runs ("
                .concat(currentUsage.ai_debate_runs, "/")
                .concat(limits.maxAiDebateRuns, ")"),
            );
          }
          if (!(approachingLimits.length > 0)) return [3 /*break*/, 3];
          // Log a system alert
          (0, monitoring_1.reportWarning)(
            "API Usage Limit Approaching",
            "Company "
              .concat(companyId, " is approaching usage limits: ")
              .concat(approachingLimits.join(", ")),
            {
              companyId: companyId,
              tier: tier,
              currentUsage: currentUsage,
              limits: limits,
            },
          );
          // Store notification for admins
          return [
            4 /*yield*/,
            client_1.supabase.from("admin_notifications").insert({
              type: "usage_limit",
              title: "API Usage Limit Approaching",
              message: "Company is approaching usage limits: ".concat(
                approachingLimits.join(", "),
              ),
              company_id: companyId,
              metadata: { usageData: currentUsage, tier: tier, limits: limits },
            }),
          ];
        case 2:
          // Store notification for admins
          _b.sent();
          // If threshold is exceeded, suggest upgrade
          if (currentUsage.total_api_calls >= limits.maxApiCalls * 0.9) {
            suggestUpgrade(companyId, tier);
          }
          _b.label = 3;
        case 3:
          return [3 /*break*/, 5];
        case 4:
          error_3 = _b.sent();
          console.error("Error checking usage limits:", error_3);
          return [3 /*break*/, 5];
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Suggests an upgrade to the next tier
 */
function suggestUpgrade(companyId, currentTier) {
  return __awaiter(this, void 0, void 0, function () {
    var nextTier, error_4;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          nextTier = currentTier === "starter" ? "pro" : "enterprise";
          // Create an upgrade suggestion notification
          return [
            4 /*yield*/,
            client_1.supabase.from("user_notifications").insert({
              type: "upgrade_suggestion",
              title: "Upgrade Suggested",
              message: "You're approaching your "
                .concat(currentTier, " plan limits. Consider upgrading to ")
                .concat(nextTier, " for increased capacity."),
              company_id: companyId,
              action_link: "/pricing",
              action_text: "View Upgrade Options",
            }),
          ];
        case 1:
          // Create an upgrade suggestion notification
          _a.sent();
          // Log the suggestion
          console.log(
            "Upgrade suggested for company "
              .concat(companyId, ": ")
              .concat(currentTier, " -> ")
              .concat(nextTier),
          );
          return [3 /*break*/, 3];
        case 2:
          error_4 = _a.sent();
          console.error("Error suggesting upgrade:", error_4);
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Gets usage summary for admin dashboard
 */
function getUsageSummary() {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_5;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("api_usage")
              .select(
                "\n        *,\n        companies:company_id(name)\n      ",
              )
              .order("total_api_calls", { ascending: false })
              .limit(10),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error fetching usage summary:", error);
            return [2 /*return*/, []];
          }
          return [2 /*return*/, data];
        case 2:
          error_5 = _b.sent();
          console.error("Error getting usage summary:", error_5);
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
