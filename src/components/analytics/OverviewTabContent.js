"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var AnalyticsChart_1 = require("@/components/analytics/AnalyticsChart");
var OverviewTabContent = function (_a) {
  var timelineData = _a.timelineData,
    activityTypeData = _a.activityTypeData;
  // Colors for charts
  var COLORS = ["#8B5CF6", "#EC4899", "#F97316", "#10B981"];
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
    children: [
      (0, jsx_runtime_1.jsx)(AnalyticsChart_1.default, {
        title: "Activity Over Time",
        description: "Your platform usage in the last 30 days",
        chartType: "line",
        data: timelineData,
        dataKeys: ["count"],
        colors: ["#8B5CF6"],
        xAxisDataKey: "date",
      }),
      (0, jsx_runtime_1.jsx)(AnalyticsChart_1.default, {
        title: "Activity Type Distribution",
        description: "Breakdown of your different interactions",
        chartType: "pie",
        data: activityTypeData,
        dataKeys: ["value"],
        colors: COLORS,
        nameKey: "name",
      }),
    ],
  });
};
exports.default = OverviewTabContent;
