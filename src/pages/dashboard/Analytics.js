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
exports.default = Analytics;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var tabs_1 = require("@/components/ui/tabs");
var PerformanceOverview_1 = require("@/components/analytics/PerformanceOverview");
var StrategyROIBreakdown_1 = require("@/components/analytics/StrategyROIBreakdown");
var LeadSourceAnalysis_1 = require("@/components/analytics/LeadSourceAnalysis");
var CampaignConversionMetrics_1 = require("@/components/analytics/CampaignConversionMetrics");
var WeeklyPerformanceCard_1 = require("@/components/analytics/WeeklyPerformanceCard");
var AnalyticsHeader_1 = require("@/components/analytics/AnalyticsHeader");
var loadingState1 = { isLoading: true, data: null };
var loadingState2 = { isLoading: false, data: [] };
var loadingState3 = { isLoading: true, data: {} };
var loadingState4 = { isLoading: false, data: { key: "value" } };
var loadingState5 = { isLoading: true, data: [] };
function Analytics() {
  var _this = this;
  var _a = (0, react_1.useState)(false),
    isRefreshing = _a[0],
    setIsRefreshing = _a[1];
  var _b = (0, react_1.useState)([null, null]),
    dateRange = _b[0],
    setDateRange = _b[1];
  var _c = (0, react_1.useState)("overview"),
    activeTab = _c[0],
    setActiveTab = _c[1];
  var handleRefresh = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            setIsRefreshing(true);
            // Simulate data refresh
            return [
              4 /*yield*/,
              new Promise(function (resolve) {
                return setTimeout(resolve, 1500);
              }),
            ];
          case 1:
            // Simulate data refresh
            _a.sent();
            setIsRefreshing(false);
            return [2 /*return*/];
        }
      });
    });
  };
  var handleDateRangeChange = function (newRange) {
    setDateRange(newRange);
    // Fetch new data based on date range
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto p-4 space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)(AnalyticsHeader_1.default, {
        isRefreshing: isRefreshing,
        onRefresh: handleRefresh,
        dateRange: dateRange,
        onDateRangeChange: handleDateRangeChange,
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "overview",
        onValueChange: setActiveTab,
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "grid grid-cols-4 w-full max-w-lg",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "overview",
                children: "Overview",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "campaigns",
                children: "Campaigns",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "strategies",
                children: "Strategies",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "leads",
                children: "Leads",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
            value: "overview",
            className: "pt-4 space-y-6",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [
                  (0, jsx_runtime_1.jsx)(PerformanceOverview_1.default, {
                    isLoading: isRefreshing,
                  }),
                  (0, jsx_runtime_1.jsx)(StrategyROIBreakdown_1.default, {
                    isLoading: isRefreshing,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                children: [
                  (0, jsx_runtime_1.jsx)(LeadSourceAnalysis_1.default, {
                    isLoading: isRefreshing,
                  }),
                  (0, jsx_runtime_1.jsx)(CampaignConversionMetrics_1.default, {
                    isLoading: isRefreshing,
                  }),
                  (0, jsx_runtime_1.jsx)(WeeklyPerformanceCard_1.default, {
                    isLoading: isRefreshing,
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "campaigns",
            className: "pt-4",
            children: (0, jsx_runtime_1.jsx)(
              CampaignConversionMetrics_1.default,
              { isLoading: isRefreshing },
            ),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "strategies",
            className: "pt-4",
            children: (0, jsx_runtime_1.jsx)(StrategyROIBreakdown_1.default, {
              isLoading: isRefreshing,
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "leads",
            className: "pt-4",
            children: (0, jsx_runtime_1.jsx)(LeadSourceAnalysis_1.default, {
              isLoading: isRefreshing,
            }),
          }),
        ],
      }),
    ],
  });
}
