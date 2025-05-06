"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var recharts_1 = require("recharts");
var UserActivityGraph = function () {
  // Sample data - would typically come from an API
  var activityData = [
    { day: "Monday", count: 12 },
    { day: "Tuesday", count: 19 },
    { day: "Wednesday", count: 15 },
    { day: "Thursday", count: 25 },
    { day: "Friday", count: 20 },
    { day: "Saturday", count: 8 },
    { day: "Sunday", count: 5 },
  ];
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "h-full",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          children: "Weekly User Activity",
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "h-[300px]",
          children: (0, jsx_runtime_1.jsx)(recharts_1.ResponsiveContainer, {
            width: "100%",
            height: "100%",
            children: (0, jsx_runtime_1.jsxs)(recharts_1.BarChart, {
              data: activityData,
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
                (0, jsx_runtime_1.jsx)(recharts_1.XAxis, { dataKey: "day" }),
                (0, jsx_runtime_1.jsx)(recharts_1.YAxis, {}),
                (0, jsx_runtime_1.jsx)(recharts_1.Tooltip, {}),
                (0, jsx_runtime_1.jsx)(recharts_1.Bar, {
                  dataKey: "count",
                  fill: "#8884d8",
                }),
              ],
            }),
          }),
        }),
      }),
    ],
  });
};
exports.default = UserActivityGraph;
