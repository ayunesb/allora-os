"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var AnalyticsChart_1 = require("@/components/analytics/AnalyticsChart");
var InteractionTimeline = function (_a) {
  var data = _a.data;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-3",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
                className: "mr-2 h-5 w-5 text-primary",
              }),
              "Interaction Timeline",
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "Pattern of engagement with AI executives over time",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "h-80",
          children: (0, jsx_runtime_1.jsx)(AnalyticsChart_1.default, {
            title: "",
            description: "",
            chartType: "area",
            data: data,
            dataKeys: ["value"],
            colors: ["#8B5CF6"],
            xAxisDataKey: "date",
          }),
        }),
      }),
    ],
  });
};
exports.default = InteractionTimeline;
