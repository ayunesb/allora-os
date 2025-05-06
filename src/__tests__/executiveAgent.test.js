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
var executiveAgent_1 = require("@/agents/executiveAgent");
// Mock uuid to return a consistent value
vitest_1.vi.mock("uuid", function () {
  return {
    v4: function () {
      return "test-uuid-1234";
    },
  };
});
// Mock the supabase client
vitest_1.vi.mock("@/integrations/supabase/client", function () {
  return {
    supabase: {
      functions: {
        invoke: vitest_1.vi.fn().mockResolvedValue({
          data: {
            content: JSON.stringify({
              options: ["Option A", "Option B"],
              selectedOption: "Option A",
              reasoning: "Because it is better",
              riskAssessment: "Low risk",
              priority: "high",
            }),
          },
          error: null,
        }),
      },
      auth: {
        getUser: vitest_1.vi.fn().mockResolvedValue({
          data: {
            user: {
              id: "test-user-id",
            },
          },
        }),
      },
    },
  };
});
// Mock the saveExecutiveDecision function
vitest_1.vi.mock("./executiveMemory", function () {
  return {
    saveExecutiveDecision: vitest_1.vi.fn().mockResolvedValue(true),
    getExecutiveDecisions: vitest_1.vi.fn().mockResolvedValue([]),
  };
});
(0, vitest_1.describe)("runExecutiveAgent", function () {
  (0, vitest_1.beforeEach)(function () {
    vitest_1.vi.clearAllMocks();
  });
  (0, vitest_1.it)("should return a decision when successful", function () {
    return __awaiter(void 0, void 0, void 0, function () {
      var task, executiveProfile, decision;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            task = "Test task";
            executiveProfile = { name: "Test Executive", role: "CEO" };
            return [
              4 /*yield*/,
              (0, executiveAgent_1.runExecutiveAgent)(task, executiveProfile),
            ];
          case 1:
            decision = _a.sent();
            (0, vitest_1.expect)(decision).toBeDefined();
            (0, vitest_1.expect)(decision.id).toBe("test-uuid-1234");
            (0, vitest_1.expect)(decision.executiveName).toBe("Test Executive");
            (0, vitest_1.expect)(decision.executiveRole).toBe("CEO");
            (0, vitest_1.expect)(decision.task).toBe("Test task");
            (0, vitest_1.expect)(decision.options).toEqual([
              "Option A",
              "Option B",
            ]);
            (0, vitest_1.expect)(decision.selectedOption).toBe("Option A");
            return [2 /*return*/];
        }
      });
    });
  });
});
