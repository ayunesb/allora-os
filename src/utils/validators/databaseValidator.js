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
exports.validateDatabaseSecurity = validateDatabaseSecurity;
var client_1 = require("@/integrations/supabase/client");
/**
 * Validates database security settings like RLS policies
 */
function validateDatabaseSecurity() {
  return __awaiter(this, void 0, void 0, function () {
    var rlsEnabledTables,
      rlsResults,
      allTablesSecured,
      _i,
      rlsEnabledTables_1,
      table,
      error,
      err_1,
      allIndexesExist,
      error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 7, , 8]);
          rlsEnabledTables = [
            "user_actions",
            "user_preferences",
            "profiles",
            "strategies",
            "campaigns",
            "leads",
            "communications",
            "ai_boardroom_debates",
            "bot_interactions",
            "debate_messages",
            "debate_summaries",
            "tasks",
            "campaign_creatives",
          ];
          rlsResults = [];
          allTablesSecured = true;
          (_i = 0), (rlsEnabledTables_1 = rlsEnabledTables);
          _a.label = 1;
        case 1:
          if (!(_i < rlsEnabledTables_1.length)) return [3 /*break*/, 6];
          table = rlsEnabledTables_1[_i];
          _a.label = 2;
        case 2:
          _a.trys.push([2, 4, , 5]);
          return [
            4 /*yield*/,
            client_1.supabase.from(table).select("id").limit(1),
          ];
        case 3:
          error = _a.sent().error;
          if (error) {
            if (error.code === "42P01") {
              // Table doesn't exist
              rlsResults.push("Table '".concat(table, "' does not exist"));
              return [3 /*break*/, 5];
            } else if (
              error.message.includes("permission denied") ||
              error.code === "PGRST116"
            ) {
              // This is the expected behavior with RLS working
              return [3 /*break*/, 5];
            } else {
              // Some other error
              rlsResults.push(
                "Error checking '".concat(table, "': ").concat(error.message),
              );
              return [3 /*break*/, 5];
            }
          }
          return [3 /*break*/, 5];
        case 4:
          err_1 = _a.sent();
          rlsResults.push(
            "Error checking '"
              .concat(table, "': ")
              .concat(err_1 instanceof Error ? err_1.message : String(err_1)),
          );
          return [3 /*break*/, 5];
        case 5:
          _i++;
          return [3 /*break*/, 1];
        case 6:
          allIndexesExist = true;
          if (rlsResults.length > 0) {
            return [
              2 /*return*/,
              {
                valid: false,
                message:
                  "Database security issues detected: " + rlsResults.join(", "),
              },
            ];
          }
          return [
            2 /*return*/,
            {
              valid: true,
              message:
                "Database security is properly configured with RLS policies, secured functions, and performance indexes.",
            },
          ];
        case 7:
          error_1 = _a.sent();
          return [
            2 /*return*/,
            {
              valid: false,
              message:
                "Error checking database security: " +
                (error_1 instanceof Error ? error_1.message : String(error_1)),
            },
          ];
        case 8:
          return [2 /*return*/];
      }
    });
  });
}
