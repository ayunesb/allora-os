"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var StatsCard_1 = require("@/components/analytics/StatsCard");
var AnalyticsInsightCards = function (_a) {
  var insights = _a.insights;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6",
    children: insights.map(function (insight, index) {
      return (0, jsx_runtime_1.jsx)(
        StatsCard_1.default,
        {
          title: insight.title,
          value: insight.value,
          description: insight.description,
          icon:
            insight.title === "Behavioral Pattern"
              ? lucide_react_1.Brain
              : insight.title === "Risk Appetite"
                ? lucide_react_1.TrendingUp
                : insight.title === "Learning Progress"
                  ? lucide_react_1.Activity
                  : lucide_react_1.Calendar,
        },
        index,
      );
    }),
  });
};
exports.default = AnalyticsInsightCards;
