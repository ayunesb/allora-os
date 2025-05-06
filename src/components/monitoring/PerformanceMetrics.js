import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { monitoring } from "@/utils/monitoring";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Activity, Server, Database } from "lucide-react";
const PerformanceMetrics = ({ isLoading = false }) => {
    const [cpuUsage, setCpuUsage] = useState(0);
    const [memoryUsage, setMemoryUsage] = useState(0);
    const [apiResponseTime, setApiResponseTime] = useState(0);
    const [selectedTab, setSelectedTab] = useState("gauges");
    const [timingData, setTimingData] = useState([]);
    // Simulate metrics for demo purposes
    useEffect(() => {
        const interval = setInterval(() => {
            // Update CPU usage (40-80%)
            const newCpu = 40 + Math.random() * 40;
            setCpuUsage(newCpu);
            monitoring.setGauge("CPU Usage", newCpu, 0, 100, "%", {
                warning: 70,
                critical: 90,
            });
            // Update memory usage (30-70%)
            const newMemory = 30 + Math.random() * 40;
            setMemoryUsage(newMemory);
            monitoring.setGauge("Memory Usage", newMemory, 0, 100, "%", {
                warning: 80,
                critical: 95,
            });
            // Update API response time (50-500ms)
            const newApiTime = 50 + Math.random() * 450;
            setApiResponseTime(newApiTime);
            monitoring.setGauge("API Response Time", newApiTime, 0, 1000, "ms", {
                warning: 300,
                critical: 800,
            });
            // Simulate page load timing
            monitoring.recordTiming("Page Load", 800 + Math.random() * 1200, "frontend");
            // Update timing data
            setTimingData(monitoring.getTimingMetrics());
        }, 5000);
        // Initial run
        monitoring.startApiTimer("initial-load");
        // Generate some initial data
        monitoring.setGauge("CPU Usage", 45, 0, 100, "%");
        monitoring.setGauge("Memory Usage", 32, 0, 100, "%");
        monitoring.setGauge("API Response Time", 120, 0, 1000, "ms");
        monitoring.recordTiming("API Initialization", 345, "backend");
        monitoring.recordTiming("Database Connection", 112, "backend");
        monitoring.recordTiming("Auth Check", 89, "backend");
        setTimeout(() => {
            monitoring.endApiTimer("initial-load");
        }, 500);
        return () => clearInterval(interval);
    }, []);
    // Format timing data for charts
    const formattedTimingData = timingData
        .map((metric) => ({
        name: metric.name,
        duration: metric.duration,
        category: metric.category,
    }))
        .slice(0, 10);
    // Sample performance data for chart
    const performanceData = [
        { date: "10:00", cpu: 42, memory: 38, apiTime: 120 },
        { date: "10:05", cpu: 45, memory: 40, apiTime: 135 },
        { date: "10:10", cpu: 48, memory: 45, apiTime: 128 },
        { date: "10:15", cpu: 52, memory: 48, apiTime: 142 },
        { date: "10:20", cpu: 58, memory: 52, apiTime: 150 },
        { date: "10:25", cpu: 62, memory: 55, apiTime: 165 },
        { date: "10:30", cpu: 68, memory: 58, apiTime: 180 },
        { date: "10:35", cpu: 72, memory: 62, apiTime: 210 },
        { date: "10:40", cpu: 70, memory: 65, apiTime: 190 },
        { date: "10:45", cpu: 65, memory: 60, apiTime: 175 },
    ];
    const getStatusColor = (value, warningThreshold, criticalThreshold) => {
        if (value >= criticalThreshold)
            return "bg-red-500";
        if (value >= warningThreshold)
            return "bg-amber-500";
        return "bg-green-500";
    };
    if (isLoading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(Skeleton, { className: "h-8 w-[250px]" }) }), _jsx(CardContent, { children: _jsx(Skeleton, { className: "h-[300px] w-full" }) })] }));
    }
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "System Performance" }), _jsx(CardDescription, { children: "Real-time metrics and performance data" })] }), _jsxs(CardContent, { children: [_jsxs(Tabs, { defaultValue: "gauges", value: selectedTab, onValueChange: setSelectedTab, children: [_jsxs(TabsList, { className: "w-full mb-4", children: [_jsx(TabsTrigger, { value: "gauges", children: "Resource Usage" }), _jsx(TabsTrigger, { value: "timings", children: "Response Times" }), _jsx(TabsTrigger, { value: "history", children: "Historical Data" })] }), _jsx(TabsContent, { value: "gauges", className: "space-y-4", children: _jsxs("div", { className: "space-y-5", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("span", { className: "flex items-center", children: [_jsx(Server, { className: "h-4 w-4 mr-2" }), "CPU Usage"] }), _jsxs(Badge, { className: getStatusColor(cpuUsage, 70, 90), children: [cpuUsage.toFixed(1), "%"] })] }), _jsx(Progress, { value: cpuUsage, className: "h-2" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("span", { className: "flex items-center", children: [_jsx(Database, { className: "h-4 w-4 mr-2" }), "Memory Usage"] }), _jsxs(Badge, { className: getStatusColor(memoryUsage, 80, 95), children: [memoryUsage.toFixed(1), "%"] })] }), _jsx(Progress, { value: memoryUsage, className: "h-2" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("span", { className: "flex items-center", children: [_jsx(Activity, { className: "h-4 w-4 mr-2" }), "API Response Time"] }), _jsxs(Badge, { className: getStatusColor(apiResponseTime, 300, 800), children: [apiResponseTime.toFixed(0), "ms"] })] }), _jsx(Progress, { value: (apiResponseTime / 1000) * 100, className: "h-2" })] })] }) }), _jsx(TabsContent, { value: "timings", children: _jsx("div", { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: formattedTimingData, margin: {
                                                top: 20,
                                                right: 30,
                                                left: 20,
                                                bottom: 70,
                                            }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "name", angle: -45, textAnchor: "end", height: 70 }), _jsx(YAxis, { label: {
                                                        value: "Duration (ms)",
                                                        angle: -90,
                                                        position: "insideLeft",
                                                    } }), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "duration", fill: "#8884d8", name: "Duration (ms)", isAnimationActive: false })] }) }) }) }), _jsx(TabsContent, { value: "history", children: _jsx("div", { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: performanceData, margin: {
                                                top: 20,
                                                right: 20,
                                                left: 20,
                                                bottom: 20,
                                            }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "date" }), _jsx(YAxis, { yAxisId: "left" }), _jsx(YAxis, { yAxisId: "right", orientation: "right" }), _jsx(Tooltip, {}), _jsx(Line, { yAxisId: "left", type: "monotone", dataKey: "cpu", name: "CPU Usage (%)", stroke: "#8884d8", activeDot: { r: 8 } }), _jsx(Line, { yAxisId: "left", type: "monotone", dataKey: "memory", name: "Memory (%)", stroke: "#82ca9d" }), _jsx(Line, { yAxisId: "right", type: "monotone", dataKey: "apiTime", name: "API Time (ms)", stroke: "#ffc658" })] }) }) }) })] }), _jsxs("div", { className: "mt-4 text-xs text-muted-foreground flex items-center gap-1", children: [_jsx(Clock, { className: "h-3 w-3" }), _jsxs("span", { children: ["Last updated: ", new Date().toLocaleTimeString()] })] })] })] }));
};
export default PerformanceMetrics;
