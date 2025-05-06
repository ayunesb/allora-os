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
var SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
var SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
var ZOOM_API_KEY = Deno.env.get("ZOOM_API_KEY") || "";
var ZOOM_API_SECRET = Deno.env.get("ZOOM_API_SECRET") || "";
var OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") || "";
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
      leadId,
      meetingData,
      communicationData,
      tokenResponse,
      tokenData,
      meetingResponse,
      meeting,
      _c,
      communication,
      commError,
      _d,
      communication,
      commError,
      leadError,
      _e,
      communicationId,
      transcriptText,
      openaiResponse,
      openaiData,
      summary,
      _f,
      updatedComm,
      updateError,
      err_1;
    return __generator(this, function (_g) {
      switch (_g.label) {
        case 0:
          // Handle CORS
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
          _g.label = 1;
        case 1:
          _g.trys.push([1, 20, , 21]);
          return [4 /*yield*/, supabase.auth.getUser()];
        case 2:
          (_a = _g.sent()), (user = _a.data.user), (authError = _a.error);
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
          (_b = _g.sent()),
            (action = _b.action),
            (leadId = _b.leadId),
            (meetingData = _b.meetingData),
            (communicationData = _b.communicationData);
          if (!(action === "create-zoom-meeting")) return [3 /*break*/, 9];
          if (!ZOOM_API_KEY || !ZOOM_API_SECRET) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Zoom API credentials not configured",
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
            fetch("https://zoom.us/oauth/token", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Basic ".concat(
                  btoa("".concat(ZOOM_API_KEY, ":").concat(ZOOM_API_SECRET)),
                ),
              },
              body: new URLSearchParams({
                grant_type: "client_credentials",
                scope: "meeting:write",
              }),
            }),
          ];
        case 4:
          tokenResponse = _g.sent();
          return [4 /*yield*/, tokenResponse.json()];
        case 5:
          tokenData = _g.sent();
          if (!tokenResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to get Zoom token",
                  details: tokenData,
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
            fetch("https://api.zoom.us/v2/users/me/meetings", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(tokenData.access_token),
              },
              body: JSON.stringify({
                topic: meetingData.topic,
                type: 2, // Scheduled meeting
                start_time: meetingData.startTime,
                duration: meetingData.duration,
                timezone: meetingData.timezone || "UTC",
                agenda: meetingData.agenda,
                settings: {
                  host_video: true,
                  participant_video: true,
                  join_before_host: true,
                  mute_upon_entry: false,
                  auto_recording: "cloud",
                  waiting_room: false,
                },
              }),
            }),
          ];
        case 6:
          meetingResponse = _g.sent();
          return [4 /*yield*/, meetingResponse.json()];
        case 7:
          meeting = _g.sent();
          if (!meetingResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to create Zoom meeting",
                  details: meeting,
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
              .from("communications")
              .insert([
                {
                  lead_id: leadId,
                  type: "zoom",
                  status: "scheduled",
                  scheduled_at: meetingData.startTime,
                  meeting_link: meeting.join_url,
                  notes: meetingData.agenda,
                  created_by: user.id,
                  metadata: {
                    meeting_id: meeting.id,
                    host_url: meeting.start_url,
                    duration: meetingData.duration,
                    password: meeting.password,
                  },
                },
              ])
              .select("*")
              .single(),
          ];
        case 8:
          (_c = _g.sent()), (communication = _c.data), (commError = _c.error);
          if (commError) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to save communication",
                  details: commError,
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
                meeting: meeting,
                communication: communication,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 9:
          if (!(action === "log-communication")) return [3 /*break*/, 13];
          return [
            4 /*yield*/,
            supabase
              .from("communications")
              .insert([
                {
                  lead_id: leadId,
                  type: communicationData.type,
                  status: communicationData.status,
                  scheduled_at: communicationData.scheduledAt,
                  ended_at: communicationData.endedAt,
                  notes: communicationData.notes,
                  outcome: communicationData.outcome,
                  created_by: user.id,
                  metadata: communicationData.metadata || {},
                },
              ])
              .select("*")
              .single(),
          ];
        case 10:
          (_d = _g.sent()), (communication = _d.data), (commError = _d.error);
          if (commError) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to save communication",
                  details: commError,
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
          if (!communicationData.updateLeadStatus) return [3 /*break*/, 12];
          return [
            4 /*yield*/,
            supabase
              .from("leads")
              .update({ status: communicationData.leadStatus })
              .eq("id", leadId),
          ];
        case 11:
          leadError = _g.sent().error;
          if (leadError) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  warning:
                    "Communication logged but failed to update lead status",
                  communication: communication,
                  error: leadError,
                }),
                {
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          _g.label = 12;
        case 12:
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                communication: communication,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 13:
          if (!(action === "generate-summary")) return [3 /*break*/, 18];
          if (!OPENAI_API_KEY) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "OpenAI API key not configured" }),
                {
                  status: 500,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          return [4 /*yield*/, req.json()];
        case 14:
          (_e = _g.sent()),
            (communicationId = _e.communicationId),
            (transcriptText = _e.transcriptText);
          return [
            4 /*yield*/,
            fetch("https://api.openai.com/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(OPENAI_API_KEY),
              },
              body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                  {
                    role: "system",
                    content:
                      "You are an assistant that generates concise summaries of sales calls. Focus on key points, action items, and next steps. Keep it professional and business-oriented.",
                  },
                  {
                    role: "user",
                    content:
                      "Please summarize this sales call transcript: ".concat(
                        transcriptText,
                      ),
                  },
                ],
                max_tokens: 500,
                temperature: 0.7,
              }),
            }),
          ];
        case 15:
          openaiResponse = _g.sent();
          return [4 /*yield*/, openaiResponse.json()];
        case 16:
          openaiData = _g.sent();
          if (!openaiResponse.ok) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Failed to generate summary",
                  details: openaiData,
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
          summary = openaiData.choices[0].message.content;
          return [
            4 /*yield*/,
            supabase
              .from("communications")
              .update({ ai_summary: summary })
              .eq("id", communicationId)
              .select("*")
              .single(),
          ];
        case 17:
          (_f = _g.sent()), (updatedComm = _f.data), (updateError = _f.error);
          if (updateError) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  warning: "Summary generated but failed to save to database",
                  summary: summary,
                  error: updateError,
                }),
                {
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
                summary: summary,
                communication: updatedComm,
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
          err_1 = _g.sent();
          console.error(
            "Communications function error: ".concat(err_1.message),
          );
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
