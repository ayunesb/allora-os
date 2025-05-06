import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Target } from "lucide-react";
import RiskAppetiteDistribution from "./RiskAppetiteDistribution";
import InteractionTimeline from "./InteractionTimeline";
const BehaviorTabContent = ({ insights, riskData, activityData }) => {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsx(RiskAppetiteDistribution, { data: riskData }), _jsx(InteractionTimeline, { data: activityData })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Target, { className: "mr-2 h-5 w-5 text-primary" }), "Learning Progress"] }), _jsx(CardDescription, { children: "How the AI system is adapting to your preferences" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: insights.length > 0 ? (_jsx("ul", { className: "space-y-2", children: insights.map((insight, index) => (_jsxs("li", { className: "flex justify-between p-2 border-b border-border/30", children: [_jsx("span", { className: "font-medium", children: insight.title }), _jsx("span", { className: "text-primary", children: insight.value })] }, index))) })) : (_jsx("p", { className: "text-muted-foreground text-center py-4", children: "Continue using the platform to generate learning insights" })) }) })] })] }));
};
export default BehaviorTabContent;
