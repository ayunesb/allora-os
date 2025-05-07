import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Line, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
export function LineChart({ data, categories, index, colors = ["blue", "green", "purple", "orange"], valueFormatter, yAxisWidth = 40, className, }) {
    // Create a formatter function that matches the expected type for Recharts
    const formatTickValue = (value) => {
        if (valueFormatter && typeof value === "number") {
            return valueFormatter(value);
        }
        return `${value}`;
    };
    // Tooltip formatter
    const formatTooltipValue = (value, name) => {
        if (valueFormatter && typeof value === "number") {
            return [valueFormatter(value, name), name];
        }
        return [`${value}`, name];
    };
    return (_jsx(ResponsiveContainer, { width: "100%", height: 300, className: className, children: _jsxs(RechartsLineChart, { data: data, margin: { top: 5, right: 20, left: 10, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: index }), _jsx(YAxis, { width: yAxisWidth, tickFormatter: formatTickValue }), _jsx(Tooltip, { formatter: formatTooltipValue }), _jsx(Legend, {}), categories.map((category, idx) => (_jsx(Line, { type: "monotone", dataKey: category, stroke: colors[idx % colors.length], activeDot: { r: 8 } }, category)))] }) }));
}
