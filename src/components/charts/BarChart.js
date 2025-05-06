import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
export function BarChart({ data, categories, index, colors = ["blue", "green", "purple", "orange"], valueFormatter, layout = "horizontal", className, }) {
    // Create a simpler formatter function that matches the expected type for Recharts
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
    return (_jsx(ResponsiveContainer, { width: "100%", height: 300, className: className, children: _jsxs(RechartsBarChart, { data: data, layout: layout, margin: { top: 5, right: 20, left: 10, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), layout === "horizontal" ? (_jsxs(_Fragment, { children: [_jsx(XAxis, { dataKey: index }), _jsx(YAxis, { tickFormatter: formatTickValue })] })) : (_jsxs(_Fragment, { children: [_jsx(XAxis, { type: "number", tickFormatter: formatTickValue }), _jsx(YAxis, { type: "category", dataKey: index, width: 120 })] })), _jsx(Tooltip, { formatter: formatTooltipValue }), _jsx(Legend, {}), categories.map((category, idx) => (_jsx(Bar, { dataKey: category, fill: colors[idx % colors.length] }, category)))] }) }));
}
