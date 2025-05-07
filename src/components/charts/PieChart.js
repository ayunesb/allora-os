import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pie, PieChart as RechartsPieChart, Cell, Tooltip, Legend, ResponsiveContainer, } from "recharts";
export function PieChart({ data, category, index, colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"], valueFormatter, className, }) {
    const formatValue = valueFormatter || ((value) => `${value}`);
    return (_jsx(ResponsiveContainer, { width: "100%", height: 300, className: className, children: _jsxs(RechartsPieChart, { children: [_jsx(Pie, { data: data, cx: "50%", cy: "50%", labelLine: true, label: ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`, outerRadius: 80, fill: "#8884d8", dataKey: category, nameKey: index, children: data.map((entry, index) => (_jsx(Cell, { fill: colors[index % colors.length] }, `cell-${index}`))) }), _jsx(Tooltip, { formatter: (value) => formatValue(Number(value)) }), _jsx(Legend, {})] }) }));
}
