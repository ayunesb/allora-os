import React from "react";
import { Brain, TrendingUp, Activity, Calendar } from "lucide-react";
import StatsCard from "@/components/analytics/StatsCard";
const AnalyticsInsightCards = ({ insights }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {insights.map((insight, index) => (
        <StatsCard
          key={index}
          title={insight.title}
          value={insight.value}
          description={insight.description}
          icon={
            insight.title === "Behavioral Pattern"
              ? Brain
              : insight.title === "Risk Appetite"
                ? TrendingUp
                : insight.title === "Learning Progress"
                  ? Activity
                  : Calendar
          }
        />
      ))}
    </div>
  );
};
export default AnalyticsInsightCards;
