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
exports.generateStrategy = generateStrategy;
exports.saveStrategy = saveStrategy;
var client_1 = require("@/integrations/supabase/client");
var uuid_1 = require("uuid");
/**
 * Generate a business strategy from an executive decision
 */
function generateStrategy(decision) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            client_1.supabase.functions.invoke("generate-strategy", {
              body: {
                decision: decision,
                format: "json",
              },
            }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Error generating strategy:", error);
            throw new Error(
              "Strategy generation error: ".concat(error.message),
            );
          }
          // If we don't have proper data, return a fallback strategy
          if (!data || !data.strategy) {
            return [2 /*return*/, createFallbackStrategy(decision)];
          }
          // Format and return the strategy
          return [
            2 /*return*/,
            {
              id: (0, uuid_1.v4)(),
              title:
                data.strategy.title || "Strategy for: ".concat(decision.task),
              description: data.strategy.description || decision.reasoning,
              implementation_steps: data.strategy.implementation_steps || [
                "Analyze current market position",
                "Develop detailed action plan",
                "Allocate necessary resources",
                "Execute and monitor progress",
              ],
              expected_outcomes: data.strategy.expected_outcomes || [
                "Improved market position",
                "Increased revenue",
                "Enhanced customer satisfaction",
              ],
              timeline: data.strategy.timeline || "3-6 months",
              resources_required:
                data.strategy.resources_required ||
                "To be determined based on scope",
              risk_level: decision.riskAssessment.includes("high")
                ? "High"
                : decision.riskAssessment.includes("low")
                  ? "Low"
                  : "Medium",
              created_at: new Date().toISOString(),
              decision_id: decision.id,
            },
          ];
        case 2:
          error_1 = _b.sent();
          console.error("Failed to generate strategy:", error_1);
          return [2 /*return*/, createFallbackStrategy(decision)];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
/**
 * Create a fallback strategy when AI generation fails
 */
function createFallbackStrategy(decision) {
  return {
    id: (0, uuid_1.v4)(),
    title: "Strategy for: ".concat(decision.task),
    description: decision.reasoning || "Strategy based on executive decision",
    implementation_steps: [
      "Analyze current market position",
      "Develop detailed action plan",
      "Allocate necessary resources",
      "Execute and monitor progress",
    ],
    expected_outcomes: [
      "Improved market position",
      "Increased revenue",
      "Enhanced customer satisfaction",
    ],
    timeline: "3-6 months",
    resources_required: "To be determined based on scope",
    risk_level: decision.riskAssessment.includes("high")
      ? "High"
      : decision.riskAssessment.includes("low")
        ? "Low"
        : "Medium",
    created_at: new Date().toISOString(),
    decision_id: decision.id,
  };
}
/**
 * Save a strategy to the database
 */
function saveStrategy(strategy, userId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          return [
            4 /*yield*/,
            client_1.supabase
              .from("strategies")
              .insert([__assign(__assign({}, strategy), { user_id: userId })]),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            console.error("Failed to save strategy:", error);
            throw new Error("Failed to save strategy: ".concat(error.message));
          }
          return [2 /*return*/, data];
      }
    });
  });
}
