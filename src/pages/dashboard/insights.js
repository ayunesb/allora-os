"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InsightsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
var useApiQuery_1 = require("@/hooks/useApiQuery");
var recharts_1 = require("recharts");
function InsightsPage() {
  var _a = (0, react_1.useState)("7d"),
    timeframe = _a[0],
    setTimeframe = _a[1];
  var _b = (0, useApiQuery_1.useApiQuery)("/api/kpi", { timeframe: timeframe }),
    kpiData = _b.data,
    isKpiLoading = _b.isLoading,
    kpiError = _b.error;
  var _c = (0, useApiQuery_1.useApiQuery)("/api/chart", {
      timeframe: timeframe,
    }),
    chartData = _c.data,
    isChartLoading = _c.isLoading,
    chartError = _c.error;
  var handleTimeframeChange = function (newTimeframe) {
    setTimeframe(newTimeframe);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center mb-4",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-2xl font-bold",
            children: "Dashboard Insights",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("button", {
                className: "px-3 py-1 rounded-md ".concat(
                  timeframe === "7d"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700",
                ),
                onClick: function () {
                  return handleTimeframeChange("7d");
                },
                children: "7 Days",
              }),
              (0, jsx_runtime_1.jsx)("button", {
                className: "px-3 py-1 rounded-md ml-2 ".concat(
                  timeframe === "30d"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700",
                ),
                onClick: function () {
                  return handleTimeframeChange("30d");
                },
                children: "30 Days",
              }),
            ],
          }),
        ],
      }),
      kpiError &&
        (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
          variant: "destructive",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
              className: "h-4 w-4",
            }),
            (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
              children: "Failed to load KPI data. Please try again.",
            }),
          ],
        }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
                      className: "mr-2 h-4 w-4",
                    }),
                    " Total Wins",
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: isKpiLoading
                  ? (0, jsx_runtime_1.jsx)("p", { children: "Loading..." })
                  : (0, jsx_runtime_1.jsx)("p", {
                      className: "text-2xl font-bold",
                      children:
                        (kpiData === null || kpiData === void 0
                          ? void 0
                          : kpiData.total_wins) || 0,
                    }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
                      className: "mr-2 h-4 w-4",
                    }),
                    " Total Strategies",
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: isKpiLoading
                  ? (0, jsx_runtime_1.jsx)("p", { children: "Loading..." })
                  : (0, jsx_runtime_1.jsx)("p", {
                      className: "text-2xl font-bold",
                      children:
                        (kpiData === null || kpiData === void 0
                          ? void 0
                          : kpiData.total_strategies) || 0,
                    }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                      className: "mr-2 h-4 w-4",
                    }),
                    " Total Users",
                  ],
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: isKpiLoading
                  ? (0, jsx_runtime_1.jsx)("p", { children: "Loading..." })
                  : (0, jsx_runtime_1.jsx)("p", {
                      className: "text-2xl font-bold",
                      children:
                        (kpiData === null || kpiData === void 0
                          ? void 0
                          : kpiData.total_users) || 0,
                    }),
              }),
            ],
          }),
        ],
      }),
      chartError &&
        (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
          variant: "destructive",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
              className: "h-4 w-4",
            }),
            (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
              children: "Failed to load chart data. Please try again.",
            }),
          ],
        }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Performance Chart",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: isChartLoading
              ? (0, jsx_runtime_1.jsx)("p", { children: "Loading chart..." })
              : (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
                  width: "100%",
                  height: 300,
                  children: (0, jsx_runtime_1.jsxs)(recharts_1.LineChart, {
                    data: chartData,
                    children: [
                      (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
                        strokeDasharray: "3 3",
                      }),
                      (0, jsx_runtime_1.jsx)(recharts_1.XAxis, {
                        dataKey: "name",
                      }),
                      (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}),
                      (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
                      (0, jsx_runtime_1.jsx)(recharts_1.Line, {
                        type: "monotone",
                        dataKey: "value",
                        stroke: "#8884d8",
                        activeDot: { r: 8 },
                      }),
                    ],
                  }),
                }),
          }),
        ],
      }),
    ],
  });
}
