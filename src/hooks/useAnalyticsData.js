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
exports.useAnalyticsData = useAnalyticsData;
var react_1 = require("react");
var analyticsService_1 = require("@/backend/analyticsService");
var sonner_1 = require("sonner");
function useAnalyticsData(companyId) {
  var _this = this;
  var _a = (0, react_1.useState)(true),
    isLoading = _a[0],
    setIsLoading = _a[1];
  var _b = (0, react_1.useState)(null),
    analyticsData = _b[0],
    setAnalyticsData = _b[1];
  (0, react_1.useEffect)(
    function () {
      var fetchAnalyticsData = function () {
        return __awaiter(_this, void 0, void 0, function () {
          var baseAnalytics, enhancedData, error_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                if (!companyId) {
                  setIsLoading(false);
                  return [2 /*return*/];
                }
                _a.label = 1;
              case 1:
                _a.trys.push([1, 3, 4, 5]);
                setIsLoading(true);
                return [
                  4 /*yield*/,
                  (0, analyticsService_1.getCompanyDashboardAnalytics)(
                    companyId,
                  ),
                ];
              case 2:
                baseAnalytics = _a.sent();
                enhancedData = generateEnhancedAnalyticsData(baseAnalytics);
                setAnalyticsData(enhancedData);
                return [3 /*break*/, 5];
              case 3:
                error_1 = _a.sent();
                console.error("Error fetching analytics data:", error_1);
                sonner_1.toast.error("Failed to load analytics information");
                return [3 /*break*/, 5];
              case 4:
                setIsLoading(false);
                return [7 /*endfinally*/];
              case 5:
                return [2 /*return*/];
            }
          });
        });
      };
      fetchAnalyticsData();
    },
    [companyId],
  );
  // Generate enhanced analytics data including data for predictive models and advanced visualizations
  var generateEnhancedAnalyticsData = function (baseData) {
    // Start with the base data
    var enhancedData = __assign({}, baseData);
    // Add engagement data (for heatmaps, etc.)
    enhancedData.engagementData = generateEngagementData();
    // Add conversion data (for funnels)
    enhancedData.conversionData = [
      { stage: "Visitors", count: 5800 },
      { stage: "Leads", count: 2200 },
      { stage: "Qualified", count: 1300 },
      { stage: "Proposals", count: 700 },
      { stage: "Negotiations", count: 350 },
      { stage: "Closed", count: 180 },
    ];
    // Add revenue data (for projections)
    enhancedData.revenueData = generateRevenueData();
    // Add predictive models
    enhancedData.predictiveModels = {
      leads: generatePredictiveModel("leads"),
      revenue: generatePredictiveModel("revenue"),
      conversion: generatePredictiveModel("conversion"),
    };
    // Add saved reports
    enhancedData.savedReports = [];
    return enhancedData;
  };
  // Generate sample engagement data
  var generateEngagementData = function () {
    var data = [];
    var now = new Date();
    var types = ["pageview", "action", "interaction", "purchase"];
    // Generate 30 days of data
    for (var i = 30; i >= 1; i--) {
      var date = new Date(now);
      date.setDate(now.getDate() - i);
      var dateStr = date.toISOString().split("T")[0];
      // 3-5 data points per day
      var pointsPerDay = 3 + Math.floor(Math.random() * 3);
      for (var j = 0; j < pointsPerDay; j++) {
        data.push({
          date: dateStr,
          value: 10 + Math.floor(Math.random() * 90),
          type: types[Math.floor(Math.random() * types.length)],
        });
      }
    }
    return data;
  };
  // Generate sample revenue data
  var generateRevenueData = function () {
    var data = [];
    var now = new Date();
    var currentMonth = now.getMonth();
    // Last 12 months of data
    for (var i = 11; i >= 0; i--) {
      var date = new Date(now);
      date.setMonth(currentMonth - i);
      var month = date.toLocaleDateString("en-US", { month: "short" });
      var year = date.getFullYear();
      // Base revenue with some randomness
      var baseRevenue = 10000 + i * 500;
      var revenue = baseRevenue + Math.random() * 2000;
      data.push({
        month: "".concat(month, " ").concat(year),
        revenue: revenue,
        expenses: revenue * (0.6 + Math.random() * 0.1),
        profit: revenue * (0.2 + Math.random() * 0.2),
      });
    }
    return data;
  };
  // Generate sample predictive model data
  var generatePredictiveModel = function (type) {
    var data = [];
    var now = new Date();
    var currentMonth = now.getMonth();
    // Historical: past 6 months
    for (var i = 5; i >= 0; i--) {
      var date = new Date(now);
      date.setMonth(currentMonth - i);
      var month = date.toLocaleDateString("en-US", { month: "short" });
      var year = date.getFullYear();
      var value = void 0;
      switch (type) {
        case "leads":
          value = 100 + i * 10 + Math.random() * 50;
          break;
        case "revenue":
          value = 10000 + i * 1000 + Math.random() * 3000;
          break;
        case "conversion":
          value = 2 + i * 0.2 + Math.random() * 1;
          break;
        default:
          value = 100 + Math.random() * 50;
      }
      data.push({
        period: "".concat(month, " ").concat(year),
        actual: value,
        predicted: value,
        lower: value,
        upper: value,
      });
    }
    // Forecast: next 6 months
    var lastValue = data[data.length - 1].actual;
    for (var i = 1; i <= 6; i++) {
      var date = new Date(now);
      date.setMonth(currentMonth + i);
      var month = date.toLocaleDateString("en-US", { month: "short" });
      var year = date.getFullYear();
      var growth = void 0;
      var range = void 0;
      switch (type) {
        case "leads":
          growth = 1 + (0.05 + Math.random() * 0.03) * i;
          range = 20 * i;
          break;
        case "revenue":
          growth = 1 + (0.03 + Math.random() * 0.02) * i;
          range = 1000 * i;
          break;
        case "conversion":
          growth = 1 + (0.01 + Math.random() * 0.01) * i;
          range = 0.3 * i;
          break;
        default:
          growth = 1 + 0.05 * i;
          range = 20 * i;
      }
      var predicted = lastValue * growth;
      data.push({
        period: "".concat(month, " ").concat(year),
        predicted: predicted,
        lower: predicted - range,
        upper: predicted + range,
      });
    }
    return data;
  };
  return {
    isLoading: isLoading,
    analyticsData: analyticsData,
    refreshAnalytics: function () {
      return __awaiter(_this, void 0, void 0, function () {
        var baseAnalytics, enhancedData, error_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              setIsLoading(true);
              _a.label = 1;
            case 1:
              _a.trys.push([1, 4, 5, 6]);
              if (!companyId) return [3 /*break*/, 3];
              return [
                4 /*yield*/,
                (0, analyticsService_1.getCompanyDashboardAnalytics)(companyId),
              ];
            case 2:
              baseAnalytics = _a.sent();
              enhancedData = generateEnhancedAnalyticsData(baseAnalytics);
              setAnalyticsData(enhancedData);
              sonner_1.toast.success("Analytics data refreshed");
              _a.label = 3;
            case 3:
              return [3 /*break*/, 6];
            case 4:
              error_2 = _a.sent();
              console.error("Error refreshing analytics:", error_2);
              sonner_1.toast.error("Failed to refresh analytics");
              return [3 /*break*/, 6];
            case 5:
              setIsLoading(false);
              return [7 /*endfinally*/];
            case 6:
              return [2 /*return*/];
          }
        });
      });
    },
  };
}
