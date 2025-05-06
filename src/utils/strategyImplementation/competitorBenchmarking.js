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
exports.fetchCompetitorBenchmarks = fetchCompetitorBenchmarks;
exports.createCompetitorBenchmark = createCompetitorBenchmark;
exports.updateCompetitorBenchmark = updateCompetitorBenchmark;
exports.deleteCompetitorBenchmark = deleteCompetitorBenchmark;
exports.calculateMarketPosition = calculateMarketPosition;
var supabase_1 = require("@/backend/supabase");
var sonner_1 = require("sonner");
// Fetch all competitor benchmarks for a strategy
function fetchCompetitorBenchmarks(strategyId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("competitor_benchmarks")
              .select("*")
              .eq("strategyId", strategyId)
              .order("marketShare", { ascending: false }),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw error;
          }
          return [2 /*return*/, data || []];
        case 2:
          error_1 = _b.sent();
          console.error(
            "Error fetching competitor benchmarks:",
            error_1.message,
          );
          return [2 /*return*/, []];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Create a new competitor benchmark
function createCompetitorBenchmark(benchmark) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_2;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("competitor_benchmarks")
              .insert([
                __assign(__assign({}, benchmark), {
                  created_at: new Date().toISOString(),
                }),
              ])
              .select()
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw error;
          }
          sonner_1.toast.success("Competitor benchmark added successfully");
          return [2 /*return*/, data];
        case 2:
          error_2 = _b.sent();
          sonner_1.toast.error(
            "Failed to add competitor benchmark: ".concat(error_2.message),
          );
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Update a competitor benchmark
function updateCompetitorBenchmark(id, updates) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_3;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("competitor_benchmarks")
              .update(updates)
              .eq("id", id),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw error;
          }
          sonner_1.toast.success("Competitor benchmark updated successfully");
          return [2 /*return*/, true];
        case 2:
          error_3 = _a.sent();
          sonner_1.toast.error(
            "Failed to update competitor benchmark: ".concat(error_3.message),
          );
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Delete a competitor benchmark
function deleteCompetitorBenchmark(id) {
  return __awaiter(this, void 0, void 0, function () {
    var error, error_4;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("competitor_benchmarks")
              .delete()
              .eq("id", id),
          ];
        case 1:
          error = _a.sent().error;
          if (error) {
            throw error;
          }
          sonner_1.toast.success("Competitor benchmark deleted successfully");
          return [2 /*return*/, true];
        case 2:
          error_4 = _a.sent();
          sonner_1.toast.error(
            "Failed to delete competitor benchmark: ".concat(error_4.message),
          );
          return [2 /*return*/, false];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Calculate average market position relative to competitors
function calculateMarketPosition(benchmarks) {
  if (benchmarks.length === 0) {
    return {
      averageStrength: 0,
      averageWeakness: 0,
      relativeMarketShare: 0,
      competitiveAdvantage: "Moderate",
    };
  }
  var averageStrength =
    benchmarks.reduce(function (sum, b) {
      return sum + b.strengthScore;
    }, 0) / benchmarks.length;
  var averageWeakness =
    benchmarks.reduce(function (sum, b) {
      return sum + b.weaknessScore;
    }, 0) / benchmarks.length;
  // Calculate total market share including your company
  var totalMarketShare = benchmarks.reduce(function (sum, b) {
    return sum + b.marketShare;
  }, 0);
  // Assume your company has the remaining market share (this is simplified)
  var yourMarketShare = Math.max(0, 100 - totalMarketShare);
  // Calculate relative market share (your share divided by largest competitor)
  var largestCompetitorShare = Math.max.apply(
    Math,
    benchmarks.map(function (b) {
      return b.marketShare;
    }),
  );
  var relativeMarketShare = yourMarketShare / largestCompetitorShare;
  // Determine competitive advantage
  var competitiveAdvantage;
  if (averageStrength > 7 && relativeMarketShare > 1) {
    competitiveAdvantage = "Strong";
  } else if (averageStrength < 4 || relativeMarketShare < 0.5) {
    competitiveAdvantage = "Weak";
  } else {
    competitiveAdvantage = "Moderate";
  }
  return {
    averageStrength: averageStrength,
    averageWeakness: averageWeakness,
    relativeMarketShare: relativeMarketShare,
    competitiveAdvantage: competitiveAdvantage,
  };
}
