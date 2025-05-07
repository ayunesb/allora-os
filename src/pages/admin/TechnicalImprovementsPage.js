var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, RefreshCw, Download, Filter } from "lucide-react";
// Mock implementation for PerformanceMonitor
const mockPerformanceMonitor = {
    getAllMeasurements: () => {
        return Promise.resolve([
            {
                id: 1,
                name: "API Response Time",
                value: 145,
                unit: "ms",
                trend: "improving",
            },
            {
                id: 2,
                name: "Database Query Time",
                value: 72,
                unit: "ms",
                trend: "stable",
            },
            {
                id: 3,
                name: "Frontend Rendering",
                value: 230,
                unit: "ms",
                trend: "worsening",
            },
            {
                id: 4,
                name: "AI Processing Time",
                value: 450,
                unit: "ms",
                trend: "improving",
            },
        ]);
    },
};
export default function TechnicalImprovementsPage() {
    const [measurements, setMeasurements] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                setLoading(true);
                const data = yield mockPerformanceMonitor.getAllMeasurements();
                setMeasurements(data);
            }
            catch (error) {
                console.error("Error fetching performance data:", error);
            }
            finally {
                setLoading(false);
            }
        });
        fetchData();
    }, []);
    const renderTrendBadge = (trend) => {
        switch (trend) {
            case "improving":
                return (_jsx(Badge, { className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30", children: "Improving" }));
            case "worsening":
                return (_jsx(Badge, { variant: "outline", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30", children: "Degrading" }));
            case "stable":
            default:
                return (_jsx(Badge, { variant: "outline", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30", children: "Stable" }));
        }
    };
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: [_jsx(TypographyH1, { children: "Technical Improvements" }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto", children: [_jsxs(Button, { variant: "outline", className: "w-full sm:w-auto", children: [_jsx(Filter, { className: "h-4 w-4 mr-2" }), "Filter"] }), _jsxs(Button, { variant: "outline", className: "w-full sm:w-auto", children: [_jsx(Download, { className: "h-4 w-4 mr-2" }), "Export"] }), _jsxs(Button, { variant: "outline", className: "w-full sm:w-auto", children: [_jsx(RefreshCw, { className: "h-4 w-4 mr-2" }), "Refresh"] })] })] }), _jsxs(Tabs, { defaultValue: "performance", className: "w-full", children: [_jsxs(TabsList, { className: "w-full max-w-md mb-4", children: [_jsx(TabsTrigger, { value: "performance", children: "Performance" }), _jsx(TabsTrigger, { value: "optimization", children: "Optimization" }), _jsx(TabsTrigger, { value: "recommendations", children: "Recommendations" })] }), _jsxs(TabsContent, { value: "performance", children: [_jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-2", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Performance Trends" }), _jsx(CardDescription, { children: "System performance over time" })] }), _jsx(CardContent, { children: _jsx("div", { className: "h-[300px] flex items-center justify-center border border-dashed rounded-lg", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(LineChart, { className: "h-5 w-5 text-muted-foreground" }), _jsx(TypographyP, { children: "Performance trend chart will display here" })] }) }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Key Metrics" }), _jsx(CardDescription, { children: "Current performance indicators" })] }), _jsx(CardContent, { children: loading ? (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "h-6 bg-muted/50 rounded animate-pulse" }), _jsx("div", { className: "h-6 bg-muted/50 rounded animate-pulse" }), _jsx("div", { className: "h-6 bg-muted/50 rounded animate-pulse" })] })) : (_jsx("div", { className: "space-y-4", children: measurements.map((metric) => (_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium", children: metric.name }), _jsxs("p", { className: "text-sm text-muted-foreground", children: [metric.value, " ", metric.unit] })] }), renderTrendBadge(metric.trend)] }, metric.id))) })) })] })] }), _jsx("div", { className: "mt-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Performance Issues" }), _jsx(CardDescription, { children: "Identified issues that need attention" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-start gap-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg", children: [_jsx("div", { className: "bg-red-100 dark:bg-red-900/30 p-2 rounded-full", children: _jsx("div", { className: "h-2 w-2 rounded-full bg-red-600 dark:bg-red-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "High Memory Usage" }), _jsx(TypographyP, { children: "Memory consumption spikes during peak user activity. Consider optimizing memory-intensive operations." })] })] }), _jsxs("div", { className: "flex items-start gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 rounded-lg", children: [_jsx("div", { className: "bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full", children: _jsx("div", { className: "h-2 w-2 rounded-full bg-yellow-600 dark:bg-yellow-400" }) }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Database Query Optimization" }), _jsx(TypographyP, { children: "Some database queries are taking longer than expected. Review queries and consider adding indexes." })] })] })] }) })] }) })] }), _jsx(TabsContent, { value: "optimization", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Optimization Opportunities" }), _jsx(CardDescription, { children: "Areas for potential performance improvement" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "font-medium", children: "Frontend Asset Optimization" }), _jsx(Badge, { variant: "outline", children: "High Impact" })] }), _jsx(TypographyP, { children: "Compress and optimize image assets to reduce load times by up to 35%." }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx(Button, { size: "sm", children: "Apply Optimization" }), _jsx(Button, { variant: "outline", size: "sm", children: "Learn More" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "font-medium", children: "API Response Caching" }), _jsx(Badge, { variant: "outline", children: "Medium Impact" })] }), _jsx(TypographyP, { children: "Implement caching for frequently requested API endpoints to reduce backend load." }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx(Button, { size: "sm", children: "Apply Optimization" }), _jsx(Button, { variant: "outline", size: "sm", children: "Learn More" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("p", { className: "font-medium", children: "Database Indexing" }), _jsx(Badge, { variant: "outline", children: "High Impact" })] }), _jsx(TypographyP, { children: "Add strategic indexes to improve query performance on high-traffic tables." }), _jsxs("div", { className: "flex items-center gap-2 mt-2", children: [_jsx(Button, { size: "sm", children: "Apply Optimization" }), _jsx(Button, { variant: "outline", size: "sm", children: "Learn More" })] })] })] }) })] }) }), _jsx(TabsContent, { value: "recommendations", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "AI-Generated Recommendations" }), _jsx(CardDescription, { children: "Intelligent suggestions based on system analysis" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "border rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: "font-semibold", children: "Code Splitting Implementation" }), _jsx(Badge, { className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", children: "Architecture" })] }), _jsx(TypographyP, { children: "Implement code splitting to reduce initial bundle size and improve load times for your React application." }), _jsxs("div", { className: "mt-4 flex items-center justify-between", children: [_jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "font-medium", children: "Estimated Impact:" }), " ", "High"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", children: "View Details" }), _jsx(Button, { variant: "outline", size: "sm", children: "Dismiss" })] })] })] }), _jsxs("div", { className: "border rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: "font-semibold", children: "Implement Component Lazy Loading" }), _jsx(Badge, { className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", children: "Performance" })] }), _jsx(TypographyP, { children: "Improve initial load performance by implementing lazy loading for non-critical components." }), _jsxs("div", { className: "mt-4 flex items-center justify-between", children: [_jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "font-medium", children: "Estimated Impact:" }), " ", "Medium"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", children: "View Details" }), _jsx(Button, { variant: "outline", size: "sm", children: "Dismiss" })] })] })] }), _jsxs("div", { className: "border rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("p", { className: "font-semibold", children: "Optimize Redux State Management" }), _jsx(Badge, { className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400", children: "State Management" })] }), _jsx(TypographyP, { children: "Refactor Redux store to use normalized state patterns and improve rendering performance." }), _jsxs("div", { className: "mt-4 flex items-center justify-between", children: [_jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "font-medium", children: "Estimated Impact:" }), " ", "Medium"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { size: "sm", children: "View Details" }), _jsx(Button, { variant: "outline", size: "sm", children: "Dismiss" })] })] })] })] }) })] }) })] })] }));
}
