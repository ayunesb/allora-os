import { jsx as _jsx } from "react/jsx-runtime";
import { Brain, TrendingUp, Activity, Calendar } from "lucide-react";
import StatsCard from "@/components/analytics/StatsCard";
const AnalyticsInsightCards = ({ insights }) => {
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6", children: insights.map((insight, index) => (_jsx(StatsCard, { title: insight.title, value: insight.value, description: insight.description, icon: insight.title === "Behavioral Pattern"
                ? Brain
                : insight.title === "Risk Appetite"
                    ? TrendingUp
                    : insight.title === "Learning Progress"
                        ? Activity
                        : Calendar }, index))) }));
};
export default AnalyticsInsightCards;
