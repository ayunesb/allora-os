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
var server_ts_1 = require("https://deno.land/std@0.168.0/http/server.ts");
var supabase_js_2_36_0_1 = require("https://esm.sh/@supabase/supabase-js@2.36.0");
require("https://deno.land/x/xhr@0.1.0/mod.ts");
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var supabaseUrl,
      supabaseKey,
      supabase,
      _a,
      action,
      userId,
      data,
      _b,
      interactionId,
      messageId,
      botName,
      botRole,
      isPositive,
      comment,
      metadata,
      error,
      botName,
      botRole,
      _c,
      model,
      error,
      _d,
      preferences,
      error,
      userPreferences,
      preferences,
      _e,
      existing,
      checkError,
      error,
      result,
      result,
      error_1;
    return __generator(this, function (_f) {
      switch (_f.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          _f.label = 1;
        case 1:
          _f.trys.push([1, 20, , 21]);
          supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
          supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
          supabase = (0, supabase_js_2_36_0_1.createClient)(
            supabaseUrl,
            supabaseKey,
          );
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _f.sent()),
            (action = _a.action),
            (userId = _a.userId),
            (data = _a.data);
          _b = action;
          switch (_b) {
            case "track_feedback":
              return [3 /*break*/, 3];
            case "get_learning_model":
              return [3 /*break*/, 6];
            case "get_user_preferences":
              return [3 /*break*/, 8];
            case "update_user_preferences":
              return [3 /*break*/, 12];
          }
          return [3 /*break*/, 18];
        case 3:
          (interactionId = data.interactionId),
            (messageId = data.messageId),
            (botName = data.botName),
            (botRole = data.botRole),
            (isPositive = data.isPositive),
            (comment = data.comment),
            (metadata = data.metadata);
          return [
            4 /*yield*/,
            supabase.from("user_feedback").insert({
              user_id: userId,
              interaction_id: interactionId,
              message_id: messageId,
              bot_name: botName,
              bot_role: botRole,
              is_positive: isPositive,
              comment: comment || null,
              metadata: metadata || {},
            }),
          ];
        case 4:
          error = _f.sent().error;
          if (error) throw error;
          // Update the feedback count in the learning model
          return [
            4 /*yield*/,
            updateLearningModel(
              supabase,
              botName,
              botRole,
              isPositive,
              metadata === null || metadata === void 0
                ? void 0
                : metadata.topic,
            ),
          ];
        case 5:
          // Update the feedback count in the learning model
          _f.sent();
          return [
            2 /*return*/,
            new Response(JSON.stringify({ success: true }), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 6:
          (botName = data.botName), (botRole = data.botRole);
          return [
            4 /*yield*/,
            supabase
              .from("learning_models")
              .select("*")
              .eq("bot_name", botName)
              .eq("bot_role", botRole)
              .single(),
          ];
        case 7:
          (_c = _f.sent()), (model = _c.data), (error = _c.error);
          if (error && error.code !== "PGRST116") {
            // PGRST116 is "row not found" which is fine
            throw error;
          }
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                model: model || {
                  bot_name: botName,
                  bot_role: botRole,
                  positive_feedback_count: 0,
                  negative_feedback_count: 0,
                  topics: {},
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                },
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 8:
          return [
            4 /*yield*/,
            supabase
              .from("user_preferences")
              .select("*")
              .eq("user_id", userId)
              .single(),
          ];
        case 9:
          (_d = _f.sent()), (preferences = _d.data), (error = _d.error);
          if (error && error.code !== "PGRST116") {
            // PGRST116 is "row not found" which is fine
            throw error;
          }
          if (!!preferences) return [3 /*break*/, 11];
          return [4 /*yield*/, getUserPreferences(supabase, userId)];
        case 10:
          userPreferences = _f.sent();
          return [
            2 /*return*/,
            new Response(JSON.stringify({ preferences: userPreferences }), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 11:
          return [
            2 /*return*/,
            new Response(JSON.stringify({ preferences: preferences }), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 12:
          preferences = data.preferences;
          return [
            4 /*yield*/,
            supabase
              .from("user_preferences")
              .select("id")
              .eq("user_id", userId)
              .single(),
          ];
        case 13:
          (_e = _f.sent()), (existing = _e.data), (checkError = _e.error);
          if (checkError && checkError.code !== "PGRST116") {
            throw checkError;
          }
          error = void 0;
          if (!existing) return [3 /*break*/, 15];
          return [
            4 /*yield*/,
            supabase
              .from("user_preferences")
              .update(
                __assign(__assign({}, preferences), {
                  last_updated: new Date().toISOString(),
                }),
              )
              .eq("user_id", userId),
          ];
        case 14:
          result = _f.sent();
          error = result.error;
          return [3 /*break*/, 17];
        case 15:
          return [
            4 /*yield*/,
            supabase.from("user_preferences").insert(
              __assign(__assign({ user_id: userId }, preferences), {
                last_updated: new Date().toISOString(),
              }),
            ),
          ];
        case 16:
          result = _f.sent();
          error = result.error;
          _f.label = 17;
        case 17:
          if (error) throw error;
          return [
            2 /*return*/,
            new Response(JSON.stringify({ success: true }), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 18:
          throw new Error("Unknown action: ".concat(action));
        case 19:
          return [3 /*break*/, 21];
        case 20:
          error_1 = _f.sent();
          console.error("Error in learning function:", error_1);
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: error_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 21:
          return [2 /*return*/];
      }
    });
  });
});
// Helper function to update the learning model based on feedback
function updateLearningModel(supabase, botName, botRole, isPositive, topic) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, model, error, newModel, updatedModel, topics;
    var _b;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          return [
            4 /*yield*/,
            supabase
              .from("learning_models")
              .select("*")
              .eq("bot_name", botName)
              .eq("bot_role", botRole)
              .single(),
          ];
        case 1:
          (_a = _c.sent()), (model = _a.data), (error = _a.error);
          if (error && error.code !== "PGRST116") {
            // PGRST116 is "row not found" which is fine
            throw error;
          }
          if (!!model) return [3 /*break*/, 3];
          newModel = {
            bot_name: botName,
            bot_role: botRole,
            positive_feedback_count: isPositive ? 1 : 0,
            negative_feedback_count: isPositive ? 0 : 1,
            topics: topic
              ? ((_b = {}),
                (_b[topic] = {
                  positive: isPositive ? 1 : 0,
                  negative: isPositive ? 0 : 1,
                }),
                _b)
              : {},
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          return [
            4 /*yield*/,
            supabase.from("learning_models").insert(newModel),
          ];
        case 2:
          _c.sent();
          return [3 /*break*/, 5];
        case 3:
          updatedModel = {
            positive_feedback_count: isPositive
              ? model.positive_feedback_count + 1
              : model.positive_feedback_count,
            negative_feedback_count: isPositive
              ? model.negative_feedback_count
              : model.negative_feedback_count + 1,
            updated_at: new Date().toISOString(),
          };
          if (topic) {
            topics = model.topics || {};
            if (!topics[topic]) {
              topics[topic] = { positive: 0, negative: 0 };
            }
            if (isPositive) {
              topics[topic].positive += 1;
            } else {
              topics[topic].negative += 1;
            }
            updatedModel.topics = topics;
          }
          return [
            4 /*yield*/,
            supabase
              .from("learning_models")
              .update(updatedModel)
              .eq("bot_name", botName)
              .eq("bot_role", botRole),
          ];
        case 4:
          _c.sent();
          _c.label = 5;
        case 5:
          return [2 /*return*/];
      }
    });
  });
}
// Helper function to get user preferences from actions
function getUserPreferences(supabase, userId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a,
      actions,
      error,
      preferences,
      executiveCounts,
      topicCounts,
      riskLevels,
      maxRisk;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [
            4 /*yield*/,
            supabase.rpc("get_recent_user_actions", {
              p_user_id: userId,
              p_days: 90,
            }),
          ];
        case 1:
          (_a = _b.sent()), (actions = _a.data), (error = _a.error);
          if (error) throw error;
          preferences = {
            risk_appetite: "medium",
            preferred_executives: [],
            favorite_topics: [],
            communication_style: "balanced",
            activity_peak_times: [],
            dashboard_preferences: {},
            last_updated: new Date().toISOString(),
          };
          if (!actions || actions.length === 0) {
            return [2 /*return*/, preferences];
          }
          executiveCounts = {};
          topicCounts = {};
          riskLevels = { low: 0, medium: 0, high: 0 };
          actions.forEach(function (action) {
            var _a, _b, _c;
            // Track executive preferences
            if (
              (_a = action.metadata) === null || _a === void 0
                ? void 0
                : _a.executive_name
            ) {
              var name_1 = action.metadata.executive_name;
              executiveCounts[name_1] = (executiveCounts[name_1] || 0) + 1;
            }
            // Track topic preferences
            if (
              (_b = action.metadata) === null || _b === void 0
                ? void 0
                : _b.topic
            ) {
              var topic = action.metadata.topic;
              topicCounts[topic] = (topicCounts[topic] || 0) + 1;
            }
            // Track risk appetite
            if (
              (_c = action.metadata) === null || _c === void 0
                ? void 0
                : _c.risk_level
            ) {
              var risk = action.metadata.risk_level.toLowerCase();
              if (risk in riskLevels) {
                riskLevels[risk] += 1;
              }
            }
          });
          // Determine preferred executives
          preferences.preferred_executives = Object.entries(executiveCounts)
            .sort(function (a, b) {
              return b[1] - a[1];
            })
            .slice(0, 3)
            .map(function (_a) {
              var name = _a[0];
              return name;
            });
          // Determine favorite topics
          preferences.favorite_topics = Object.entries(topicCounts)
            .sort(function (a, b) {
              return b[1] - a[1];
            })
            .slice(0, 5)
            .map(function (_a) {
              var topic = _a[0];
              return topic;
            });
          maxRisk = Object.entries(riskLevels).reduce(
            function (max, _a) {
              var level = _a[0],
                count = _a[1];
              return count > max.count ? { level: level, count: count } : max;
            },
            { level: "medium", count: 0 },
          );
          preferences.risk_appetite = maxRisk.level;
          return [2 /*return*/, preferences];
      }
    });
  });
}
