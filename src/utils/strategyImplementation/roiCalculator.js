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
exports.calculateROI = calculateROI;
exports.fetchStrategyROI = fetchStrategyROI;
exports.saveStrategyROI = saveStrategyROI;
exports.calculatePaybackPeriod = calculatePaybackPeriod;
exports.formatCurrency = formatCurrency;
var supabase_1 = require("@/backend/supabase");
var sonner_1 = require("sonner");
// Calculate ROI based on provided inputs
function calculateROI(
  initialInvestment,
  projectedRevenue,
  timeframeMonths,
  annualCosts,
) {
  // Convert annual costs to costs over the timeframe
  var timeframeCosts = (annualCosts / 12) * timeframeMonths;
  // Calculate profit over timeframe
  var profit = projectedRevenue - timeframeCosts - initialInvestment;
  // Calculate ROI as a percentage
  var roi = (profit / initialInvestment) * 100;
  return Math.round(roi * 100) / 100; // Round to 2 decimal places
}
// Fetch ROI data for a strategy
function fetchStrategyROI(strategyId) {
  return __awaiter(this, void 0, void 0, function () {
    var _a, data, error, error_1;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("strategy_roi")
              .select("*")
              .eq("strategyId", strategyId)
              .single(),
          ];
        case 1:
          (_a = _b.sent()), (data = _a.data), (error = _a.error);
          if (error && error.code !== "PGRST116") {
            throw error;
          }
          return [2 /*return*/, data];
        case 2:
          error_1 = _b.sent();
          console.error("Error fetching strategy ROI:", error_1.message);
          return [2 /*return*/, null];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
// Save or update ROI data for a strategy
function saveStrategyROI(roiData) {
  return __awaiter(this, void 0, void 0, function () {
    var existing, _a, data, error, _b, data, error, error_2;
    return __generator(this, function (_c) {
      switch (_c.label) {
        case 0:
          _c.trys.push([0, 6, , 7]);
          return [4 /*yield*/, fetchStrategyROI(roiData.strategyId)];
        case 1:
          existing = _c.sent();
          if (!existing) return [3 /*break*/, 3];
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("strategy_roi")
              .update(
                __assign(__assign({}, roiData), {
                  lastUpdated: new Date().toISOString(),
                }),
              )
              .eq("id", existing.id)
              .select()
              .single(),
          ];
        case 2:
          (_a = _c.sent()), (data = _a.data), (error = _a.error);
          if (error) {
            throw error;
          }
          sonner_1.toast.success("ROI data updated successfully");
          return [2 /*return*/, data];
        case 3:
          return [
            4 /*yield*/,
            supabase_1.supabase
              .from("strategy_roi")
              .insert([
                __assign(__assign({}, roiData), {
                  lastUpdated: new Date().toISOString(),
                }),
              ])
              .select()
              .single(),
          ];
        case 4:
          (_b = _c.sent()), (data = _b.data), (error = _b.error);
          if (error) {
            throw error;
          }
          sonner_1.toast.success("ROI data saved successfully");
          return [2 /*return*/, data];
        case 5:
          return [3 /*break*/, 7];
        case 6:
          error_2 = _c.sent();
          sonner_1.toast.error(
            "Failed to save ROI data: ".concat(error_2.message),
          );
          return [2 /*return*/, null];
        case 7:
          return [2 /*return*/];
      }
    });
  });
}
// Calculate the payback period (in months) for an investment
function calculatePaybackPeriod(
  initialInvestment,
  monthlyRevenue,
  monthlyCosts,
) {
  var monthlyProfit = monthlyRevenue - monthlyCosts;
  if (monthlyProfit <= 0) {
    return Infinity; // Will never break even
  }
  return initialInvestment / monthlyProfit;
}
// Format currency for display
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
