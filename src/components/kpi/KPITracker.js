import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/exportUtils";
import { Skeleton } from "@/components/ui/skeleton";
export function KPITracker({ metrics, isLoading = false }) {
    // Group metrics by type
    const metricsByType = {};
    if (!isLoading && metrics.length > 0) {
        metrics.forEach((metric) => {
            if (!metricsByType[metric.type]) {
                metricsByType[metric.type] = [];
            }
            metricsByType[metric.type].push(metric);
        });
    }
    // Calculate trends for each metric type
    const calculateTrend = (metrics) => {
        if (metrics.length < 2)
            return { percentage: 0, isPositive: true };
        const sortedMetrics = [...metrics].sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime());
        const current = sortedMetrics[0].value;
        const previous = sortedMetrics[1].value;
        if (previous === 0)
            return { percentage: 0, isPositive: true };
        const percentage = ((current - previous) / previous) * 100;
        return {
            percentage: Math.abs(Math.round(percentage * 10) / 10),
            isPositive: percentage >= 0,
        };
    };
    if (isLoading) {
        return (_jsx("div", { className: "space-y-4", children: [1, 2, 3, 4].map((i) => (_jsxs(Card, { className: "overflow-hidden", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(Skeleton, { className: "h-6 w-1/3 mb-2" }) }), _jsxs(CardContent, { children: [_jsx(Skeleton, { className: "h-10 w-1/4 mb-4" }), _jsx(Skeleton, { className: "h-4 w-2/5" })] })] }, i))) }));
    }
    if (!metrics.length) {
        return (_jsx(Card, { children: _jsx(CardContent, { className: "py-10 text-center", children: _jsx("p", { className: "text-muted-foreground", children: "No KPI metrics available. Metrics will appear here as they are recorded." }) }) }));
    }
    return (_jsx("div", { className: "space-y-4", children: Object.entries(metricsByType).map(([type, typeMetrics]) => {
            const latestMetric = typeMetrics[0];
            const trend = calculateTrend(typeMetrics);
            return (_jsxs(Card, { className: "overflow-hidden", children: [_jsx(CardHeader, { className: "pb-2", children: _jsx(CardTitle, { className: "text-lg capitalize", children: type }) }), _jsx(CardContent, { children: _jsxs("div", { className: "flex justify-between items-end", children: [_jsxs("div", { children: [_jsx("div", { className: "text-3xl font-bold", children: type.includes("percentage")
                                                ? `${latestMetric.value.toFixed(1)}%`
                                                : latestMetric.value.toLocaleString() }), _jsxs("p", { className: "text-sm text-muted-foreground", children: ["Last updated: ", formatDate(latestMetric.recorded_at)] })] }), typeMetrics.length > 1 && (_jsxs("div", { className: `text-sm font-medium flex items-center ${trend.isPositive ? "text-green-500" : "text-red-500"}`, children: [trend.isPositive ? "↑" : "↓", " ", trend.percentage, "%"] }))] }) })] }, type));
        }) }));
}
