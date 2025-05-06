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
var supabase = (0, supabase_js_2_38_0_1.createClient)(supabaseUrl, supabaseKey);
Deno.serve(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a,
      win_id,
      user_id,
      _b,
      upvote,
      _c,
      existingVote,
      fetchError,
      result,
      error_1;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          // Handle CORS preflight requests
          if (req.method === "OPTIONS") {
            return [
              2 /*return*/,
              new Response(null, { headers: cors_ts_1.corsHeaders }),
            ];
          }
          _d.label = 1;
        case 1:
          _d.trys.push([1, 10, , 11]);
          return [4 /*yield*/, req.json()];
        case 2:
          (_a = _d.sent()),
            (win_id = _a.win_id),
            (user_id = _a.user_id),
            (_b = _a.upvote),
            (upvote = _b === void 0 ? true : _b);
          if (!win_id || !user_id) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Missing required fields: win_id or user_id",
                }),
                {
                  headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                  status: 400,
                },
              ),
            ];
          }
          return [
            4 /*yield*/,
            supabase
              .from("agent_win_votes")
              .select("*")
              .eq("win_id", win_id)
              .eq("user_id", user_id)
              .maybeSingle(),
          ];
        case 3:
          (_c = _d.sent()), (existingVote = _c.data), (fetchError = _c.error);
          if (fetchError) {
            throw fetchError;
          }
          result = void 0;
          if (!existingVote) return [3 /*break*/, 7];
          if (!(existingVote.upvote !== upvote)) return [3 /*break*/, 5];
          return [
            4 /*yield*/,
            supabase
              .from("agent_win_votes")
              .update({ upvote: upvote })
              .eq("id", existingVote.id),
          ];
        case 4:
          result = _d.sent();
          return [3 /*break*/, 6];
        case 5:
          // Vote is the same, so we'll return early
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                message: "Vote already recorded",
              }),
              {
                headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                  "Content-Type": "application/json",
                }),
                status: 200,
              },
            ),
          ];
        case 6:
          return [3 /*break*/, 9];
        case 7:
          return [
            4 /*yield*/,
            supabase
              .from("agent_win_votes")
              .insert({ win_id: win_id, user_id: user_id, upvote: upvote }),
          ];
        case 8:
          // No existing vote, insert new one
          result = _d.sent();
          _d.label = 9;
        case 9:
          if (result.error) {
            throw result.error;
          }
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                message: "Vote recorded successfully",
              }),
              {
                headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                  "Content-Type": "application/json",
                }),
                status: 200,
              },
            ),
          ];
        case 10:
          error_1 = _d.sent();
          console.error("Error recording vote:", error_1);
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: error_1.message }), {
              headers: __assign(__assign({}, cors_ts_1.corsHeaders), {
                "Content-Type": "application/json",
              }),
              status: 500,
            }),
          ];
        case 11:
          return [2 /*return*/];
      }
    });
  });
});
