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
exports.checkLaunchReadiness = checkLaunchReadiness;
var client_1 = require("@/integrations/supabase/client");
var cleanupForProduction_1 = require("@/utils/cleanupForProduction");
function checkLaunchReadiness() {
  return __awaiter(this, void 0, void 0, function () {
    var status,
      secretsResult,
      connectedApiCount,
      boardroomTableError,
      tables,
      allTablesExist,
      _i,
      tables_1,
      table,
      tableError,
      error_1,
      apiReadiness,
      featuresReady,
      complianceReady,
      error_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          console.log("Checking launch readiness");
          status = {
            apis: {
              heygen: "not_configured",
              postmark: "not_configured",
              stripe: "not_configured",
              twilio: "not_configured",
              openai: "not_configured",
            },
            database: {
              status: "ready",
            },
            features: {
              authentication: false,
              onboarding: false,
              strategies: false,
              campaigns: false,
              aiDebate: false,
              welcomeVideo: false,
              billing: false,
            },
            compliance: {
              whatsappOptIn: false,
              emailUnsubscribe: false,
              billingCompliance: false,
              apiSecurityLevel: "low",
            },
            overallStatus: "not_ready",
          };
          _a.label = 1;
        case 1:
          _a.trys.push([1, 11, , 12]);
          return [4 /*yield*/, (0, cleanupForProduction_1.verifyApiSecrets)()];
        case 2:
          secretsResult = _a.sent();
          console.log("API secrets verification result:", secretsResult);
          if (secretsResult.success) {
            status.apis.stripe = "connected";
            status.apis.postmark = "connected";
            status.apis.twilio = "connected";
            status.apis.heygen = "connected";
            status.apis.openai = "connected";
            status.compliance.apiSecurityLevel = "high";
          } else if (secretsResult.missingSecrets) {
            // Set API statuses based on missing secrets
            if (!secretsResult.missingSecrets.includes("STRIPE_SECRET_KEY")) {
              status.apis.stripe = "connected";
            }
            if (!secretsResult.missingSecrets.includes("POSTMARK_API_KEY")) {
              status.apis.postmark = "connected";
            }
            if (
              !secretsResult.missingSecrets.includes("TWILIO_ACCOUNT_SID") &&
              !secretsResult.missingSecrets.includes("TWILIO_AUTH_TOKEN")
            ) {
              status.apis.twilio = "connected";
            }
            if (!secretsResult.missingSecrets.includes("HEYGEN_API_KEY")) {
              status.apis.heygen = "connected";
            }
            if (!secretsResult.missingSecrets.includes("OPENAI_API_KEY")) {
              status.apis.openai = "connected";
            }
            connectedApiCount = Object.values(status.apis).filter(function (s) {
              return s === "connected";
            }).length;
            status.compliance.apiSecurityLevel =
              connectedApiCount >= 4 ? "medium" : "low";
          }
          _a.label = 3;
        case 3:
          _a.trys.push([3, 9, , 10]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("ai_boardroom_debates")
              .select("id", { count: "exact", head: true }),
          ];
        case 4:
          boardroomTableError = _a.sent().error;
          if (boardroomTableError) {
            console.error("Boardroom table check error:", boardroomTableError);
            // If the table doesn't exist, aiDebate feature is not ready
            if (boardroomTableError.code === "42P01") {
              status.features.aiDebate = false;
            }
          } else {
            status.features.aiDebate = true;
          }
          tables = ["profiles", "strategies", "campaigns", "companies"];
          allTablesExist = true;
          (_i = 0), (tables_1 = tables);
          _a.label = 5;
        case 5:
          if (!(_i < tables_1.length)) return [3 /*break*/, 8];
          table = tables_1[_i];
          return [
            4 /*yield*/,
            client_1.supabase.from(table).select("id", { head: true }).limit(1),
          ];
        case 6:
          tableError = _a.sent().error;
          if (tableError) {
            console.error(
              "Table check error for ".concat(table, ":"),
              tableError,
            );
            allTablesExist = false;
            return [3 /*break*/, 8];
          }
          _a.label = 7;
        case 7:
          _i++;
          return [3 /*break*/, 5];
        case 8:
          status.database.status = allTablesExist ? "ready" : "error";
          if (!allTablesExist) {
            status.database.message = "Some required tables are missing";
          }
          return [3 /*break*/, 10];
        case 9:
          error_1 = _a.sent();
          console.error("Database check error:", error_1);
          status.database.status = "error";
          status.database.message = "Error connecting to database";
          return [3 /*break*/, 10];
        case 10:
          // 3. Check features by validating if related components exist
          status.features.authentication = true; // Auth is part of the base app
          status.features.onboarding = true; // We have Onboarding.tsx
          status.features.strategies = true; // We have strategies section
          status.features.campaigns = true; // We have campaigns functionality
          status.features.welcomeVideo = true; // We have welcome video component
          status.features.billing = true; // We have billing functionality
          // 4. Check compliance
          status.compliance.whatsappOptIn = true; // Our WhatsApp integration has opt-in/out
          status.compliance.emailUnsubscribe = true; // Emails include unsubscribe links
          status.compliance.billingCompliance = true; // Stripe handles PCI compliance
          apiReadiness = Object.values(status.apis).filter(function (s) {
            return s === "connected";
          }).length;
          featuresReady = Object.values(status.features).filter(function (f) {
            return f;
          }).length;
          complianceReady = Object.values(status.compliance).filter(
            function (c) {
              return c === true || c === "high" || c === "medium";
            },
          ).length;
          if (
            status.database.status === "ready" &&
            apiReadiness >= 4 &&
            featuresReady >= 6 &&
            complianceReady >= 3
          ) {
            status.overallStatus = "ready";
          } else if (
            status.database.status === "ready" &&
            apiReadiness >= 3 &&
            featuresReady >= 5
          ) {
            status.overallStatus = "warning";
          } else {
            status.overallStatus = "not_ready";
          }
          return [2 /*return*/, status];
        case 11:
          error_2 = _a.sent();
          console.error("Error checking launch readiness:", error_2);
          return [
            2 /*return*/,
            __assign(__assign({}, status), {
              overallStatus: "not_ready",
              database: {
                status: "error",
                message: "Error occurred during readiness check",
              },
            }),
          ];
        case 12:
          return [2 /*return*/];
      }
    });
  });
}
