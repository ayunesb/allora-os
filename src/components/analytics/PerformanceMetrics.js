"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var recharts_1 = require("recharts");
var skeleton_1 = require("@/components/ui/skeleton");
var PerformanceMetrics = function (_a) {
  var _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b;
  // Sample data - in a real application this would come from an API
  var performanceData = [
    { date: "2025-04-01", strategies: 2, leads: 5, campaigns: 1 },
    { date: "2025-04-02", strategies: 3, leads: 8, campaigns: 1 },
    { date: "2025-04-03", strategies: 4, leads: 12, campaigns: 2 },
    { date: "2025-04-04", strategies: 5, leads: 15, campaigns: 2 },
    { date: "2025-04-05", strategies: 5, leads: 18, campaigns: 3 },
    { date: "2025-04-06", strategies: 7, leads: 22, campaigns: 3 },
    { date: "2025-04-07", strategies: 8, leads: 25, campaigns: 4 },
  ];
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-8 w-[250px]",
          }),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
            className: "h-[300px] w-full",
          }),
        }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          children: "Performance Overview",
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "h-[300px]",
          children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
            width: "100%",
            height: "100%",
            children: (0, jsx_runtime_1.jsxs)(recharts_1.LineChart, {
              data: performanceData,
              margin: {
                top: 20,
                right: 20,
                left: 0,
                bottom: 0,
              },
              children: [
                (0, jsx_runtime_1.jsx)(recharts_1.CartesianGrid, {
                  strokeDasharray: "3 3",
                }),
                (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "date" }),
                (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}),
                (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
                (0, jsx_runtime_1.jsx)(recharts_1.Line, {
                  type: "monotone",
                  dataKey: "strategies",
                  stroke: "#8884d8",
                  activeDot: { r: 8 },
                }),
                (0, jsx_runtime_1.jsx)(recharts_1.Line, {
                  type: "monotone",
                  dataKey: "leads",
                  stroke: "#82ca9d",
                }),
                (0, jsx_runtime_1.jsx)(recharts_1.Line, {
                  type: "monotone",
                  dataKey: "campaigns",
                  stroke: "#ffc658",
                }),
              ],
            }),
          }),
        }),
      }),
    ],
  });
};
exports.default = PerformanceMetrics;
