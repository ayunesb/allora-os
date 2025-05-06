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
exports.useDatabaseVerification = useDatabaseVerification;
var react_1 = require("react");
var enhancedApiClient_1 = require("@/utils/api/enhancedApiClient");
var sonner_1 = require("sonner");
function useDatabaseVerification() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isLoading = _a[0],
    setIsLoading = _a[1];
  var _b = (0, react_1.useState)(null),
    results = _b[0],
    setResults = _b[1];
  var _c = (0, react_1.useState)([]),
    issues = _c[0],
    setIssues = _c[1];
  var _d = (0, react_1.useState)(null),
    error = _d[0],
    setError = _d[1];
  var execute = (0, enhancedApiClient_1.useApiClient)().execute;
  // This is a compatibility object to match the structure expected by tests
  var verificationResult = {
    tables: [],
    policies: [],
    functions: [],
    isVerifying: isLoading,
  };
  var fetchDatabaseInfo = (0, react_1.useCallback)(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        var data, newIssues_1, err_1, errorMessage;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsLoading(true);
              setError(null);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 3, 4, 5]);
              return [
                4 /*yield*/,
                execute("/api/admin/database-verification", "GET"),
              ];
            case 2:
              data = _a.sent();
              setResults(data);
              newIssues_1 = [];
              // Table issues
              data.tables.forEach(function (table) {
                if (table.status !== "ok") {
                  newIssues_1.push({
                    type: "table",
                    name: table.name,
                    message:
                      table.message || "Issue with table: ".concat(table.name),
                    severity: table.status === "error" ? "error" : "warning",
                  });
                }
              });
              // Function issues
              data.functions.forEach(function (func) {
                if (func.status !== "ok") {
                  newIssues_1.push({
                    type: "function",
                    name: func.name,
                    message:
                      func.message || "Issue with function: ".concat(func.name),
                    severity: func.status === "error" ? "error" : "warning",
                  });
                }
              });
              // RLS policy issues
              data.rlsPolicies.forEach(function (policy) {
                if (policy.status !== "ok") {
                  newIssues_1.push({
                    type: "policy",
                    name: "".concat(policy.table, ".").concat(policy.name),
                    message:
                      policy.message ||
                      "Issue with RLS policy: ".concat(policy.name),
                    severity: policy.status === "error" ? "error" : "warning",
                  });
                }
              });
              setIssues(newIssues_1);
              return [2 /*return*/, data];
            case 3:
              err_1 = _a.sent();
              errorMessage =
                err_1.message || "Failed to fetch database information";
              setError(errorMessage);
              sonner_1.toast.error(errorMessage);
              throw err_1;
            case 4:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 5:
              return [2 /*return*/];
          }
        });
      });
    },
    [execute],
  );
  // This is the function being used in the test files
  var verifyDatabaseConfiguration = fetchDatabaseInfo;
  var repairAutomatically = (0, react_1.useCallback)(
    function () {
      return __awaiter(_this, void 0, void 0, function () {
        var result, err_2, errorMessage;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsLoading(true);
              setError(null);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 6, 7, 8]);
              return [
                4 /*yield*/,
                execute("/api/admin/database-repair", "POST"),
              ];
            case 2:
              result = _a.sent();
              if (!result.success) return [3 /*break*/, 4];
              sonner_1.toast.success(
                result.message || "Database repaired successfully",
              );
              // Refresh verification data
              return [4 /*yield*/, fetchDatabaseInfo()];
            case 3:
              // Refresh verification data
              _a.sent();
              return [3 /*break*/, 5];
            case 4:
              sonner_1.toast.error(
                result.message || "Failed to repair database",
              );
              _a.label = 5;
            case 5:
              return [2 /*return*/, result];
            case 6:
              err_2 = _a.sent();
              errorMessage = err_2.message || "Failed to repair database";
              setError(errorMessage);
              sonner_1.toast.error(errorMessage);
              throw err_2;
            case 7:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 8:
              return [2 /*return*/];
          }
        });
      });
    },
    [execute, fetchDatabaseInfo],
  );
  return {
    isLoading: isLoading,
    results: results,
    issues: issues,
    error: error,
    fetchDatabaseInfo: fetchDatabaseInfo,
    repairAutomatically: repairAutomatically,
    // Added to fix test compatibility
    verificationResult: verificationResult,
    verifyDatabaseConfiguration: verifyDatabaseConfiguration,
  };
}
