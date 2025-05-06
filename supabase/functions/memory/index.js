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
      botName,
      botRole,
      userMessage,
      botResponse,
      feedback,
      metadata,
      error,
      query,
      botName,
      botRole,
      _c,
      limit,
      _d,
      memories,
      error,
      interactionId,
      feedback,
      error,
      _e,
      insights,
      error,
      positiveInteractions,
      negativeInteractions,
      positiveTopic,
      negativeTopic,
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
          _f.trys.push([1, 14, , 15]);
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
            case "store_interaction":
              return [3 /*break*/, 3];
            case "get_relevant_memory":
              return [3 /*break*/, 5];
            case "update_feedback":
              return [3 /*break*/, 7];
            case "get_learning_insights":
              return [3 /*break*/, 10];
          }
          return [3 /*break*/, 12];
        case 3:
          (botName = data.botName),
            (botRole = data.botRole),
            (userMessage = data.userMessage),
            (botResponse = data.botResponse),
            (feedback = data.feedback),
            (metadata = data.metadata);
          return [
            4 /*yield*/,
            supabase.from("bot_interactions").insert({
              user_id: userId,
              bot_name: botName,
              bot_role: botRole,
              user_message: userMessage,
              bot_response: botResponse,
              user_feedback: feedback || null,
              metadata: metadata || {},
              embedding: null, // This would be populated by a vector embedding in a real implementation
            }),
          ];
        case 4:
          error = _f.sent().error;
          if (error) throw error;
          return [
            2 /*return*/,
            new Response(JSON.stringify({ success: true }), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 5:
          (query = data.query),
            (botName = data.botName),
            (botRole = data.botRole),
            (_c = data.limit),
            (limit = _c === void 0 ? 5 : _c);
          return [
            4 /*yield*/,
            supabase
              .from("bot_interactions")
              .select("*")
              .eq("user_id", userId)
              .eq("bot_name", botName)
              .eq("bot_role", botRole)
              .order("created_at", { ascending: false })
              .limit(limit),
          ];
        case 6:
          (_d = _f.sent()), (memories = _d.data), (error = _d.error);
          if (error) throw error;
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                memories: memories || [],
                relevance_score: 0.85, // Placeholder for a real relevance score
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 7:
          (interactionId = data.interactionId), (feedback = data.feedback);
          return [
            4 /*yield*/,
            supabase
              .from("bot_interactions")
              .update({ user_feedback: feedback })
              .eq("id", interactionId),
          ];
        case 8:
          error = _f.sent().error;
          if (error) throw error;
          // Also store this in the user_actions table for learning
          return [
            4 /*yield*/,
            supabase.rpc("insert_user_action", {
              p_user_id: userId,
              p_action: "feedback",
              p_category: "bot_interaction",
              p_entity_id: interactionId,
              p_entity_type: "interaction",
              p_metadata: { feedback: feedback },
              p_timestamp: new Date().toISOString(),
            }),
          ];
        case 9:
          // Also store this in the user_actions table for learning
          _f.sent();
          return [
            2 /*return*/,
            new Response(JSON.stringify({ success: true }), {
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 10:
          return [
            4 /*yield*/,
            supabase
              .from("bot_interactions")
              .select(
                "bot_name, bot_role, user_message, user_feedback, metadata",
              )
              .eq("user_id", userId)
              .not("user_feedback", "is", null)
              .order("created_at", { ascending: false })
              .limit(100),
          ];
        case 11:
          (_e = _f.sent()), (insights = _e.data), (error = _e.error);
          if (error) throw error;
          positiveInteractions =
            (insights === null || insights === void 0
              ? void 0
              : insights.filter(function (i) {
                  return i.user_feedback === "positive";
                })) || [];
          negativeInteractions =
            (insights === null || insights === void 0
              ? void 0
              : insights.filter(function (i) {
                  return i.user_feedback === "negative";
                })) || [];
          positiveTopic =
            positiveInteractions.length > 0
              ? extractTopic(positiveInteractions[0].user_message)
              : "";
          negativeTopic =
            negativeInteractions.length > 0
              ? extractTopic(negativeInteractions[0].user_message)
              : "";
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                insightsSummary: {
                  positiveInteractions: positiveInteractions.length,
                  negativeInteractions: negativeInteractions.length,
                  positiveTopic: positiveTopic,
                  negativeTopic: negativeTopic,
                  // In a real implementation, this would contain more detailed analysis
                },
                rawInsights: insights,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 12:
          throw new Error("Unknown action: ".concat(action));
        case 13:
          return [3 /*break*/, 15];
        case 14:
          error_1 = _f.sent();
          console.error("Error in memory function:", error_1);
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: error_1.message }), {
              status: 500,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 15:
          return [2 /*return*/];
      }
    });
  });
});
// Helper function to extract topic from a message (simplified)
function extractTopic(message) {
  // In a real implementation, this would use NLP to extract the main topic
  // For now, just return the first 3 words
  return message.split(" ").slice(0, 3).join(" ") + "...";
}
