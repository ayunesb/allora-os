import React from "react";
import AnalyticsChart from "@/components/analytics/AnalyticsChart";
const OverviewTabContent = ({ timelineData, activityTypeData }) => {
  // Colors for charts
  const COLORS = ["#8B5CF6", "#EC4899", "#F97316", "#10B981"];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <AnalyticsChart
        title="Activity Over Time"
        description="Your platform usage in the last 30 days"
        chartType="line"
        data={timelineData}
        dataKeys={["count"]}
        colors={["#8B5CF6"]}
        xAxisDataKey="date"
      />

      <AnalyticsChart
        title="Activity Type Distribution"
        description="Breakdown of your different interactions"
        chartType="pie"
        data={activityTypeData}
        dataKeys={["value"]}
        colors={COLORS}
        nameKey="name"
      />
    </div>
  );
};
export default OverviewTabContent;
