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
var secretManager_ts_1 = require("../_shared/secretManager.ts");
var SUPABASE_URL = "https://ofwxyctfzskeeniaaazw.supabase.co";
var SUPABASE_ANON_KEY = (0, secretManager_ts_1.getSecret)(
  "SUPABASE_ANON_KEY",
  true,
);
var POSTMARK_API_TOKEN = (0, secretManager_ts_1.getSecret)(
  "POSTMARK_API_TOKEN",
  true,
);
var POSTMARK_FROM_EMAIL =
  (0, secretManager_ts_1.getSecret)("POSTMARK_FROM_EMAIL", true) ||
  "no-reply@alloraai.com";
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a,
      valid,
      missingKeys,
      authHeader,
      supabase,
      _b,
      user,
      authError,
      _c,
      action,
      to,
      subject,
      htmlBody,
      textBody,
      templateId,
      templateModel,
      leadId,
      messageType_1,
      campaignId,
      emailData,
      templateData,
      postmarkResponse,
      postmarkResult,
      updateError,
      postmarkResponse,
      postmarkResult,
      updateError,
      _d,
      campaign,
      campaignError,
      _e,
      leads,
      leadsError,
      targetLeads,
      results,
      _i,
      targetLeads_1,
      lead,
      postmarkResponse,
      postmarkResult,
      templateData,
      emailData,
      err_1,
      err_2;
    return __generator(this, function (_f) {
      switch (_f.label) {
        case 0:
          (_a = (0, secretManager_ts_1.validateRequiredSecrets)([
            "SUPABASE_ANON_KEY",
            "POSTMARK_API_TOKEN",
          ])),
            (valid = _a.valid),
            (missingKeys = _a.missingKeys);
          if (!valid) {
            console.error("Missing required secrets:", missingKeys);
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({
                  error: "Configuration error",
                  message:
                    "Missing required secrets. Please contact the administrator.",
                  dev_info: missingKeys, // Only include in development
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
          _f.label = 1;
        case 1:
          _f.trys.push([1, 30, , 31]);
          return [4 /*yield*/, supabase.auth.getUser()];
        case 2:
          (_b = _f.sent()), (user = _b.data.user), (authError = _b.error);
          if (authError || !user) {
            return [
              2 /*return*/,
              new Response(
                JSON.stringify({ error: "Unauthorized", details: authError }),
                {
                  status: 401,
                  headers: __assign(__assign({}, corsHeaders), {
                    "Content-Type": "application/json",
                  }),
                },
              ),
            ];
          }
          // Log debug info
          console.log("POSTMARK API token exists:", !!POSTMARK_API_TOKEN);
          console.log("POSTMARK from email:", POSTMARK_FROM_EMAIL);
          return [4 /*yield*/, req.json()];
        case 3:
          (_c = _f.sent()),
            (action = _c.action),
            (to = _c.to),
            (subject = _c.subject),
            (htmlBody = _c.htmlBody),
            (textBody = _c.textBody),
            (templateId = _c.templateId),
            (templateModel = _c.templateModel),
            (leadId = _c.leadId),
            (messageType_1 = _c.messageType),
            (campaignId = _c.campaignId);
          if (!(action === "send-email")) return [3 /*break*/, 14];
          // Validate request
          if (!to || !subject || (!htmlBody && !textBody && !templateId)) {
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
          // Log information for debugging
          console.log(
            "Sending email to: ".concat(to, ", subject: ").concat(subject),
          );
          emailData = {
            From: POSTMARK_FROM_EMAIL,
            To: to,
            Subject: subject,
            HtmlBody: htmlBody,
            TextBody: textBody,
            MessageStream: "outbound",
          };
          if (!templateId) return [3 /*break*/, 8];
          templateData = {
            TemplateId: templateId,
            TemplateModel: templateModel || {},
            From: POSTMARK_FROM_EMAIL,
            To: to,
            MessageStream: "outbound",
          };
          console.log("Using template:", templateId);
          return [
            4 /*yield*/,
            fetch("https://api.postmarkapp.com/email/withTemplate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Postmark-Server-Token": POSTMARK_API_TOKEN,
              },
              body: JSON.stringify(templateData),
            }),
          ];
        case 4:
          postmarkResponse = _f.sent();
          console.log(
            "Postmark template API response status:",
            postmarkResponse.status,
          );
          return [4 /*yield*/, postmarkResponse.json()];
        case 5:
          postmarkResult = _f.sent();
          console.log("Postmark template API response:", postmarkResult);
          if (!leadId) return [3 /*break*/, 7];
          return [
            4 /*yield*/,
            supabase.from("lead_communications").insert([
              {
                lead_id: leadId,
                type: "email",
                content: "Template: ".concat(templateId),
                sent_at: new Date().toISOString(),
                sent_by: user.id,
              },
            ]),
          ];
        case 6:
          updateError = _f.sent().error;
          if (updateError) {
            console.error("Error logging email communication:", updateError);
          }
          _f.label = 7;
        case 7:
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: postmarkResponse.ok,
                messageId: postmarkResult.MessageID,
                message: postmarkResponse.ok
                  ? "Email sent successfully"
                  : "Failed to send email",
                details: postmarkResult,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 8:
          console.log("Using direct email API");
          return [
            4 /*yield*/,
            fetch("https://api.postmarkapp.com/email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Postmark-Server-Token": POSTMARK_API_TOKEN,
              },
              body: JSON.stringify(emailData),
            }),
          ];
        case 9:
          postmarkResponse = _f.sent();
          console.log("Postmark API response status:", postmarkResponse.status);
          return [4 /*yield*/, postmarkResponse.json()];
        case 10:
          postmarkResult = _f.sent();
          console.log("Postmark API response:", postmarkResult);
          if (!leadId) return [3 /*break*/, 12];
          return [
            4 /*yield*/,
            supabase.from("lead_communications").insert([
              {
                lead_id: leadId,
                type: "email",
                content: htmlBody || textBody,
                sent_at: new Date().toISOString(),
                sent_by: user.id,
              },
            ]),
          ];
        case 11:
          updateError = _f.sent().error;
          if (updateError) {
            console.error("Error logging email communication:", updateError);
          }
          _f.label = 12;
        case 12:
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: postmarkResponse.ok,
                messageId: postmarkResult.MessageID,
                message: postmarkResponse.ok
                  ? "Email sent successfully"
                  : "Failed to send email",
                details: postmarkResult,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 13:
          return [3 /*break*/, 29];
        case 14:
          if (!(action === "send-campaign")) return [3 /*break*/, 28];
          // Validate request
          if (!campaignId || (!subject && !templateId)) {
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
            supabase
              .from("campaigns")
              .select("*")
              .eq("id", campaignId)
              .single(),
          ];
        case 15:
          (_d = _f.sent()), (campaign = _d.data), (campaignError = _d.error);
          if (campaignError) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Campaign not found" }), {
                status: 404,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          return [
            4 /*yield*/,
            supabase
              .from("leads")
              .select("id, email, name")
              .eq("campaign_id", campaignId)
              .neq("email", null),
          ];
        case 16:
          (_e = _f.sent()), (leads = _e.data), (leadsError = _e.error);
          if (leadsError) {
            return [
              2 /*return*/,
              new Response(JSON.stringify({ error: "Failed to fetch leads" }), {
                status: 500,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              }),
            ];
          }
          targetLeads = leads;
          if (messageType_1 && messageType_1 !== "all") {
            targetLeads = leads.filter(function (lead) {
              return lead.status === messageType_1;
            });
          }
          results = [];
          (_i = 0), (targetLeads_1 = targetLeads);
          _f.label = 17;
        case 17:
          if (!(_i < targetLeads_1.length)) return [3 /*break*/, 27];
          lead = targetLeads_1[_i];
          // Skip if no email
          if (!lead.email) return [3 /*break*/, 26];
          _f.label = 18;
        case 18:
          _f.trys.push([18, 25, , 26]);
          postmarkResponse = void 0;
          postmarkResult = void 0;
          if (!templateId) return [3 /*break*/, 20];
          templateData = {
            TemplateId: templateId,
            TemplateModel: __assign(__assign({}, templateModel), {
              name: lead.name,
              lead_id: lead.id,
              campaign_name: campaign.name,
            }),
            From: POSTMARK_FROM_EMAIL,
            To: lead.email,
            MessageStream: "outbound",
          };
          return [
            4 /*yield*/,
            fetch("https://api.postmarkapp.com/email/withTemplate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Postmark-Server-Token": POSTMARK_API_TOKEN,
              },
              body: JSON.stringify(templateData),
            }),
          ];
        case 19:
          postmarkResponse = _f.sent();
          return [3 /*break*/, 22];
        case 20:
          emailData = {
            From: POSTMARK_FROM_EMAIL,
            To: lead.email,
            Subject: subject,
            HtmlBody:
              (htmlBody === null || htmlBody === void 0
                ? void 0
                : htmlBody.replace("{{name}}", lead.name)) || undefined,
            TextBody:
              (textBody === null || textBody === void 0
                ? void 0
                : textBody.replace("{{name}}", lead.name)) || undefined,
            MessageStream: "outbound",
          };
          return [
            4 /*yield*/,
            fetch("https://api.postmarkapp.com/email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Postmark-Server-Token": POSTMARK_API_TOKEN,
              },
              body: JSON.stringify(emailData),
            }),
          ];
        case 21:
          postmarkResponse = _f.sent();
          _f.label = 22;
        case 22:
          return [4 /*yield*/, postmarkResponse.json()];
        case 23:
          postmarkResult = _f.sent();
          // Log the communication
          return [
            4 /*yield*/,
            supabase.from("lead_communications").insert([
              {
                lead_id: lead.id,
                type: "email",
                content: templateId
                  ? "Template: ".concat(templateId)
                  : htmlBody || textBody,
                sent_at: new Date().toISOString(),
                sent_by: user.id,
              },
            ]),
          ];
        case 24:
          // Log the communication
          _f.sent();
          results.push({
            leadId: lead.id,
            success: postmarkResponse.ok,
            messageId: postmarkResult.MessageID,
          });
          return [3 /*break*/, 26];
        case 25:
          err_1 = _f.sent();
          console.error("Error sending email to ".concat(lead.id, ":"), err_1);
          results.push({
            leadId: lead.id,
            success: false,
            error: err_1.message,
          });
          return [3 /*break*/, 26];
        case 26:
          _i++;
          return [3 /*break*/, 17];
        case 27:
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                totalSent: results.filter(function (r) {
                  return r.success;
                }).length,
                totalFailed: results.filter(function (r) {
                  return !r.success;
                }).length,
                results: results,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 28:
          return [
            2 /*return*/,
            new Response(JSON.stringify({ error: "Invalid action" }), {
              status: 400,
              headers: __assign(__assign({}, corsHeaders), {
                "Content-Type": "application/json",
              }),
            }),
          ];
        case 29:
          return [3 /*break*/, 31];
        case 30:
          err_2 = _f.sent();
          console.error("Postmark API error: ".concat(err_2.message));
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                error: err_2.message,
                stack: isDevelopment ? err_2.stack : undefined,
              }),
              {
                status: 500,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 31:
          return [2 /*return*/];
      }
    });
  });
});
