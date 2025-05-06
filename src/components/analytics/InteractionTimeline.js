import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Activity } from "lucide-react";
import AnalyticsChart from "@/components/analytics/AnalyticsChart";
const InteractionTimeline = ({ data }) => {
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Activity, { className: "mr-2 h-5 w-5 text-primary" }), "Interaction Timeline"] }), _jsx(CardDescription, { children: "Pattern of engagement with AI executives over time" })] }), _jsx(CardContent, { children: _jsx("div", { className: "h-80", children: _jsx(AnalyticsChart, { title: "", description: "", chartType: "area", data: data, dataKeys: ["value"], colors: ["#8B5CF6"], xAxisDataKey: "date" }) }) })] }));
};
export default InteractionTimeline;
