import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";
const UserActivityGraph = () => {
    // Sample data - would typically come from an API
    const activityData = [
        { day: "Monday", count: 12 },
        { day: "Tuesday", count: 19 },
        { day: "Wednesday", count: 15 },
        { day: "Thursday", count: 25 },
        { day: "Friday", count: 20 },
        { day: "Saturday", count: 8 },
        { day: "Sunday", count: 5 },
    ];
    return (_jsxs(Card, { className: "h-full", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Weekly User Activity" }) }), _jsx(CardContent, { children: _jsx("div", { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(BarChart, { data: activityData, margin: {
                                top: 20,
                                right: 20,
                                left: 0,
                                bottom: 0,
                            }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "day" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "count", fill: "#8884d8" })] }) }) }) })] }));
};
export default UserActivityGraph;
