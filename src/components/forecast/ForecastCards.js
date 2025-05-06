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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ForecastCards;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var progress_1 = require("@/components/ui/progress");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
function ForecastCards(_a) {
  var _b = _a.forecasts,
    forecasts = _b === void 0 ? [] : _b;
  // If no forecasts provided, use these demo forecasts
  var demoForecasts = [
    {
      title: "Revenue Forecast",
      subtitle: "Monthly recurring revenue",
      currentValue: 12600,
      targetValue: 15000,
      growth: 12.5,
      variant: "default",
    },
    {
      title: "Customer Acquisition",
      subtitle: "New customers this quarter",
      currentValue: 42,
      targetValue: 50,
      growth: 8.3,
      variant: "success",
    },
    {
      title: "Churn Rate",
      subtitle: "Monthly customer churn",
      currentValue: 4.2,
      targetValue: 3.0,
      growth: -2.1,
      variant: "danger", // Changed from 'destructive' to 'danger'
    },
    {
      title: "Average Deal Size",
      subtitle: "Average revenue per account",
      currentValue: 1840,
      targetValue: 2000,
      growth: 5.2,
      variant: "warning",
    },
  ];
  var items = forecasts.length > 0 ? forecasts : demoForecasts;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4",
    children: items.map(function (item, index) {
      return (0, jsx_runtime_1.jsx)(ForecastCard, __assign({}, item), index);
    }),
  });
}
function ForecastCard(_a) {
  var title = _a.title,
    subtitle = _a.subtitle,
    currentValue = _a.currentValue,
    targetValue = _a.targetValue,
    growth = _a.growth,
    _b = _a.variant,
    variant = _b === void 0 ? "default" : _b;
  var progress = Math.min(Math.round((currentValue / targetValue) * 100), 100);
  var isPositiveGrowth = growth >= 0;
  // Format currency values
  var formatCurrency = function (value) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };
  // Format value based on title (different formats for different metrics)
  var formatValue = function (value) {
    if (
      title.toLowerCase().includes("revenue") ||
      title.toLowerCase().includes("deal size") ||
      title.toLowerCase().includes("arpu")
    ) {
      return formatCurrency(value);
    } else if (
      title.toLowerCase().includes("churn") ||
      title.toLowerCase().includes("rate")
    ) {
      return "".concat(value, "%");
    } else {
      return value.toLocaleString();
    }
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-2",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-sm font-medium",
            children: title,
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: subtitle,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center justify-between",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-2xl font-bold",
                    children: formatValue(currentValue),
                  }),
                  (0, jsx_runtime_1.jsxs)("p", {
                    className: "text-xs text-muted-foreground",
                    children: ["Target: ", formatValue(targetValue)],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: (0, utils_1.cn)(
                  "flex items-center gap-1 text-sm",
                  isPositiveGrowth ? "text-green-600" : "text-red-600",
                ),
                children: [
                  isPositiveGrowth
                    ? (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpRight, {
                        className: "h-4 w-4",
                      })
                    : (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowDownRight, {
                        className: "h-4 w-4",
                      }),
                  (0, jsx_runtime_1.jsxs)("span", {
                    children: [Math.abs(growth), "%"],
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(progress_1.Progress, {
            value: progress,
            className: "h-2 mt-4",
            variant: variant,
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex items-center justify-between mt-2",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center text-xs text-muted-foreground",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
                  className: "h-3 w-3 mr-1",
                }),
                (0, jsx_runtime_1.jsxs)("span", {
                  children: [progress, "% of target"],
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
