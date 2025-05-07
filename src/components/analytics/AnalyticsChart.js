import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, } from "recharts";
const AnalyticsChart = ({ title, description, chartType, data, dataKeys, colors, xAxisDataKey, nameKey = "name", }) => {
    const renderChart = () => {
        switch (chartType) {
            case "line":
                return (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: data, margin: { top: 5, right: 30, left: 20, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: xAxisDataKey }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), dataKeys.map((key, index) => (_jsx(Line, { type: "monotone", dataKey: key, stroke: colors[index % colors.length], activeDot: { r: 8 } }, key)))] }) }));
            case "area":
                return (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(AreaChart, { data: data, margin: { top: 5, right: 30, left: 20, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: xAxisDataKey }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), dataKeys.map((key, index) => (_jsx(Area, { type: "monotone", dataKey: key, fill: colors[index % colors.length], stroke: colors[index % colors.length] }, key)))] }) }));
            case "bar":
                return (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(BarChart, { data: data, margin: { top: 5, right: 30, left: 20, bottom: 5 }, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: xAxisDataKey }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Legend, {}), dataKeys.map((key, index) => (_jsx(Bar, { dataKey: key, fill: colors[index % colors.length] }, key)))] }) }));
            case "pie":
                return (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: data, cx: "50%", cy: "50%", labelLine: true, label: ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`, outerRadius: 80, fill: "#8884d8", dataKey: dataKeys[0], nameKey: nameKey, children: data.map((entry, index) => (_jsx(Cell, { fill: colors[index % colors.length] }, `cell-${index}`))) }), _jsx(Tooltip, {}), _jsx(Legend, {})] }) }));
            case "radialBar":
                return (_jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(RadialBarChart, { cx: "50%", cy: "50%", innerRadius: "10%", outerRadius: "80%", barSize: 20, data: data, children: [_jsx(RadialBar, { label: { position: "insideStart", fill: "#fff" }, background: true, dataKey: dataKeys[0], children: data.map((entry, index) => (_jsx(Cell, { fill: colors[index % colors.length] }, `cell-${index}`))) }), _jsx(Legend, { iconSize: 10, layout: "vertical", verticalAlign: "middle", wrapperStyle: {
                                    top: "50%",
                                    right: 0,
                                    transform: "translate(0, -50%)",
                                    lineHeight: "24px",
                                }, formatter: (value, entry, index) => {
                                    // Display the name from our data instead
                                    return data[index % data.length][nameKey];
                                } }), _jsx(Tooltip, {})] }) }));
            default:
                return _jsx("div", { children: "Chart type not supported" });
        }
    };
    return (_jsxs("div", { className: "space-y-2", children: [title && _jsx("h3", { className: "text-lg font-medium", children: title }), description && (_jsx("p", { className: "text-sm text-muted-foreground", children: description })), renderChart()] }));
};
export default AnalyticsChart;
