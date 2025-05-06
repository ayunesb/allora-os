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
var supabase_js_2_39_5_1 = require("https://esm.sh/@supabase/supabase-js@2.39.5");
var resend_2_0_0_1 = require("https://esm.sh/resend@2.0.0");
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
var supabase = (0, supabase_js_2_39_5_1.createClient)(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
);
var resend = new resend_2_0_0_1.Resend(Deno.env.get("RESEND_API_KEY"));
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a,
      tenants,
      tenantsError,
      _i,
      _b,
      tenant,
      _c,
      kpis,
      kpisError,
      html,
      _d,
      _e,
      email,
      emailResponse,
      emailError_1,
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
          return [
            4 /*yield*/,
            supabase.from("tenants").select("id, email_recipients"),
          ];
        case 2:
          (_a = _f.sent()), (tenants = _a.data), (tenantsError = _a.error);
          if (tenantsError) {
            throw tenantsError;
          }
          console.log(
            "Processing ".concat(
              (tenants === null || tenants === void 0
                ? void 0
                : tenants.length) || 0,
              " tenants",
            ),
          );
          (_i = 0), (_b = tenants || []);
          _f.label = 3;
        case 3:
          if (!(_i < _b.length)) return [3 /*break*/, 13];
          tenant = _b[_i];
          if (
            !tenant.email_recipients ||
            tenant.email_recipients.length === 0
          ) {
            console.log(
              "No email recipients for tenant ".concat(tenant.id, ", skipping"),
            );
            return [3 /*break*/, 12];
          }
          return [
            4 /*yield*/,
            supabase
              .from("kpi_metrics")
              .select("*")
              .eq("tenant_id", tenant.id)
              .order("created_at", { ascending: false })
              .limit(5),
          ];
        case 4:
          (_c = _f.sent()), (kpis = _c.data), (kpisError = _c.error);
          if (kpisError) {
            console.error(
              "Error fetching KPIs for tenant ".concat(tenant.id, ":"),
              kpisError,
            );
            return [3 /*break*/, 12];
          }
          if (!kpis || kpis.length === 0) {
            console.log(
              "No KPIs found for tenant ".concat(tenant.id, ", skipping"),
            );
            return [3 /*break*/, 12];
          }
          html =
            "\n        <h2>Your Weekly KPI Summary</h2>\n        <p>Here are your latest KPI metrics:</p>\n        <ul>\n          ".concat(
              kpis
                .map(function (kpi) {
                  return "<li><strong>"
                    .concat(kpi.metric, ":</strong> ")
                    .concat(kpi.value, "</li>");
                })
                .join(""),
              "\n        </ul>\n        <p>Access your dashboard for more detailed insights.</p>\n      ",
            );
          (_d = 0), (_e = tenant.email_recipients);
          _f.label = 5;
        case 5:
          if (!(_d < _e.length)) return [3 /*break*/, 12];
          email = _e[_d];
          console.log("Sending email to ".concat(email));
          _f.label = 6;
        case 6:
          _f.trys.push([6, 9, , 11]);
          return [
            4 /*yield*/,
            resend.emails.send({
              from: "digest@allora-ai.com",
              to: email,
              subject: "Your Weekly KPI Summary",
              html: html,
            }),
          ];
        case 7:
          emailResponse = _f.sent();
          console.log("Email sent to ".concat(email, ":"), emailResponse);
          // Log the email
          return [
            4 /*yield*/,
            supabase.from("email_logs").insert({
              tenant_id: tenant.id,
              status: "sent",
              recipient: email,
              subject: "Your Weekly KPI Summary",
            }),
          ];
        case 8:
          // Log the email
          _f.sent();
          return [3 /*break*/, 11];
        case 9:
          emailError_1 = _f.sent();
          console.error(
            "Failed to send email to ".concat(email, ":"),
            emailError_1,
          );
          // Log the email error
          return [
            4 /*yield*/,
            supabase.from("email_logs").insert({
              tenant_id: tenant.id,
              status: "error",
              recipient: email,
              subject: "Your Weekly KPI Summary",
              error: String(emailError_1),
            }),
          ];
        case 10:
          // Log the email error
          _f.sent();
          return [3 /*break*/, 11];
        case 11:
          _d++;
          return [3 /*break*/, 5];
        case 12:
          _i++;
          return [3 /*break*/, 3];
        case 13:
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                message: "Weekly digest emails sent",
              }),
              {
                status: 200,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 14:
          error_1 = _f.sent();
          console.error("Error in send-weekly-digest function:", error_1);
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: false,
                error: String(error_1),
              }),
              {
                status: 500,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 15:
          return [2 /*return*/];
      }
    });
  });
});
