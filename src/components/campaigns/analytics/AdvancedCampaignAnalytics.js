import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell, } from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
const safeNumber = (value) => {
    return typeof value === "number" ? value : 0;
};
const formatAsPercent = (value) => {
    return `${(value * 100).toFixed(2)}%`;
};
const formatAsCurrency = (value) => {
    return `$${value.toFixed(2)}`;
};
export function AdvancedCampaignAnalytics({ campaign }) {
    var _a, _b, _c, _d;
    const [activeTab, setActiveTab] = useState("overview");
    // Safely access nested properties
    const metrics = campaign.metrics || {};
    const dayMetrics = campaign.dayMetrics || [];
    const channelBreakdown = campaign.channelBreakdown || [];
    const deviceBreakdown = campaign.deviceBreakdown || [];
    // Calculate additional metrics with fallbacks
    const impressions = safeNumber(metrics.impressions);
    const clicks = safeNumber(metrics.clicks);
    const conversions = safeNumber(metrics.conversions);
    const cost = safeNumber(metrics.cost);
    const ctr = (_a = metrics.ctr) !== null && _a !== void 0 ? _a : (impressions > 0 ? clicks / impressions : 0);
    const cpc = (_b = metrics.cpc) !== null && _b !== void 0 ? _b : (clicks > 0 ? cost / clicks : 0);
    const conversionRate = (_c = metrics.conversionRate) !== null && _c !== void 0 ? _c : (clicks > 0 ? conversions / clicks : 0);
    const roi = (_d = metrics.roi) !== null && _d !== void 0 ? _d : (cost > 0 ? (conversions * 100 - cost) / cost : 0);
    // Performance overview data for the card metrics
    const performanceData = [
        { name: "Impressions", value: impressions },
        { name: "Clicks", value: clicks },
        { name: "Conversions", value: conversions },
        { name: "CTR", value: ctr, format: formatAsPercent },
        { name: "CPC", value: cpc, format: formatAsCurrency },
        { name: "Conv. Rate", value: conversionRate, format: formatAsPercent },
        { name: "ROI", value: roi, format: (v) => `${(v * 100).toFixed(2)}%` },
    ];
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("h2", { className: "text-2xl font-bold", children: [campaign.name, " Analytics"] }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: performanceData.slice(0, 4).map((item, index) => (_jsx(Card, { children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("h3", { className: "text-sm font-medium text-muted-foreground mb-1", children: item.name }), _jsx("p", { className: "text-2xl font-bold", children: item.format
                                    ? item.format(item.value)
                                    : item.value.toLocaleString() })] }) }, index))) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: performanceData.slice(4).map((item, index) => (_jsx(Card, { children: _jsxs(CardContent, { className: "p-4 text-center", children: [_jsx("h3", { className: "text-sm font-medium text-muted-foreground mb-1", children: item.name }), _jsx("p", { className: "text-2xl font-bold", children: item.format
                                    ? item.format(item.value)
                                    : item.value.toLocaleString() })] }) }, index))) }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance Analysis" }) }), _jsx(CardContent, { children: _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, children: [_jsxs(TabsList, { className: "mb-4", children: [_jsx(TabsTrigger, { value: "overview", children: "Trends" }), _jsx(TabsTrigger, { value: "channels", children: "Channels" }), _jsx(TabsTrigger, { value: "devices", children: "Devices" })] }), _jsx(TabsContent, { value: "overview", children: _jsx("div", { className: "h-80", children: dayMetrics.length > 0 ? (_jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: dayMetrics, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "day" }), _jsx(YAxis, { yAxisId: "left" }), _jsx(YAxis, { yAxisId: "right", orientation: "right" }), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Line, { yAxisId: "left", type: "monotone", dataKey: "impressions", stroke: "#8884d8", name: "Impressions", dot: false }), _jsx(Line, { yAxisId: "right", type: "monotone", dataKey: "clicks", stroke: "#82ca9d", name: "Clicks", dot: false })] }) })) : (_jsx("div", { className: "h-full flex items-center justify-center text-muted-foreground", children: "No daily metrics available" })) }) }), _jsx(TabsContent, { value: "channels", children: _jsx("div", { className: "h-80", children: channelBreakdown.length > 0 ? (_jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [_jsx(ResponsiveContainer, { width: "50%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: channelBreakdown, cx: "50%", cy: "50%", labelLine: false, label: ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`, outerRadius: 80, fill: "#8884d8", dataKey: "value", children: channelBreakdown.map((entry, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, { formatter: (value) => [`${value}`, "Value"] })] }) }), _jsx(ResponsiveContainer, { width: "50%", height: 300, children: _jsxs(BarChart, { data: channelBreakdown, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "channel" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "value", fill: "#8884d8", name: "Value" })] }) })] })) : (_jsx("div", { className: "h-full flex items-center justify-center text-muted-foreground", children: "No channel breakdown available" })) }) }), _jsx(TabsContent, { value: "devices", children: _jsx("div", { className: "h-80", children: deviceBreakdown.length > 0 ? (_jsxs("div", { className: "flex flex-col md:flex-row gap-6", children: [_jsx(ResponsiveContainer, { width: "50%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: deviceBreakdown, cx: "50%", cy: "50%", labelLine: false, label: ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`, outerRadius: 80, fill: "#82ca9d", dataKey: "value", children: deviceBreakdown.map((entry, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, { formatter: (value) => [`${value}`, "Value"] })] }) }), _jsx(ResponsiveContainer, { width: "50%", height: 300, children: _jsxs(BarChart, { data: deviceBreakdown, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "device" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Bar, { dataKey: "value", fill: "#82ca9d", name: "Value" })] }) })] })) : (_jsx("div", { className: "h-full flex items-center justify-center text-muted-foreground", children: "No device breakdown available" })) }) })] }) })] })] }));
}
