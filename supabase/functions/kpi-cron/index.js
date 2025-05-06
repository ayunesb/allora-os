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
var supabase_js_2_1 = require("https://esm.sh/@supabase/supabase-js@2");
// Define CORS headers
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};
// Helper function to log errors to audit_logs
function logError(supabase, error) {
  return __awaiter(this, void 0, void 0, function () {
    var logError_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase.from("audit_logs").insert({
              action: "kpi_cron_job",
              result: "error",
              details: {
                error: error.message,
                stack: error.stack,
              },
            }),
          ];
        case 1:
          _a.sent();
          return [3 /*break*/, 3];
        case 2:
          logError_1 = _a.sent();
          console.error("Error logging to audit_logs:", logError_1);
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Helper function to send Slack alert
function sendSlackAlert(message) {
  return __awaiter(this, void 0, void 0, function () {
    var webhookUrl, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          webhookUrl = Deno.env.get("SLACK_WEBHOOK_URL");
          if (!webhookUrl) return [2 /*return*/];
          return [
            4 /*yield*/,
            fetch(webhookUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                text: "\uD83D\uDD14 KPI CRON Alert: ".concat(message),
              }),
            }),
          ];
        case 1:
          _a.sent();
          return [3 /*break*/, 3];
        case 2:
          error_1 = _a.sent();
          console.error("Error sending Slack alert:", error_1);
          return [3 /*break*/, 3];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
(0, server_ts_1.serve)(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var supabaseUrl,
      supabaseKey,
      supabase,
      _a,
      tenants,
      tenantError,
      results,
      _i,
      tenants_1,
      tenant,
      tenantMetrics,
      _b,
      _c,
      _d,
      type,
      value,
      error,
      error_2,
      error_3,
      supabaseUrl,
      supabaseKey,
      supabase,
      logError_2;
    var _e, _f, _g, _h;
    return __generator(this, function (_j) {
      switch (_j.label) {
        case 0:
          // Handle CORS preflight request
          if (req.method === "OPTIONS") {
            return [2 /*return*/, new Response(null, { headers: corsHeaders })];
          }
          _j.label = 1;
        case 1:
          _j.trys.push([1, 17, , 23]);
          supabaseUrl =
            (_e = Deno.env.get("SUPABASE_URL")) !== null && _e !== void 0
              ? _e
              : "";
          supabaseKey =
            (_f = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) !== null &&
            _f !== void 0
              ? _f
              : "";
          supabase = (0, supabase_js_2_1.createClient)(
            supabaseUrl,
            supabaseKey,
          );
          return [4 /*yield*/, supabase.from("tenants").select("id, name")];
        case 2:
          (_a = _j.sent()), (tenants = _a.data), (tenantError = _a.error);
          if (tenantError) throw tenantError;
          results = {
            success_count: 0,
            error_count: 0,
            tenants_processed: [],
            errors: [],
          };
          (_i = 0), (tenants_1 = tenants);
          _j.label = 3;
        case 3:
          if (!(_i < tenants_1.length)) return [3 /*break*/, 13];
          tenant = tenants_1[_i];
          _j.label = 4;
        case 4:
          _j.trys.push([4, 10, , 12]);
          return [4 /*yield*/, calculateTenantKPIs(supabase, tenant.id)];
        case 5:
          tenantMetrics = _j.sent();
          (_b = 0), (_c = Object.entries(tenantMetrics));
          _j.label = 6;
        case 6:
          if (!(_b < _c.length)) return [3 /*break*/, 9];
          (_d = _c[_b]), (type = _d[0]), (value = _d[1]);
          return [
            4 /*yield*/,
            supabase.from("kpi_metrics").insert({
              tenant_id: tenant.id,
              type: type,
              value: value,
              recorded_at: new Date().toISOString(),
            }),
          ];
        case 7:
          error = _j.sent().error;
          if (error) throw error;
          _j.label = 8;
        case 8:
          _b++;
          return [3 /*break*/, 6];
        case 9:
          results.success_count++;
          results.tenants_processed.push({
            tenant_id: tenant.id,
            tenant_name: tenant.name,
            metrics: Object.keys(tenantMetrics),
          });
          return [3 /*break*/, 12];
        case 10:
          error_2 = _j.sent();
          console.error(
            "Error processing tenant ".concat(tenant.id, ":"),
            error_2,
          );
          results.error_count++;
          results.errors.push({
            tenant_id: tenant.id,
            tenant_name: tenant.name,
            error: error_2.message,
          });
          return [4 /*yield*/, logError(supabase, error_2)];
        case 11:
          _j.sent();
          return [3 /*break*/, 12];
        case 12:
          _i++;
          return [3 /*break*/, 3];
        case 13:
          // Log completion to audit_logs
          return [
            4 /*yield*/,
            supabase.from("audit_logs").insert({
              action: "kpi_cron_job",
              result: results.error_count === 0 ? "success" : "partial",
              details: results,
            }),
          ];
        case 14:
          // Log completion to audit_logs
          _j.sent();
          if (!(results.error_count > 0)) return [3 /*break*/, 16];
          return [
            4 /*yield*/,
            sendSlackAlert(
              "KPI CRON completed with "
                .concat(results.error_count, " errors out of ")
                .concat(tenants.length, " tenants"),
            ),
          ];
        case 15:
          _j.sent();
          _j.label = 16;
        case 16:
          // Return success response
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                results: results,
              }),
              {
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 17:
          error_3 = _j.sent();
          console.error("Error in KPI CRON job:", error_3);
          _j.label = 18;
        case 18:
          _j.trys.push([18, 21, , 22]);
          supabaseUrl =
            (_g = Deno.env.get("SUPABASE_URL")) !== null && _g !== void 0
              ? _g
              : "";
          supabaseKey =
            (_h = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) !== null &&
            _h !== void 0
              ? _h
              : "";
          supabase = (0, supabase_js_2_1.createClient)(
            supabaseUrl,
            supabaseKey,
          );
          return [4 /*yield*/, logError(supabase, error_3)];
        case 19:
          _j.sent();
          return [
            4 /*yield*/,
            sendSlackAlert("KPI CRON job failed: ".concat(error_3.message)),
          ];
        case 20:
          _j.sent();
          return [3 /*break*/, 22];
        case 21:
          logError_2 = _j.sent();
          console.error("Error logging failure:", logError_2);
          return [3 /*break*/, 22];
        case 22:
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: false,
                error: error_3.message,
              }),
              {
                status: 500,
                headers: __assign(__assign({}, corsHeaders), {
                  "Content-Type": "application/json",
                }),
              },
            ),
          ];
        case 23:
          return [2 /*return*/];
      }
    });
  });
});
// Calculate KPIs for a tenant
function calculateTenantKPIs(supabase, tenantId) {
  return __awaiter(this, void 0, void 0, function () {
    var strategies,
      campaigns,
      pluginLogs,
      activeStrategies,
      totalROI,
      pluginROI;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            supabase
              .from("strategies")
              .select("id, status")
              .eq("tenant_id", tenantId),
          ];
        case 1:
          strategies = _a.sent().data;
          return [
            4 /*yield*/,
            supabase
              .from("campaigns")
              .select("id, status, roi")
              .eq("tenant_id", tenantId),
          ];
        case 2:
          campaigns = _a.sent().data;
          return [
            4 /*yield*/,
            supabase
              .from("plugin_logs")
              .select("value")
              .eq("tenant_id", tenantId)
              .eq("event", "execution"),
          ];
        case 3:
          pluginLogs = _a.sent().data;
          activeStrategies =
            (strategies === null || strategies === void 0
              ? void 0
              : strategies.filter(function (s) {
                  return s.status === "active";
                }).length) || 0;
          totalROI =
            (campaigns === null || campaigns === void 0
              ? void 0
              : campaigns.reduce(function (sum, campaign) {
                  return sum + (campaign.roi || 0);
                }, 0)) || 0;
          pluginROI =
            (pluginLogs === null || pluginLogs === void 0
              ? void 0
              : pluginLogs.reduce(function (sum, log) {
                  return sum + (log.value || 0);
                }, 0)) || 0;
          return [
            2 /*return*/,
            {
              active_strategies: activeStrategies,
              total_roi: totalROI,
              plugin_roi: pluginROI,
              campaign_count:
                (campaigns === null || campaigns === void 0
                  ? void 0
                  : campaigns.length) || 0,
              strategy_count:
                (strategies === null || strategies === void 0
                  ? void 0
                  : strategies.length) || 0,
            },
          ];
      }
    });
  });
}
