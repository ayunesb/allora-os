import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import AnalyticsChart from "@/components/analytics/AnalyticsChart";
const RiskAppetiteDistribution = ({ data }) => {
    // Colors for chart - now using our risk color system
    const COLORS = [
        "var(--risk-low-DEFAULT, #0ea5e9)",
        "var(--risk-medium-DEFAULT, #f97316)",
        "var(--risk-high-DEFAULT, #ea384c)",
    ];
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(TrendingUp, { className: "mr-2 h-5 w-5 text-primary" }), "Risk Appetite Distribution"] }), _jsx(CardDescription, { children: "Analysis of risk tolerance across different business areas" })] }), _jsx(CardContent, { children: _jsx("div", { className: "h-80", children: _jsx(AnalyticsChart, { title: "", description: "", chartType: "radialBar", data: data, dataKeys: ["value"], colors: COLORS, nameKey: "name" }) }) })] }));
};
export default RiskAppetiteDistribution;
