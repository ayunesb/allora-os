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
var supabase_js_1 = require("@supabase/supabase-js");
var slack_ts_1 = require("./slack.ts");
// Get environment variables
var supabaseUrl = Deno.env.get("SUPABASE_URL");
var supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
var demoTenantId = Deno.env.get("DEMO_TENANT_ID");
// Only create Supabase client when needed
var getSupabaseClient = function () {
  return (0, supabase_js_1.createClient)(supabaseUrl, supabaseServiceKey);
};
Deno.serve(function (req) {
  return __awaiter(void 0, void 0, void 0, function () {
    var isCronRequest,
      supabase,
      tables,
      _i,
      tables_1,
      table,
      error,
      updateError,
      error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 13, , 15]);
          isCronRequest =
            req.headers.get("Authorization") ===
            "Bearer ".concat(Deno.env.get("CRON_SECRET"));
          if (!req.method === "POST" && !isCronRequest) {
            return [
              2 /*return*/,
              new Response("Method not allowed", { status: 405 }),
            ];
          }
          if (!!demoTenantId) return [3 /*break*/, 2];
          return [
            4 /*yield*/,
            (0, slack_ts_1.sendSlackAlert)(
              "No demo tenant ID set in environment variables",
              "warning",
            ),
          ];
        case 1:
          _a.sent();
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({ error: "No demo tenant ID configured" }),
              { status: 400, headers: { "Content-Type": "application/json" } },
            ),
          ];
        case 2:
          supabase = getSupabaseClient();
          // Begin reset process
          return [
            4 /*yield*/,
            (0, slack_ts_1.sendSlackAlert)(
              "Starting reset of demo tenant: ".concat(demoTenantId),
              "info",
            ),
          ];
        case 3:
          // Begin reset process
          _a.sent();
          tables = [
            "campaigns",
            "strategies",
            "leads",
            "plugin_logs",
            "kpi_metrics",
            "messages",
            "social_media_posts",
            "executive_messages",
            "webhook_events",
          ];
          (_i = 0), (tables_1 = tables);
          _a.label = 4;
        case 4:
          if (!(_i < tables_1.length)) return [3 /*break*/, 8];
          table = tables_1[_i];
          return [
            4 /*yield*/,
            supabase.from(table).delete().eq("tenant_id", demoTenantId),
          ];
        case 5:
          error = _a.sent().error;
          if (!error) return [3 /*break*/, 7];
          return [
            4 /*yield*/,
            (0, slack_ts_1.sendSlackAlert)(
              "Failed to reset table "
                .concat(table, ": ")
                .concat(error.message),
              "error",
            ),
          ];
        case 6:
          _a.sent();
          throw error;
        case 7:
          _i++;
          return [3 /*break*/, 4];
        case 8:
          return [
            4 /*yield*/,
            supabase
              .from("tenant_profiles")
              .update({
                settings: {
                  demo_reset_count:
                    Number(Deno.env.get("demo_reset_count") || 0) + 1,
                  last_reset: new Date().toISOString(),
                },
                updated_at: new Date().toISOString(),
              })
              .eq("id", demoTenantId),
          ];
        case 9:
          updateError = _a.sent().error;
          if (!updateError) return [3 /*break*/, 11];
          return [
            4 /*yield*/,
            (0, slack_ts_1.sendSlackAlert)(
              "Failed to update tenant profile: ".concat(updateError.message),
              "error",
            ),
          ];
        case 10:
          _a.sent();
          _a.label = 11;
        case 11:
          return [
            4 /*yield*/,
            (0, slack_ts_1.sendSlackAlert)(
              "Demo tenant ".concat(demoTenantId, " reset complete"),
              "info",
            ),
          ];
        case 12:
          _a.sent();
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({
                success: true,
                message: "Demo tenant reset complete",
              }),
              { status: 200, headers: { "Content-Type": "application/json" } },
            ),
          ];
        case 13:
          error_1 = _a.sent();
          return [
            4 /*yield*/,
            (0, slack_ts_1.sendSlackAlert)(
              "Demo tenant reset failed: ".concat(error_1.message),
              "error",
            ),
          ];
        case 14:
          _a.sent();
          return [
            2 /*return*/,
            new Response(
              JSON.stringify({ success: false, error: error_1.message }),
              { status: 500, headers: { "Content-Type": "application/json" } },
            ),
          ];
        case 15:
          return [2 /*return*/];
      }
    });
  });
});
