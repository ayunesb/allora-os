"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.KPITracker = KPITracker;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var exportUtils_1 = require("@/utils/exportUtils");
var skeleton_1 = require("@/components/ui/skeleton");
function KPITracker(_a) {
  var metrics = _a.metrics,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b;
  // Group metrics by type
  var metricsByType = {};
  if (!isLoading && metrics.length > 0) {
    metrics.forEach(function (metric) {
      if (!metricsByType[metric.type]) {
        metricsByType[metric.type] = [];
      }
      metricsByType[metric.type].push(metric);
    });
  }
  // Calculate trends for each metric type
  var calculateTrend = function (metrics) {
    if (metrics.length < 2) return { percentage: 0, isPositive: true };
    var sortedMetrics = __spreadArray([], metrics, true).sort(function (a, b) {
      return (
        new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
      );
    });
    var current = sortedMetrics[0].value;
    var previous = sortedMetrics[1].value;
    if (previous === 0) return { percentage: 0, isPositive: true };
    var percentage = ((current - previous) / previous) * 100;
    return {
      percentage: Math.abs(Math.round(percentage * 10) / 10),
      isPositive: percentage >= 0,
    };
  };
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "space-y-4",
      children: [1, 2, 3, 4].map(function (i) {
        return (0, jsx_runtime_1.jsxs)(
          card_1.Card,
          {
            className: "overflow-hidden",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-6 w-1/3 mb-2",
                }),
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                children: [
                  (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                    className: "h-10 w-1/4 mb-4",
                  }),
                  (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                    className: "h-4 w-2/5",
                  }),
                ],
              }),
            ],
          },
          i,
        );
      }),
    });
  }
  if (!metrics.length) {
    return (0, jsx_runtime_1.jsx)(card_1.Card, {
      children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "py-10 text-center",
        children: (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground",
          children:
            "No KPI metrics available. Metrics will appear here as they are recorded.",
        }),
      }),
    });
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-4",
    children: Object.entries(metricsByType).map(function (_a) {
      var type = _a[0],
        typeMetrics = _a[1];
      var latestMetric = typeMetrics[0];
      var trend = calculateTrend(typeMetrics);
      return (0, jsx_runtime_1.jsxs)(
        card_1.Card,
        {
          className: "overflow-hidden",
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              className: "pb-2",
              children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-lg capitalize",
                children: type,
              }),
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-between items-end",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "text-3xl font-bold",
                        children: type.includes("percentage")
                          ? "".concat(latestMetric.value.toFixed(1), "%")
                          : latestMetric.value.toLocaleString(),
                      }),
                      (0, jsx_runtime_1.jsxs)("p", {
                        className: "text-sm text-muted-foreground",
                        children: [
                          "Last updated: ",
                          (0, exportUtils_1.formatDate)(
                            latestMetric.recorded_at,
                          ),
                        ],
                      }),
                    ],
                  }),
                  typeMetrics.length > 1 &&
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "text-sm font-medium flex items-center ".concat(
                          trend.isPositive ? "text-green-500" : "text-red-500",
                        ),
                      children: [
                        trend.isPositive ? "↑" : "↓",
                        " ",
                        trend.percentage,
                        "%",
                      ],
                    }),
                ],
              }),
            }),
          ],
        },
        type,
      );
    }),
  });
}
