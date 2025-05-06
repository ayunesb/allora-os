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
exports.verifyDatabaseTables = verifyDatabaseTables;
var client_1 = require("@/integrations/supabase/client");
/**
 * Verifies if required tables exist in the database
 */
function verifyDatabaseTables() {
  return __awaiter(this, void 0, void 0, function () {
    var requiredTables,
      results,
      _a,
      data,
      error,
      tableNames,
      _i,
      requiredTables_1,
      table,
      exists,
      error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          requiredTables = [
            "profiles",
            "companies",
            "strategies",
            "leads",
            "campaigns",
            "communications",
            "tasks",
            "audit_logs",
          ];
          results = [];
          _b.label = 1;
        case 1:
          _b.trys.push([1, 3, , 4]);
          return [
            4 /*yield*/,
            client_1.supabase
              .from("pg_tables")
              .select("tablename")
              .eq("schemaname", "public"),
          ];
        case 2:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error fetching tables:", error);
            return [
              2 /*return*/,
              requiredTables.map(function (table) {
                return {
                  name: table,
                  exists: false,
                  hasRLS: false,
                  status: "error",
                  message: "Failed to fetch tables from database",
                };
              }),
            ];
          }
          tableNames = data.map(function (t) {
            return t.tablename;
          });
          // Check each required table
          for (
            _i = 0, requiredTables_1 = requiredTables;
            _i < requiredTables_1.length;
            _i++
          ) {
            table = requiredTables_1[_i];
            exists = tableNames.includes(table);
            results.push({
              name: table,
              exists: exists,
              hasRLS: false, // We'll set this properly when we check RLS
              status: exists ? "success" : "error",
              message: exists
                ? "Table '".concat(table, "' exists")
                : "Table '".concat(table, "' missing"),
            });
          }
          return [2 /*return*/, results];
        case 3:
          error_1 = _b.sent();
          console.error("Error verifying database tables:", error_1);
          return [
            2 /*return*/,
            requiredTables.map(function (table) {
              return {
                name: table,
                exists: false,
                hasRLS: false,
                status: "error",
                message: "Failed to verify database tables",
              };
            }),
          ];
        case 4:
          return [2 /*return*/];
      }
    });
  });
}
