"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var recharts_1 = require("recharts");
var StrategyAdoption = function () {
  // Sample data - would come from an API in a real application
  var strategyData = [
    {
      name: "High Risk",
      value: 20,
      color: "var(--risk-high-DEFAULT, #ea384c)",
    },
    {
      name: "Medium Risk",
      value: 45,
      color: "var(--risk-medium-DEFAULT, #f97316)",
    },
    { name: "Low Risk", value: 35, color: "var(--risk-low-DEFAULT, #0ea5e9)" },
  ];
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "h-full",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          children: "Strategy Adoption",
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "h-[300px]",
          children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
            width: "100%",
            height: "100%",
            children: (0, jsx_runtime_1.jsxs)(recharts_1.PieChart, {
              children: [
                (0, jsx_runtime_1.jsx)(recharts_1.Pie, {
                  data: strategyData,
                  cx: "50%",
                  cy: "50%",
                  labelLine: false,
                  label: function (_a) {
                    var name = _a.name,
                      percent = _a.percent;
                    return ""
                      .concat(name, ": ")
                      .concat((percent * 100).toFixed(0), "%");
                  },
                  outerRadius: 80,
                  fill: "#8884d8",
                  dataKey: "value",
                  children: strategyData.map(function (entry, index) {
                    return (0, jsx_runtime_1.jsx)(
                      recharts_1.Cell,
                      { fill: entry.color },
                      "cell-".concat(index),
                    );
                  }),
                }),
                (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
                (0, jsx_runtime_1.jsx)(recharts_1.Legend, {}),
              ],
            }),
          }),
        }),
      }),
    ],
  });
};
exports.default = StrategyAdoption;
