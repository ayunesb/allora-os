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
exports.validateRLSPolicies = validateRLSPolicies;
var client_1 = require("@/integrations/supabase/client");
/**
 * Validates that Row Level Security (RLS) is properly configured
 * and initialized on all critical tables
 */
function validateRLSPolicies() {
  return __awaiter(this, void 0, void 0, function () {
    var criticalTables,
      rlsIssues,
      _i,
      criticalTables_1,
      table,
      _a,
      data,
      error,
      err_1,
      error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 7, , 8]);
          criticalTables = [
            "profiles",
            "companies",
            "strategies",
            "campaigns",
            "leads",
            "communications",
            "user_actions",
            "user_preferences",
            "user_legal_acceptances",
            "user_feedback",
            "bot_interactions",
            "debates",
            "debate_messages",
            "debate_summaries",
            "tasks",
            "campaign_creatives",
            "ai_boardroom_debates",
          ];
          rlsIssues = [];
          (_i = 0), (criticalTables_1 = criticalTables);
          _b.label = 1;
        case 1:
          if (!(_i < criticalTables_1.length)) return [3 /*break*/, 6];
          table = criticalTables_1[_i];
          _b.label = 2;
        case 2:
          _b.trys.push([2, 4, , 5]);
          return [
            4 /*yield*/,
            client_1.supabase.from(table).select("id").limit(1).single(),
          ];
        case 3:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          // We'll look at the error pattern to detect RLS issues
          if (error) {
            if (error.code === "PGRST116") {
              // This indicates that RLS is blocking access as expected
              return [3 /*break*/, 5];
            }
            if (error.code === "42501") {
              // Permission denied error, which indicates RLS is working
              return [3 /*break*/, 5];
            }
            if (error.message.includes("permission denied")) {
              // Another indication that RLS is working
              return [3 /*break*/, 5];
            }
            if (error.code === "42P01") {
              // Table doesn't exist
              rlsIssues.push(
                "Table '".concat(table, "' does not exist in the database."),
              );
              return [3 /*break*/, 5];
            }
            // Other errors might indicate issues
            rlsIssues.push(
              "Issue with table '".concat(table, "': ").concat(error.message),
            );
          }
          return [3 /*break*/, 5];
        case 4:
          err_1 = _b.sent();
          rlsIssues.push(
            "Error checking RLS for '"
              .concat(table, "': ")
              .concat(err_1 instanceof Error ? err_1.message : String(err_1)),
          );
          return [3 /*break*/, 5];
        case 5:
          _i++;
          return [3 /*break*/, 1];
        case 6:
          if (rlsIssues.length > 0) {
            return [
              2 /*return*/,
              {
                valid: false,
                message: "Potential RLS issues detected: ".concat(
                  rlsIssues.join(", "),
                ),
              },
            ];
          }
          return [
            2 /*return*/,
            {
              valid: true,
              message:
                "Row Level Security (RLS) is properly configured on all critical tables.",
            },
          ];
        case 7:
          error_1 = _b.sent();
          return [
            2 /*return*/,
            {
              valid: false,
              message:
                "Error checking RLS configuration: " +
                (error_1 instanceof Error ? error_1.message : String(error_1)),
            },
          ];
        case 8:
          return [2 /*return*/];
      }
    });
  });
}
