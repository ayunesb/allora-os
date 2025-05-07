import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, } from "recharts";
const ForecastCharts = ({ forecasts, kpiData, kpiNames }) => {
    // Format data for charts
    const getChartData = (kpiType) => {
        const data = kpiData[kpiType] || [];
        const chartData = data.map((value, index) => ({
            period: `Period ${index + 1}`,
            value,
        }));
        // Add forecast point if available
        if (forecasts[kpiType]) {
            chartData.push({
                period: `Forecast`,
                value: forecasts[kpiType],
                isForecast: true,
            });
        }
        return chartData;
    };
    return (_jsx("div", { className: "grid gap-6", children: Object.keys(forecasts).map((kpi) => {
            const chartData = getChartData(kpi);
            return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: kpiNames[kpi] || kpi }) }), _jsx(CardContent, { children: _jsx("div", { className: "h-60", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(LineChart, { data: chartData, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "period" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Line, { type: "monotone", dataKey: "value", stroke: "#8884d8", strokeWidth: 2, dot: (props) => {
                                                const { cx, cy, payload } = props;
                                                return payload.isForecast ? (_jsx("svg", { x: cx - 8, y: cy - 8, width: 16, height: 16, fill: "red", children: _jsx("circle", { cx: "8", cy: "8", r: "6" }) })) : (_jsx("svg", { x: cx - 5, y: cy - 5, width: 10, height: 10, fill: "#8884d8", children: _jsx("circle", { cx: "5", cy: "5", r: "4" }) }));
                                            } })] }) }) }) })] }, kpi));
        }) }));
};
export default ForecastCharts;
