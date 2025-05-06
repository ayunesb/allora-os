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
var HEYGEN_API_KEY = Deno.env.get("HEYGEN_API_KEY") || "";
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var authHeader,
      supabase,
      _a,
      user,
      authError,
      _b,
      action,
      text,
      avatarId,
      voiceId,
      campaignId,
      strategyId,
      companyName,
      heygenResponse,
      heygenResult,
      _c,
      videoData,
      videoError,
      heygenResponse,
      heygenResult,
      updateError,
      heygenResponse,
      heygenResult,
      heygenResponse,
      heygenResult,
      err_1;
    return __generator(this, function (_d) {
      switch (_d.label) {
        case 0:
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          authHeader = req.headers.get("Authorization");
          if (!authHeader) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "No authorization header" }),
                {
                  status: 401,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
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
                  Authorization: authHeader,
                },
              },
            },
          );
          _d.label = 1;
        case 1:
          _d.trys.push([1, 20, , 21]);
          return [4 /*yield*/, supabase.auth.getUser()];
        case 2:
          (_a = _d.sent()), (user = _a.data.user), (authError = _a.error);
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
          (_b = _d.sent()),
            (action = _b.action),
            (text = _b.text),
            (avatarId = _b.avatarId),
            (voiceId = _b.voiceId),
            (campaignId = _b.campaignId),
            (strategyId = _b.strategyId),
            (companyName = _b.companyName);
          if (!(action === "generate-video")) return [3 /*break*/, 7];
          if (!text || !avatarId || !voiceId) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Missing required fields" }),
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
            fetch("https://api.heygen.com/v1/video/generate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Api-Key": HEYGEN_API_KEY,
              },
              body: JSON.stringify({
                avatar: {
                  avatar_id: avatarId,
                },
                voice: {
                  voice_id: voiceId,
                },
                background: {
                  type: "color",
                  value: "#ffffff",
                },
                caption: false,
                text: text,
              }),
            }),
          ];
        case 4:
          heygenResponse = _d.sent();
          return [4 /*yield*/, heygenResponse.json()];
        case 5:
          heygenResult = _d.sent();
          if (!heygenResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to generate video",
                  details: heygenResult,
                }),
                {
                  status: 500,
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
              .from("generated_videos")
              .insert([
                {
                  user_id: user.id,
                  video_id: heygenResult.data.video_id,
                  campaign_id: campaignId || null,
                  strategy_id: strategyId || null,
                  text_content: text,
                  status: "processing",
                  avatar_id: avatarId,
                  voice_id: voiceId,
                  company_name: companyName || null,
                },
              ])
              .select()
              .single(),
          ];
        case 6:
          (_c = _d.sent()), (videoData = _c.data), (videoError = _c.error);
          if (videoError) {
            console.error("Error storing video information:", videoError);
          }
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                videoId: heygenResult.data.video_id,
                status: "processing",
                dbRecordId:
                  (videoData === null || videoData === void 0
                    ? void 0
                    : videoData.id) || null,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 7:
          if (!(action === "get-video-status")) return [3 /*break*/, 12];
          if (!text) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Missing video ID" }), {
                status: 400,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          return [
            4 /*yield*/,
            fetch(
              "https://api.heygen.com/v1/video/status?video_id=".concat(text),
              {
                method: "GET",
                headers: {
                  "X-Api-Key": HEYGEN_API_KEY,
                },
              },
            ),
          ];
        case 8:
          heygenResponse = _d.sent();
          return [4 /*yield*/, heygenResponse.json()];
        case 9:
          heygenResult = _d.sent();
          if (!heygenResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to get video status",
                  details: heygenResult,
                }),
                {
                  status: 500,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          if (!(heygenResult.data.status === "completed"))
            return [3 /*break*/, 11];
          return [
            4 /*yield*/,
            supabase
              .from("generated_videos")
              .update({
                status: "completed",
                video_url: heygenResult.data.video_url,
              })
              .eq("video_id", text),
          ];
        case 10:
          updateError = _d.sent().error;
          if (updateError) {
            console.error("Error updating video status:", updateError);
          }
          _d.label = 11;
        case 11:
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                status: heygenResult.data.status,
                videoUrl: heygenResult.data.video_url || null,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 12:
          if (!(action === "list-avatars")) return [3 /*break*/, 15];
          return [
            4 /*yield*/,
            fetch("https://api.heygen.com/v1/avatar", {
              method: "GET",
              headers: {
                "X-Api-Key": HEYGEN_API_KEY,
              },
            }),
          ];
        case 13:
          heygenResponse = _d.sent();
          return [4 /*yield*/, heygenResponse.json()];
        case 14:
          heygenResult = _d.sent();
          if (!heygenResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to list avatars",
                  details: heygenResult,
                }),
                {
                  status: 500,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                avatars: heygenResult.data,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 15:
          if (!(action === "list-voices")) return [3 /*break*/, 18];
          return [
            4 /*yield*/,
            fetch("https://api.heygen.com/v1/voice", {
              method: "GET",
              headers: {
                "X-Api-Key": HEYGEN_API_KEY,
              },
            }),
          ];
        case 16:
          heygenResponse = _d.sent();
          return [4 /*yield*/, heygenResponse.json()];
        case 17:
          heygenResult = _d.sent();
          if (!heygenResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to list voices",
                  details: heygenResult,
                }),
                {
                  status: 500,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                voices: heygenResult.data,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 18:
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: "Invalid action" }), {
              status: 400,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 19:
          return [3 /*break*/, 21];
        case 20:
          err_1 = _d.sent();
          console.error("Heygen API error: ".concat(err_1.message));
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: err_1.message }), {
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
