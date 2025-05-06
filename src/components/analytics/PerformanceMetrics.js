import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
const PerformanceMetrics = ({ isLoading = false }) => {
    // Sample data - in a real application this would come from an API
    const performanceData = [
        { date: "2025-04-01", strategies: 2, leads: 5, campaigns: 1 },
        { date: "2025-04-02", strategies: 3, leads: 8, campaigns: 1 },
        { date: "2025-04-03", strategies: 4, leads: 12, campaigns: 2 },
        { date: "2025-04-04", strategies: 5, leads: 15, campaigns: 2 },
        { date: "2025-04-05", strategies: 5, leads: 18, campaigns: 3 },
        { date: "2025-04-06", strategies: 7, leads: 22, campaigns: 3 },
        { date: "2025-04-07", strategies: 8, leads: 25, campaigns: 4 },
    ];
    if (isLoading) {
        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(Skeleton, { className: "h-8 w-[250px]" }) }), _jsx(CardContent, { children: _jsx(Skeleton, { className: "h-[300px] w-full" }) })] }));
    }
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance Overview" }) }), _jsx(CardContent, { children: _jsx("div", { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: performanceData, margin: {
                                top: 20,
                                right: 20,
                                left: 0,
                                bottom: 0,
                            }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "date" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "strategies", stroke: "#8884d8", activeDot: { r: 8 } }), _jsx(Line, { type: "monotone", dataKey: "leads", stroke: "#82ca9d" }), _jsx(Line, { type: "monotone", dataKey: "campaigns", stroke: "#ffc658" })] }) }) }) })] }));
};
export default PerformanceMetrics;
