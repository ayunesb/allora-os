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
var vitest_1 = require("vitest");
var test_1 = require("@/utils/company/test");
var fetchUsers_1 = require("@/utils/users/fetchUsers");
var client_1 = require("@/integrations/supabase/client");
// Mock dependencies
vitest_1.vi.mock("@/integrations/supabase/client", function () {
  return {
    supabase: {
      from: vitest_1.vi.fn().mockReturnThis(),
      select: vitest_1.vi.fn().mockReturnThis(),
      eq: vitest_1.vi.fn().mockReturnThis(),
      insert: vitest_1.vi.fn().mockReturnThis(),
      update: vitest_1.vi.fn().mockReturnThis(),
      limit: vitest_1.vi.fn().mockReturnThis(),
      single: vitest_1.vi.fn().mockReturnThis(),
      maybeSingle: vitest_1.vi.fn().mockReturnThis(),
    },
  };
});
vitest_1.vi.mock("@/utils/users/fetchUsers", function () {
  return {
    getUserProfileByEmail: vitest_1.vi.fn(),
  };
});
vitest_1.vi.mock("@/utils/company/test", function () {
  return __assign(
    __assign({}, vitest_1.vi.importActual("@/utils/company/test")),
    { getTestCompany: vitest_1.vi.fn() },
  );
});
// Reset mocks before each test
(0, vitest_1.beforeEach)(function () {
  vitest_1.vi.clearAllMocks();
});
(0, vitest_1.describe)("runTestCompanySetup error handling", function () {
  (0, vitest_1.it)("should handle profile update error", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var mockUser, mockNewCompany, mockUpdateFn, mockEqFn, result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            mockUser = {
              id: "user-123",
              email: "test@example.com",
              name: "Test User",
              company_id: "company-old",
              role: "user",
              created_at: "2023-01-01T00:00:00Z",
            };
            mockNewCompany = {
              id: "new-company-123",
              name: "Test Company - test",
              created_at: "2023-01-01",
            };
            // Mock user exists
            vitest_1.vi
              .mocked(fetchUsers_1.getUserProfileByEmail)
              .mockResolvedValue(mockUser);
            // Mock no existing company
            vitest_1.vi.mocked(test_1.getTestCompany).mockResolvedValue({
              success: true,
              data: null,
              message: "No test company found",
            });
            // Mock successful company creation
            vitest_1.vi.mocked(test_1.createTestCompany).mockResolvedValue({
              success: true,
              data: mockNewCompany,
              message:
                'Test company "Test Company - test" created successfully',
            });
            mockUpdateFn = vitest_1.vi.fn().mockReturnThis();
            mockEqFn = vitest_1.vi.fn().mockResolvedValue({
              error: {
                message: "Profile update failed",
                code: "PROFILE_UPDATE_ERROR",
              },
            });
            vitest_1.vi
              .mocked(client_1.supabase.from)
              .mockImplementation(function (table) {
                if (table === "profiles") {
                  return {
                    update: mockUpdateFn,
                    eq: mockEqFn,
                  };
                }
                return {
                  select: vitest_1.vi.fn().mockReturnThis(),
                  eq: vitest_1.vi.fn().mockReturnThis(),
                  insert: vitest_1.vi.fn().mockReturnThis(),
                  limit: vitest_1.vi.fn().mockReturnThis(),
                  single: vitest_1.vi.fn().mockReturnThis(),
                  maybeSingle: vitest_1.vi.fn().mockReturnThis(),
                };
              });
            return [
              4 /*yield*/,
              (0, test_1.runTestCompanySetup)("test@example.com"),
            ];
          case 1:
            result = _a.sent();
            (0, vitest_1.expect)(result.success).toBe(false);
            (0, vitest_1.expect)(result.message).toContain(
              "Created company but failed to associate with user",
            );
            (0, vitest_1.expect)(result.errorCode).toBe("PROFILE_UPDATE_ERROR");
            return [2 /*return*/];
        }
      });
    });
  });
  (0, vitest_1.it)("should handle unexpected exceptions", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var result;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            vitest_1.vi
              .mocked(fetchUsers_1.getUserProfileByEmail)
              .mockRejectedValue(new Error("Unexpected error"));
            return [
              4 /*yield*/,
              (0, test_1.runTestCompanySetup)("test@example.com"),
            ];
          case 1:
            result = _a.sent();
            (0, vitest_1.expect)(result.success).toBe(false);
            (0, vitest_1.expect)(result.message).toContain(
              "Error in test company setup",
            );
            (0, vitest_1.expect)(result.error).toBe("Unexpected error");
            return [2 /*return*/];
        }
      });
    });
  });
});
