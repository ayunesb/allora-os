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
exports.verifyRlsPolicies = verifyRlsPolicies;
var client_1 = require("@/integrations/supabase/client");
/**
 * Verifies if RLS (Row Level Security) policies are enabled
 * for critical tables in the database
 */
function verifyRlsPolicies() {
  return __awaiter(this, void 0, void 0, function () {
    var criticalTables,
      results,
      _i,
      criticalTables_1,
      table,
      _a,
      data,
      error,
      rlsEnabled,
      err_1,
      error_1;
    var _b;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          criticalTables = [
            "profiles",
            "companies",
            "strategies",
            "leads",
            "campaigns",
            "communications",
          ];
          results = [];
          _c.label = 1;
        case 1:
          _c.trys.push([1, 8, , 9]);
          (_i = 0), (criticalTables_1 = criticalTables);
          _c.label = 2;
        case 2:
          if (!(_i < criticalTables_1.length)) return [3 /*break*/, 7];
          table = criticalTables_1[_i];
          _c.label = 3;
        case 3:
          _c.trys.push([3, 5, , 6]);
          return [
            4 /*yield*/,
            client_1.supabase.rpc("check_rls_enabled", {
              table_name: table,
            }),
          ];
        case 4:
          (_a = _c.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            results.push({
              table: table,
              name: "".concat(table, "_rls_policy"),
              exists: false,
              isSecure: false,
              status: "error",
              message: "RLS check failed for '"
                .concat(table, "': ")
                .concat(error.message),
            });
          } else {
            rlsEnabled =
              data &&
              ((_b = data[0]) === null || _b === void 0
                ? void 0
                : _b.rls_enabled) === true;
            results.push({
              table: table,
              name: "".concat(table, "_rls_policy"),
              exists: rlsEnabled,
              isSecure: rlsEnabled,
              status: rlsEnabled ? "success" : "warning",
              message: rlsEnabled
                ? "RLS enabled for '".concat(table, "'")
                : "RLS not enabled for '".concat(table, "'"),
            });
          }
          return [3 /*break*/, 6];
        case 5:
          err_1 = _c.sent();
          results.push({
            table: table,
            name: "".concat(table, "_rls_policy"),
            exists: false,
            isSecure: false,
            status: "error",
            message: "Error checking RLS for '"
              .concat(table, "': ")
              .concat(err_1 instanceof Error ? err_1.message : "Unknown error"),
          });
          return [3 /*break*/, 6];
        case 6:
          _i++;
          return [3 /*break*/, 2];
        case 7:
          return [2 /*return*/, results];
        case 8:
          error_1 = _c.sent();
          console.error("Error verifying RLS policies:", error_1);
          return [
            2 /*return*/,
            criticalTables.map(function (table) {
              return {
                table: table,
                name: "".concat(table, "_rls_policy"),
                exists: false,
                isSecure: false,
                status: "error",
                message: "Failed to verify RLS policies",
              };
            }),
          ];
        case 9:
          return [2 /*return*/];
      }
    });
  });
}
