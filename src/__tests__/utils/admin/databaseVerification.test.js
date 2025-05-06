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
var database_verification_1 = require("@/utils/admin/database-verification");
var client_1 = require("@/integrations/supabase/client");
var sonner_1 = require("sonner");
// Mock the dependencies
vitest_1.vi.mock("@/integrations/supabase/client", function () {
  return {
    supabase: {
      from: vitest_1.vi.fn(),
      rpc: vitest_1.vi.fn(),
    },
  };
});
vitest_1.vi.mock("sonner", function () {
  return {
    toast: {
      success: vitest_1.vi.fn(),
      error: vitest_1.vi.fn(),
    },
  };
});
(0, vitest_1.describe)("Database Verification Utils", function () {
  // Set up mocks and clean up after each test
  (0, vitest_1.beforeEach)(function () {
    vitest_1.vi.resetAllMocks();
  });
  (0, vitest_1.afterEach)(function () {
    vitest_1.vi.clearAllMocks();
  });
  (0, vitest_1.describe)("verifyDatabaseTables", function () {
    (0, vitest_1.it)("should correctly identify existing tables", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var mockSelectFn, mockEqFn, result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              mockSelectFn = vitest_1.vi.fn().mockResolvedValue({
                data: { table_name: "profiles" },
                error: null,
              });
              mockEqFn = vitest_1.vi.fn().mockReturnValue({
                eq: vitest_1.vi.fn().mockReturnValue({ single: mockSelectFn }),
              });
              // @ts-ignore - We're intentionally mocking a subset of the API
              client_1.supabase.from.mockReturnValue({
                select: vitest_1.vi.fn().mockReturnValue({ eq: mockEqFn }),
              });
              return [
                4 /*yield*/,
                (0, database_verification_1.verifyDatabaseTables)(),
              ];
            case 1:
              result = _a.sent();
              // We should have results for each required table
              (0, vitest_1.expect)(result.length).toBeGreaterThan(0);
              // First table should be 'profiles' and should exist
              (0, vitest_1.expect)(result[0].name).toBe("profiles");
              (0, vitest_1.expect)(result[0].exists).toBe(true);
              return [2 /*return*/];
          }
        });
      });
    });
    (0, vitest_1.it)("should correctly identify missing tables", function () {
      return __awaiter(void 0, void 0, void 0, function () {
        var mockSelectFn, mockEqFn, result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              mockSelectFn = vitest_1.vi.fn().mockResolvedValue({
                data: null,
                error: { message: "Table not found" },
              });
              mockEqFn = vitest_1.vi.fn().mockReturnValue({
                eq: vitest_1.vi.fn().mockReturnValue({ single: mockSelectFn }),
              });
              // @ts-ignore - We're intentionally mocking a subset of the API
              client_1.supabase.from.mockReturnValue({
                select: vitest_1.vi.fn().mockReturnValue({ eq: mockEqFn }),
              });
              return [
                4 /*yield*/,
                (0, database_verification_1.verifyDatabaseTables)(),
              ];
            case 1:
              result = _a.sent();
              // Should have identified missing tables
              (0, vitest_1.expect)(
                result.filter(function (t) {
                  return !t.exists;
                }).length,
              ).toBeGreaterThan(0);
              return [2 /*return*/];
          }
        });
      });
    });
    (0, vitest_1.it)(
      "should handle errors during table verification",
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var mockSelectFn, mockEqFn, result;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                mockSelectFn = vitest_1.vi
                  .fn()
                  .mockRejectedValue(new Error("Network error"));
                mockEqFn = vitest_1.vi.fn().mockReturnValue({
                  eq: vitest_1.vi
                    .fn()
                    .mockReturnValue({ single: mockSelectFn }),
                });
                // @ts-ignore - We're intentionally mocking a subset of the API
                client_1.supabase.from.mockReturnValue({
                  select: vitest_1.vi.fn().mockReturnValue({ eq: mockEqFn }),
                });
                return [
                  4 /*yield*/,
                  (0, database_verification_1.verifyDatabaseTables)(),
                ];
              case 1:
                result = _a.sent();
                // Should have error in results - fixed to use message property
                (0, vitest_1.expect)(
                  result.some(function (t) {
                    return t.message && t.message.includes("Error");
                  }),
                ).toBe(true);
                return [2 /*return*/];
            }
          });
        });
      },
    );
  });
  (0, vitest_1.describe)("verifyRlsPolicies", function () {
    (0, vitest_1.it)(
      "should correctly identify tables with RLS policies",
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var mockTableSelectFn, mockTableEqFn, mockPoliciesSelectFn, result;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                mockTableSelectFn = vitest_1.vi.fn().mockResolvedValue({
                  data: { table_name: "profiles" },
                  error: null,
                });
                mockTableEqFn = vitest_1.vi.fn().mockReturnValue({
                  eq: vitest_1.vi.fn().mockReturnValue({
                    single: mockTableSelectFn,
                  }),
                });
                mockPoliciesSelectFn = vitest_1.vi.fn().mockResolvedValue({
                  data: [{ policyname: "auth_policy" }],
                  error: null,
                });
                // @ts-ignore - We're intentionally mocking a subset of the API
                client_1.supabase.from.mockImplementation(function (table) {
                  if (table === "information_schema.tables") {
                    return {
                      select: vitest_1.vi
                        .fn()
                        .mockReturnValue({ eq: mockTableEqFn }),
                    };
                  } else if (table === "pg_policies") {
                    return {
                      select: vitest_1.vi.fn().mockReturnValue({
                        eq: vitest_1.vi.fn().mockReturnValue({
                          eq: vitest_1.vi
                            .fn()
                            .mockReturnValue(mockPoliciesSelectFn),
                        }),
                      }),
                    };
                  }
                  return { select: vitest_1.vi.fn() };
                });
                return [
                  4 /*yield*/,
                  (0, database_verification_1.verifyRlsPolicies)(),
                ];
              case 1:
                result = _a.sent();
                // Should identify tables with RLS enabled
                (0, vitest_1.expect)(
                  result.some(function (p) {
                    return p.exists;
                  }),
                ).toBe(true);
                return [2 /*return*/];
            }
          });
        });
      },
    );
    (0, vitest_1.it)(
      "should correctly identify tables without RLS policies",
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var mockTableSelectFn, mockTableEqFn, mockPoliciesSelectFn, result;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                mockTableSelectFn = vitest_1.vi.fn().mockResolvedValue({
                  data: { table_name: "profiles" },
                  error: null,
                });
                mockTableEqFn = vitest_1.vi.fn().mockReturnValue({
                  eq: vitest_1.vi.fn().mockReturnValue({
                    single: mockTableSelectFn,
                  }),
                });
                mockPoliciesSelectFn = vitest_1.vi.fn().mockResolvedValue({
                  data: [],
                  error: null,
                });
                // @ts-ignore - We're intentionally mocking a subset of the API
                client_1.supabase.from.mockImplementation(function (table) {
                  if (table === "information_schema.tables") {
                    return {
                      select: vitest_1.vi
                        .fn()
                        .mockReturnValue({ eq: mockTableEqFn }),
                    };
                  } else if (table === "pg_policies") {
                    return {
                      select: vitest_1.vi.fn().mockReturnValue({
                        eq: vitest_1.vi.fn().mockReturnValue({
                          eq: vitest_1.vi
                            .fn()
                            .mockReturnValue(mockPoliciesSelectFn),
                        }),
                      }),
                    };
                  }
                  return { select: vitest_1.vi.fn() };
                });
                return [
                  4 /*yield*/,
                  (0, database_verification_1.verifyRlsPolicies)(),
                ];
              case 1:
                result = _a.sent();
                // Should identify tables without RLS
                (0, vitest_1.expect)(
                  result.some(function (p) {
                    return !p.exists;
                  }),
                ).toBe(true);
                return [2 /*return*/];
            }
          });
        });
      },
    );
  });
  (0, vitest_1.describe)("verifyDatabaseFunctions", function () {
    (0, vitest_1.it)(
      "should correctly identify existing secure functions",
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var result;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                // Mock RPC call for function checking
                // @ts-ignore - We're intentionally mocking a subset of the API
                client_1.supabase.rpc.mockResolvedValue({
                  data: [
                    {
                      function_exists: true,
                      is_secure: true,
                    },
                  ],
                  error: null,
                });
                return [
                  4 /*yield*/,
                  (0, database_verification_1.verifyDatabaseFunctions)(),
                ];
              case 1:
                result = _a.sent();
                // Should identify functions that exist and are secure
                (0, vitest_1.expect)(result.length).toBeGreaterThan(0);
                (0, vitest_1.expect)(
                  result.some(function (f) {
                    return f.exists && f.isSecure;
                  }),
                ).toBe(true);
                return [2 /*return*/];
            }
          });
        });
      },
    );
    (0, vitest_1.it)(
      "should correctly identify existing but insecure functions",
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var result;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                // Mock RPC call for insecure function
                // @ts-ignore - We're intentionally mocking a subset of the API
                client_1.supabase.rpc.mockResolvedValue({
                  data: [
                    {
                      function_exists: true,
                      is_secure: false,
                    },
                  ],
                  error: null,
                });
                return [
                  4 /*yield*/,
                  (0, database_verification_1.verifyDatabaseFunctions)(),
                ];
              case 1:
                result = _a.sent();
                // Should identify functions that exist but are not secure
                (0, vitest_1.expect)(
                  result.some(function (f) {
                    return f.exists && !f.isSecure;
                  }),
                ).toBe(true);
                return [2 /*return*/];
            }
          });
        });
      },
    );
    (0, vitest_1.it)(
      "should correctly identify missing functions",
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var result;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                // Mock RPC call for missing function
                // @ts-ignore - We're intentionally mocking a subset of the API
                client_1.supabase.rpc.mockResolvedValue({
                  data: [
                    {
                      function_exists: false,
                      is_secure: false,
                    },
                  ],
                  error: null,
                });
                return [
                  4 /*yield*/,
                  (0, database_verification_1.verifyDatabaseFunctions)(),
                ];
              case 1:
                result = _a.sent();
                // Should identify functions that don't exist
                (0, vitest_1.expect)(
                  result.some(function (f) {
                    return !f.exists;
                  }),
                ).toBe(true);
                return [2 /*return*/];
            }
          });
        });
      },
    );
    (0, vitest_1.it)(
      "should handle fallback for function checking when RPC fails",
      function () {
        return __awaiter(void 0, void 0, void 0, function () {
          var mockFallbackSelectFn, result;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                // Mock RPC failure first
                // @ts-ignore - We're intentionally mocking a subset of the API
                client_1.supabase.rpc.mockResolvedValue({
                  data: null,
                  error: { message: "Function not found" },
                });
                mockFallbackSelectFn = vitest_1.vi.fn().mockResolvedValue({
                  data: { proname: "handle_new_user", prosecdef: true },
                  error: null,
                });
                // @ts-ignore - We're intentionally mocking a subset of the API
                client_1.supabase.from.mockReturnValue({
                  select: vitest_1.vi.fn().mockReturnValue({
                    eq: vitest_1.vi.fn().mockReturnValue({
                      single: mockFallbackSelectFn,
                    }),
                  }),
                });
                return [
                  4 /*yield*/,
                  (0, database_verification_1.verifyDatabaseFunctions)(),
                ];
              case 1:
                result = _a.sent();
                // Should use fallback method and still identify functions
                (0, vitest_1.expect)(result.length).toBeGreaterThan(0);
                return [2 /*return*/];
            }
          });
        });
      },
    );
  });
  (0, vitest_1.describe)("displayVerificationResults", function () {
    (0, vitest_1.it)(
      "should display success toast for all passing checks",
      function () {
        var tables = [
          {
            name: "profiles",
            exists: true,
            hasRLS: true,
            status: "success",
            message: "Table exists",
          },
          {
            name: "companies",
            exists: true,
            hasRLS: true,
            status: "success",
            message: "Table exists",
          },
        ];
        var policies = [
          {
            table: "profiles",
            name: "auth_policy",
            exists: true,
            isSecure: true,
            status: "success",
            message: "RLS enabled",
          },
          {
            table: "companies",
            name: "auth_policy",
            exists: true,
            isSecure: true,
            status: "success",
            message: "RLS enabled",
          },
        ];
        var functions = [
          {
            name: "handle_new_user",
            exists: true,
            isSecure: true,
            status: "success",
            message: "Function is secure",
          },
        ];
        (0, database_verification_1.displayVerificationResults)(
          tables,
          policies,
          functions,
        );
        // Should show success toasts
        (0, vitest_1.expect)(sonner_1.toast.success).toHaveBeenCalledTimes(3);
        (0, vitest_1.expect)(sonner_1.toast.error).not.toHaveBeenCalled();
      },
    );
    (0, vitest_1.it)(
      "should display error toast for failing checks",
      function () {
        var tables = [
          {
            name: "profiles",
            exists: true,
            hasRLS: true,
            status: "success",
            message: "Table exists",
          },
          {
            name: "missing_table",
            exists: false,
            hasRLS: false,
            status: "error",
            message: "Table missing",
          },
        ];
        var policies = [
          {
            table: "profiles",
            name: "auth_policy",
            exists: false,
            isSecure: false,
            status: "error",
            message: "No RLS",
          },
        ];
        var functions = [
          {
            name: "handle_new_user",
            exists: true,
            isSecure: false,
            status: "warning",
            message: "Not secure",
          },
        ];
        (0, database_verification_1.displayVerificationResults)(
          tables,
          policies,
          functions,
        );
        // Should show error toasts
        (0, vitest_1.expect)(sonner_1.toast.error).toHaveBeenCalledTimes(3);
      },
    );
  });
});
