"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var AnalyticsChart_1 = require("@/components/analytics/AnalyticsChart");
var RiskAppetiteDistribution = function (_a) {
  var data = _a.data;
  // Colors for chart - now using our risk color system
  var COLORS = [
    "var(--risk-low-DEFAULT, #0ea5e9)",
    "var(--risk-medium-DEFAULT, #f97316)",
    "var(--risk-high-DEFAULT, #ea384c)",
  ];
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-3",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
                className: "mr-2 h-5 w-5 text-primary",
              }),
              "Risk Appetite Distribution",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Analysis of risk tolerance across different business areas",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "h-80",
          children: (0, jsx_runtime_1.jsx)(AnalyticsChart_1.default, {
            title: "",
            description: "",
            chartType: "radialBar",
            data: data,
            dataKeys: ["value"],
            colors: COLORS,
            nameKey: "name",
          }),
        }),
      }),
    ],
  });
};
exports.default = RiskAppetiteDistribution;
