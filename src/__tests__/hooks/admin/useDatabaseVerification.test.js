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
var vitest_1 = require("vitest");
var react_hooks_1 = require("@testing-library/react-hooks");
var useDatabaseVerification_1 = require("@/hooks/admin/useDatabaseVerification");
var sonner_1 = require("sonner");
var databaseVerification = require("@/utils/admin/database-verification");
// Mock the dependencies
vitest_1.vi.mock("sonner", function () {
  return {
    toast: {
      success: vitest_1.vi.fn(),
      error: vitest_1.vi.fn(),
    },
  };
});
vitest_1.vi.mock("@/utils/admin/database-verification", function () {
  return {
    verifyDatabaseTables: vitest_1.vi.fn(),
    verifyRlsPolicies: vitest_1.vi.fn(),
    verifyDatabaseFunctions: vitest_1.vi.fn(),
    displayVerificationResults: vitest_1.vi.fn(),
  };
});
vitest_1.vi.mock("@/integrations/supabase/client", function () {
  return {
    supabase: {
      rpc: vitest_1.vi.fn(),
      auth: {
        getUser: vitest_1.vi.fn(),
      },
    },
  };
});
// Test data
var mockTableResults = [
  {
    name: "profiles",
    exists: true,
    hasRLS: true,
    status: "success",
    message: "Table exists",
  },
];
var mockPolicyResults = [
  {
    table: "profiles",
    name: "auth_policy",
    exists: true,
    isSecure: true,
    status: "success",
    message: "RLS enabled",
  },
];
var mockFunctionResults = [
  {
    name: "handle_new_user",
    exists: true,
    isSecure: true,
    status: "success",
    message: "Function is secure",
  },
];
(0, vitest_1.describe)("useDatabaseVerification Hook", function () {
  (0, vitest_1.beforeEach)(function () {
    vitest_1.vi.resetAllMocks();
  });
  (0, vitest_1.describe)("Initial State", function () {
    (0, vitest_1.it)(
      "should initialize with empty verification result",
      function () {
        var result = (0, react_hooks_1.renderHook)(function () {
          return (0, useDatabaseVerification_1.useDatabaseVerification)();
        }).result;
        (0, vitest_1.expect)(result.current.verificationResult).toEqual({
          tables: [],
          policies: [],
          functions: [],
          isVerifying: false,
        });
      },
    );
  });
  (0, vitest_1.describe)("Verification Process", function () {
    (0, vitest_1.beforeEach)(function () {
      // Setup common mocks for verification process tests
      vitest_1.vi
        .mocked(databaseVerification.verifyDatabaseTables)
        .mockResolvedValue(mockTableResults);
      vitest_1.vi
        .mocked(databaseVerification.verifyRlsPolicies)
        .mockResolvedValue(mockPolicyResults);
      vitest_1.vi
        .mocked(databaseVerification.verifyDatabaseFunctions)
        .mockResolvedValue(mockFunctionResults);
    });
    (0, vitest_1.it)(
      "should set isVerifying flag when verification starts",
      function () {
        var result = (0, react_hooks_1.renderHook)(function () {
          return (0, useDatabaseVerification_1.useDatabaseVerification)();
        }).result;
        (0, react_hooks_1.act)(function () {
          result.current.verifyDatabaseConfiguration();
        });
        (0, vitest_1.expect)(
          result.current.verificationResult.isVerifying,
        ).toBe(true);
      },
    );
    (0, vitest_1.it)(
      "should perform full verification and update results",
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var _a, result, waitForNextUpdate;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                (_a = (0, react_hooks_1.renderHook)(function () {
                  return (0,
                  useDatabaseVerification_1.useDatabaseVerification)();
                })),
                  (result = _a.result),
                  (waitForNextUpdate = _a.waitForNextUpdate);
                (0, react_hooks_1.act)(function () {
                  result.current.verifyDatabaseConfiguration();
                });
                return [4 /*yield*/, waitForNextUpdate()];
              case 1:
                _b.sent();
                // Verify final state
                (0, vitest_1.expect)(result.current.verificationResult).toEqual(
                  {
                    tables: mockTableResults,
                    policies: mockPolicyResults,
                    functions: mockFunctionResults,
                    isVerifying: false,
                  },
                );
                // Verify that all verification functions were called
                (0, vitest_1.expect)(
                  databaseVerification.verifyDatabaseTables,
                ).toHaveBeenCalledTimes(1);
                (0, vitest_1.expect)(
                  databaseVerification.verifyRlsPolicies,
                ).toHaveBeenCalledTimes(1);
                (0, vitest_1.expect)(
                  databaseVerification.verifyDatabaseFunctions,
                ).toHaveBeenCalledTimes(1);
                // Verify display function was called with correct params
                (0, vitest_1.expect)(
                  databaseVerification.displayVerificationResults,
                ).toHaveBeenCalledWith(
                  mockTableResults,
                  mockPolicyResults,
                  mockFunctionResults,
                );
                return [2 /*return*/];
            }
          });
        });
      },
    );
  });
  (0, vitest_1.describe)("Error Handling", function () {
    (0, vitest_1.it)(
      "should handle errors during verification and show error toast",
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var testError, _a, result, waitForNextUpdate;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                testError = new Error("Test verification error");
                vitest_1.vi
                  .mocked(databaseVerification.verifyDatabaseTables)
                  .mockRejectedValue(testError);
                (_a = (0, react_hooks_1.renderHook)(function () {
                  return (0,
                  useDatabaseVerification_1.useDatabaseVerification)();
                })),
                  (result = _a.result),
                  (waitForNextUpdate = _a.waitForNextUpdate);
                (0, react_hooks_1.act)(function () {
                  result.current.verifyDatabaseConfiguration();
                });
                return [4 /*yield*/, waitForNextUpdate()];
              case 1:
                _b.sent();
                // Should reset isVerifying flag
                (0, vitest_1.expect)(
                  result.current.verificationResult.isVerifying,
                ).toBe(false);
                // Should show error toast
                (0, vitest_1.expect)(sonner_1.toast.error).toHaveBeenCalledWith(
                  vitest_1.expect.stringContaining("Test verification error"),
                );
                return [2 /*return*/];
            }
          });
        });
      },
    );
  });
  (0, vitest_1.describe)("Toast Notifications", function () {
    (0, vitest_1.it)(
      "should show success toast when all checks pass",
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var _a, result, waitForNextUpdate;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                // Mock all verification functions to return successful results
                vitest_1.vi
                  .mocked(databaseVerification.verifyDatabaseTables)
                  .mockResolvedValue(mockTableResults);
                vitest_1.vi
                  .mocked(databaseVerification.verifyRlsPolicies)
                  .mockResolvedValue(mockPolicyResults);
                vitest_1.vi
                  .mocked(databaseVerification.verifyDatabaseFunctions)
                  .mockResolvedValue(mockFunctionResults);
                (_a = (0, react_hooks_1.renderHook)(function () {
                  return (0,
                  useDatabaseVerification_1.useDatabaseVerification)();
                })),
                  (result = _a.result),
                  (waitForNextUpdate = _a.waitForNextUpdate);
                (0, react_hooks_1.act)(function () {
                  result.current.verifyDatabaseConfiguration();
                });
                return [4 /*yield*/, waitForNextUpdate()];
              case 1:
                _b.sent();
                (0, vitest_1.expect)(
                  sonner_1.toast.success,
                ).toHaveBeenCalledWith(
                  "Database verification completed - All checks passed",
                );
                (0, vitest_1.expect)(
                  sonner_1.toast.error,
                ).not.toHaveBeenCalled();
                return [2 /*return*/];
            }
          });
        });
      },
    );
    (0, vitest_1.it)(
      "should show error toast with count when issues are found",
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var tablesWithIssue, _a, result, waitForNextUpdate;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                tablesWithIssue = [
                  {
                    name: "profiles",
                    exists: false,
                    hasRLS: false,
                    status: "error",
                    message: "Table missing",
                  },
                ];
                vitest_1.vi
                  .mocked(databaseVerification.verifyDatabaseTables)
                  .mockResolvedValue(tablesWithIssue);
                vitest_1.vi
                  .mocked(databaseVerification.verifyRlsPolicies)
                  .mockResolvedValue(mockPolicyResults);
                vitest_1.vi
                  .mocked(databaseVerification.verifyDatabaseFunctions)
                  .mockResolvedValue(mockFunctionResults);
                (_a = (0, react_hooks_1.renderHook)(function () {
                  return (0,
                  useDatabaseVerification_1.useDatabaseVerification)();
                })),
                  (result = _a.result),
                  (waitForNextUpdate = _a.waitForNextUpdate);
                (0, react_hooks_1.act)(function () {
                  result.current.verifyDatabaseConfiguration();
                });
                return [4 /*yield*/, waitForNextUpdate()];
              case 1:
                _b.sent();
                (0, vitest_1.expect)(sonner_1.toast.error).toHaveBeenCalledWith(
                  "Database verification completed - 1 issues found",
                );
                (0, vitest_1.expect)(
                  sonner_1.toast.success,
                ).not.toHaveBeenCalled();
                return [2 /*return*/];
            }
          });
        });
      },
    );
  });
});
