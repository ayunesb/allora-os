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
exports.useVerification = useVerification;
var react_1 = require("react");
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
function useVerification(companyId) {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isChecking = _a[0],
    setIsChecking = _a[1];
  var _b = (0, react_1.useState)(false),
    isAddingDemo = _b[0],
    setIsAddingDemo = _b[1];
  var _c = (0, react_1.useState)(false),
    isVerifyingTables = _c[0],
    setIsVerifyingTables = _c[1];
  var _d = (0, react_1.useState)(false),
    isCheckingIndexes = _d[0],
    setIsCheckingIndexes = _d[1];
  var _e = (0, react_1.useState)(false),
    isVerifyingRLS = _e[0],
    setIsVerifyingRLS = _e[1];
  var _f = (0, react_1.useState)(false),
    isVerifyingFunctions = _f[0],
    setIsVerifyingFunctions = _f[1];
  var _g = (0, react_1.useState)(null),
    results = _g[0],
    setResults = _g[1];
  var _h = (0, react_1.useState)(null),
    isReady = _h[0],
    setIsReady = _h[1];
  // Run all verification checks
  var runChecks = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data, error, err_1;
      var _b, _c;
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            if (!companyId) {
              sonner_1.toast.error(
                "Company ID is required for verification checks",
              );
              return [2 /*return*/];
            }
            setIsChecking(true);
            _d.label = 1;
          case 1:
            _d.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase.functions.invoke("verify-launch-readiness", {
                body: { tenant_id: companyId },
              }),
            ];
          case 2:
            (_a = _d.sent()), (data = _a.data), (error = _a.error);
            if (error) throw new Error(error.message);
            setResults(data);
            setIsReady(
              ((_b = data.overallStatus) === null || _b === void 0
                ? void 0
                : _b.valid) || false,
            );
            if (
              (_c = data.overallStatus) === null || _c === void 0
                ? void 0
                : _c.valid
            ) {
              sonner_1.toast.success("All verification checks passed!");
            } else {
              sonner_1.toast.warning(
                "Some verification checks failed. Please review the results.",
              );
            }
            return [3 /*break*/, 5];
          case 3:
            err_1 = _d.sent();
            console.error("Error running verification checks:", err_1);
            sonner_1.toast.error("Failed to run verification checks");
            return [3 /*break*/, 5];
          case 4:
            setIsChecking(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Add demo data
  var handleAddDemoData = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var error, err_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!companyId) {
              sonner_1.toast.error("Company ID is required to add demo data");
              return [2 /*return*/];
            }
            setIsAddingDemo(true);
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase.functions.invoke("add-demo-data", {
                body: { tenant_id: companyId },
              }),
            ];
          case 2:
            error = _a.sent().error;
            if (error) throw new Error(error.message);
            sonner_1.toast.success("Demo data added successfully");
            return [3 /*break*/, 5];
          case 3:
            err_2 = _a.sent();
            console.error("Error adding demo data:", err_2);
            sonner_1.toast.error("Failed to add demo data");
            return [3 /*break*/, 5];
          case 4:
            setIsAddingDemo(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Verify required tables
  var verifyRequiredTables = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data_1, error, err_3;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!companyId) {
              sonner_1.toast.error("Company ID is required to verify tables");
              return [2 /*return*/];
            }
            setIsVerifyingTables(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase.functions.invoke("verify-database-tables", {
                body: { tenant_id: companyId },
              }),
            ];
          case 2:
            (_a = _b.sent()), (data_1 = _a.data), (error = _a.error);
            if (error) throw new Error(error.message);
            setResults(function (prev) {
              return __assign(__assign({}, prev), {
                databaseTables: data_1.tables,
              });
            });
            sonner_1.toast.success("Tables verified");
            return [3 /*break*/, 5];
          case 3:
            err_3 = _b.sent();
            console.error("Error verifying tables:", err_3);
            sonner_1.toast.error("Failed to verify tables");
            return [3 /*break*/, 5];
          case 4:
            setIsVerifyingTables(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Check database indexes
  var checkDatabaseIndexes = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data_2, error, err_4;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!companyId) {
              sonner_1.toast.error("Company ID is required to check indexes");
              return [2 /*return*/];
            }
            setIsCheckingIndexes(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase.functions.invoke("verify-database-indexes", {
                body: { tenant_id: companyId },
              }),
            ];
          case 2:
            (_a = _b.sent()), (data_2 = _a.data), (error = _a.error);
            if (error) throw new Error(error.message);
            setResults(function (prev) {
              return __assign(__assign({}, prev), {
                databaseIndexes: data_2.indexes,
              });
            });
            sonner_1.toast.success("Indexes verified");
            return [3 /*break*/, 5];
          case 3:
            err_4 = _b.sent();
            console.error("Error checking indexes:", err_4);
            sonner_1.toast.error("Failed to check indexes");
            return [3 /*break*/, 5];
          case 4:
            setIsCheckingIndexes(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Verify RLS policies
  var verifyRLSPolicies = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data_3, error, err_5;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!companyId) {
              sonner_1.toast.error(
                "Company ID is required to verify RLS policies",
              );
              return [2 /*return*/];
            }
            setIsVerifyingRLS(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase.functions.invoke("verify-rls-policies", {
                body: { tenant_id: companyId },
              }),
            ];
          case 2:
            (_a = _b.sent()), (data_3 = _a.data), (error = _a.error);
            if (error) throw new Error(error.message);
            setResults(function (prev) {
              return __assign(__assign({}, prev), {
                rlsPolicies: data_3.policies,
              });
            });
            sonner_1.toast.success("RLS policies verified");
            return [3 /*break*/, 5];
          case 3:
            err_5 = _b.sent();
            console.error("Error verifying RLS policies:", err_5);
            sonner_1.toast.error("Failed to verify RLS policies");
            return [3 /*break*/, 5];
          case 4:
            setIsVerifyingRLS(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  // Verify database functions
  var verifyDatabaseFunctions = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var _a, data_4, error, err_6;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!companyId) {
              sonner_1.toast.error(
                "Company ID is required to verify functions",
              );
              return [2 /*return*/];
            }
            setIsVerifyingFunctions(true);
            _b.label = 1;
          case 1:
            _b.trys.push([1, 3, 4, 5]);
            return [
              4 /*yield*/,
              client_1.supabase.functions.invoke("verify-database-functions", {
                body: { tenant_id: companyId },
              }),
            ];
          case 2:
            (_a = _b.sent()), (data_4 = _a.data), (error = _a.error);
            if (error) throw new Error(error.message);
            setResults(function (prev) {
              return __assign(__assign({}, prev), {
                databaseFunctions: data_4.functions,
              });
            });
            sonner_1.toast.success("Database functions verified");
            return [3 /*break*/, 5];
          case 3:
            err_6 = _b.sent();
            console.error("Error verifying functions:", err_6);
            sonner_1.toast.error("Failed to verify functions");
            return [3 /*break*/, 5];
          case 4:
            setIsVerifyingFunctions(false);
            return [7 /*endfinally*/];
          case 5:
            return [2 /*return*/];
        }
      });
    });
  };
  return {
    isChecking: isChecking,
    results: results,
    isReady: isReady,
    isAddingDemo: isAddingDemo,
    isVerifyingTables: isVerifyingTables,
    isCheckingIndexes: isCheckingIndexes,
    isVerifyingRLS: isVerifyingRLS,
    isVerifyingFunctions: isVerifyingFunctions,
    runChecks: runChecks,
    handleAddDemoData: handleAddDemoData,
    verifyRequiredTables: verifyRequiredTables,
    checkDatabaseIndexes: checkDatabaseIndexes,
    verifyRLSPolicies: verifyRLSPolicies,
    verifyDatabaseFunctions: verifyDatabaseFunctions,
  };
}
