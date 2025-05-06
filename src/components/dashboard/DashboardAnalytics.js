import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, } from "recharts";
import { Download, TrendingUp, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
export function DashboardAnalytics({ data, isLoading = false }) {
    const [timeRange, setTimeRange] = useState("7d");
    const [chartType, setChartType] = useState("bar");
    // Sample data - in a real app, this would come from props or an API
    const revenueData = [
        { name: "Jan", value: 4000 },
        { name: "Feb", value: 3000 },
        { name: "Mar", value: 5000 },
        { name: "Apr", value: 7000 },
        { name: "May", value: 6000 },
        { name: "Jun", value: 9000 },
    ];
    const performanceData = [
        { name: "Ads", value: 400 },
        { name: "Social", value: 300 },
        { name: "Email", value: 300 },
        { name: "Direct", value: 200 },
    ];
    const conversionData = [
        { name: "Mon", visits: 4000, conversions: 240 },
        { name: "Tue", visits: 3000, conversions: 198 },
        { name: "Wed", visits: 2000, conversions: 980 },
        { name: "Thu", visits: 2780, conversions: 390 },
        { name: "Fri", visits: 1890, conversions: 480 },
        { name: "Sat", visits: 2390, conversions: 380 },
        { name: "Sun", visits: 3490, conversions: 430 },
    ];
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const handleExportData = (format) => {
        // In a real app, this would generate and download the file
        toast.success(`Analytics data exported as ${format.toUpperCase()}`);
    };
    const handleFilterChange = (value) => {
        setTimeRange(value);
        toast.info(`Data filtered to show last ${value}`);
    };
    return (_jsxs(Card, { className: "shadow-md", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(TrendingUp, { className: "mr-2 h-5 w-5" }), "Business Performance Analytics"] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Select, { value: timeRange, onValueChange: handleFilterChange, children: [_jsx(SelectTrigger, { className: "w-[120px]", children: _jsx(SelectValue, { placeholder: "Time Range" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "7d", children: "Last 7 days" }), _jsx(SelectItem, { value: "30d", children: "Last 30 days" }), _jsx(SelectItem, { value: "90d", children: "Last 90 days" }), _jsx(SelectItem, { value: "1y", children: "Last year" })] })] }), _jsx("div", { className: "flex gap-1", children: _jsx(Button, { variant: "outline", size: "icon", onClick: () => handleExportData("csv"), title: "Export as CSV", children: _jsx(Download, { className: "h-4 w-4" }) }) })] })] }) }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "performance", className: "w-full", children: [_jsxs(TabsList, { className: "mb-4 grid grid-cols-3 w-full", children: [_jsxs(TabsTrigger, { value: "performance", className: "flex items-center justify-center", children: [_jsx(BarChart3, { className: "mr-2 h-4 w-4" }), "Performance"] }), _jsxs(TabsTrigger, { value: "channels", className: "flex items-center justify-center", children: [_jsx(PieChartIcon, { className: "mr-2 h-4 w-4" }), "Channels"] }), _jsxs(TabsTrigger, { value: "conversions", className: "flex items-center justify-center", children: [_jsx(LineChartIcon, { className: "mr-2 h-4 w-4" }), "Conversions"] })] }), _jsx(TabsContent, { value: "performance", children: _jsx("div", { className: "h-80", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: revenueData, margin: {
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, { formatter: (value) => [`$${value}`, "Revenue"] }), _jsx(Legend, {}), _jsx(Bar, { dataKey: "value", name: "Revenue", fill: "#8884d8", activeBar: { fill: "#6557ff", stroke: "#6557ff" } })] }) }) }) }), _jsx(TabsContent, { value: "channels", children: _jsx("div", { className: "h-80", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: performanceData, cx: "50%", cy: "50%", labelLine: false, label: ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`, outerRadius: 100, fill: "#8884d8", dataKey: "value", children: performanceData.map((entry, index) => (_jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))) }), _jsx(Tooltip, { formatter: (value) => [`${value}`, "Value"] }), _jsx(Legend, {})] }) }) }) }), _jsx(TabsContent, { value: "conversions", children: _jsx("div", { className: "h-80", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(AreaChart, { data: conversionData, margin: {
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), _jsx(Area, { type: "monotone", dataKey: "visits", stackId: "1", stroke: "#8884d8", fill: "#8884d8", name: "Visits" }), _jsx(Area, { type: "monotone", dataKey: "conversions", stackId: "2", stroke: "#82ca9d", fill: "#82ca9d", name: "Conversions" })] }) }) }) })] }) })] }));
}
