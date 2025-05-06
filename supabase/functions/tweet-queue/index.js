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
var supabase_js_2_38_0_1 = require("https://esm.sh/@supabase/supabase-js@2.38.0");
var cors_ts_1 = require("../_shared/cors.ts");
var supabaseUrl =
  Deno.env.get("SUPABASE_URL") || "https://tnfqzklfdwknmplrygag.supabase.co";
var supabaseKey =
  Deno.env.get("SUPABASE_ANON_KEY") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRuZnF6a2xmZHdrbm1wbHJ5Z2FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2OTUwNTksImV4cCI6MjA2MDI3MTA1OX0.8s7ol8jfz_6anK4l2aGBXaICDf3lLHmHSPovcXXGQ1A";
var supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
// Initialize the Supabase client
var supabase = (0, supabase_js_2_38_0_1.createClient)(supabaseUrl, supabaseKey);
var adminClient = (0, supabase_js_2_38_0_1.createClient)(
  supabaseUrl,
  supabaseServiceKey,
);
/**
 * Get all tweets in the queue with pagination and filtering
 */
function getTweetQueue(params) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [
            4 /*yield*/,
            supabase
              .from("tweet_queue")
              .select("*")
              .order("created_at", { ascending: false }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error fetching tweet queue:", error);
            return [2 /*return*/, { error: error.message }];
          }
          return [2 /*return*/, data];
      }
    });
  });
}
/**
 * Add a tweet to the queue
 */
function queueTweet(body) {
  return __awaiter(this, void 0, void 0, function () {
    var tenant_id, message, _a, data, error;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          (tenant_id = body.tenant_id), (message = body.message);
          if (!tenant_id || !message) {
            return [
              2 /*return*/,
              { error: "Missing required parameters: tenant_id and message" },
            ];
          }
          return [
            4 /*yield*/,
            supabase
              .from("tweet_queue")
              .insert({
                tenant_id: tenant_id,
                content: message,
                status: "pending",
              })
              .select()
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error adding tweet to queue:", error);
            return [2 /*return*/, { error: error.message }];
          }
          return [2 /*return*/, { success: true, tweet: data }];
      }
    });
  });
}
/**
 * Process a tweet from the queue
 */
function processTweet(params, body) {
  return __awaiter(this, void 0, void 0, function () {
    var id,
      action,
      _a,
      tweet,
      fetchError,
      twitterResponse,
      twitterResult,
      newStatus,
      error_1,
      error;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          id = params.get("id");
          action = params.get("action");
          if (!id) {
            return [2 /*return*/, { error: "Missing required parameter: id" }];
          }
          if (!(action === "approve")) return [3 /*break*/, 9];
          _b.label = 1;
        case 1:
          _b.trys.push([1, 6, , 8]);
          return [
            4 /*yield*/,
            supabase.from("tweet_queue").select("*").eq("id", id).single(),
          ];
        case 2:
          (_a = _b.sent()), (tweet = _a.data), (fetchError = _a.error);
          if (fetchError || !tweet) {
            console.error("Error fetching tweet:", fetchError);
            return [
              2 /*return*/,
              {
                error:
                  (fetchError === null || fetchError === void 0
                    ? void 0
                    : fetchError.message) || "Tweet not found",
              },
            ];
          }
          return [
            4 /*yield*/,
            fetch("".concat(supabaseUrl, "/functions/v1/twitter-post"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(supabaseKey),
              },
              body: JSON.stringify({
                tenant_id: tweet.tenant_id,
                message: tweet.content,
              }),
            }),
          ];
        case 3:
          twitterResponse = _b.sent();
          return [4 /*yield*/, twitterResponse.json()];
        case 4:
          twitterResult = _b.sent();
          newStatus = twitterResult.success ? "sent" : "failed";
          return [
            4 /*yield*/,
            supabase
              .from("tweet_queue")
              .update({
                status: newStatus,
                processed_at: new Date().toISOString(),
                result: twitterResult,
              })
              .eq("id", id),
          ];
        case 5:
          _b.sent();
          return [
            2 /*return*/,
            {
              success: twitterResult.success,
              tweet_id: twitterResult.tweet_id,
              status: newStatus,
            },
          ];
        case 6:
          error_1 = _b.sent();
          console.error("Error processing tweet:", error_1);
          // Update the tweet status to failed
          return [
            4 /*yield*/,
            supabase
              .from("tweet_queue")
              .update({
                status: "failed",
                processed_at: new Date().toISOString(),
                result: { error: error_1.message },
              })
              .eq("id", id),
          ];
        case 7:
          // Update the tweet status to failed
          _b.sent();
          return [2 /*return*/, { error: error_1.message || "Unknown error" }];
        case 8:
          return [3 /*break*/, 11];
        case 9:
          if (!(action === "reject")) return [3 /*break*/, 11];
          return [
            4 /*yield*/,
            supabase
              .from("tweet_queue")
              .update({
                status: "rejected",
                processed_at: new Date().toISOString(),
              })
              .eq("id", id),
          ];
        case 10:
          error = _b.sent().error;
          if (error) {
            console.error("Error rejecting tweet:", error);
            return [2 /*return*/, { error: error.message }];
          }
          return [2 /*return*/, { success: true, status: "rejected" }];
        case 11:
          return [2 /*return*/, { error: "Invalid action" }];
      }
    });
  });
}
Deno.serve(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var url, params, tweets, action, body, result, error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [
              2 /*return*/,
              new Response(null, { headers: cors_ts_1.corsHeaders }),
            ];
          }
          _a.label = 1;
        case 1:
          _a.trys.push([1, 10, , 11]);
          url = new URL(req.url);
          params = url.searchParams;
          if (!(req.method === "GET")) return [3 /*break*/, 3];
          return [4 /*yield*/, getTweetQueue(params)];
        case 2:
          tweets = _a.sent();
          return [
            2 /*return*/,
            new Response(JSON.stringify(tweets), {
              headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 3:
          if (!(req.method === "POST")) return [3 /*break*/, 9];
          action = params.get("action");
          return [4 /*yield*/, req.json()];
        case 4:
          body = _a.sent();
          result = void 0;
          if (!(action === "approve" || action === "reject"))
            return [3 /*break*/, 6];
          return [4 /*yield*/, processTweet(params, body)];
        case 5:
          // Process an existing tweet
          result = _a.sent();
          return [3 /*break*/, 8];
        case 6:
          return [4 /*yield*/, queueTweet(body)];
        case 7:
          // Add a new tweet to the queue
          result = _a.sent();
          _a.label = 8;
        case 8:
          return [
            2 /*return*/,
            new Response(JSON.stringify(result), {
              status: result.error ? 400 : 200,
              headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 9:
          // Handle other request types
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: "Method not allowed" }), {
              status: 405,
              headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 10:
          error_2 = _a.sent();
          console.error("Error in tweet-queue function:", error_2);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({ error: error_2.message || "Unknown error" }),
              {
                status: 500,
                headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 11:
          return [2 /*return*/];
      }
    });
  });
});
