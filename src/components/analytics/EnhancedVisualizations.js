import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveContainer, Treemap, Tooltip, Funnel, FunnelChart, LabelList, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ZAxis, } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { Activity } from "lucide-react";
const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#4BC0C0",
    "#36A2EB",
    "#9966FF",
];
export function EnhancedVisualization({ type, data, title, description, config = {}, }) {
    const renderVisualization = () => {
        switch (type) {
            case "treemap":
                return (_jsx(ResponsiveContainer, { width: "100%", height: 350, children: _jsx(Treemap, { data: data, dataKey: "value", nameKey: "name", aspectRatio: 4 / 3, stroke: "#fff", fill: "#8884d8", children: _jsx(Tooltip, { formatter: (value) => [`${value}`, "Value"] }) }) }));
            case "funnel":
                return (_jsx(ResponsiveContainer, { width: "100%", height: 350, children: _jsxs(FunnelChart, { children: [_jsx(Tooltip, {}), _jsx(Funnel, { dataKey: "value", data: data, isAnimationActive: true, fill: COLORS[0], children: _jsx(LabelList, { position: "right", fill: "#000", stroke: "none", dataKey: "name" }) })] }) }));
            case "bubble":
                return (_jsx(ResponsiveContainer, { width: "100%", height: 350, children: _jsxs(ScatterChart, { margin: { top: 20, right: 20, bottom: 20, left: 20 }, children: [_jsx(CartesianGrid, {}), _jsx(XAxis, { type: "number", dataKey: "x", name: config.xAxisName || "X" }), _jsx(YAxis, { type: "number", dataKey: "y", name: config.yAxisName || "Y" }), _jsx(ZAxis, { type: "number", dataKey: "z", range: [60, 400], name: config.zAxisName || "Z" }), _jsx(Tooltip, { cursor: { strokeDasharray: "3 3" } }), data.map((group, index) => (_jsx(Scatter, { name: group.name, data: group.data, fill: COLORS[index % COLORS.length] }, index)))] }) }));
            case "heatmap":
                // Render a simple heatmap visualization (using a styled grid of divs)
                return (_jsx("div", { className: "w-full h-[350px] overflow-auto", children: _jsx("div", { className: "grid grid-cols-10 gap-1", children: data.map((cell, index) => (_jsx("div", { className: "aspect-square rounded", style: {
                                backgroundColor: calculateHeatColor(cell.value, config.min || 0, config.max || 100),
                                opacity: 0.8,
                            }, title: `${cell.name}: ${cell.value}` }, index))) }) }));
            default:
                return _jsx("div", { children: "Visualization type not supported" });
        }
    };
    const calculateHeatColor = (value, min, max) => {
        // Calculate color based on value relative to min/max
        const ratio = (value - min) / (max - min);
        // Generate color from blue (cold) to red (hot)
        const hue = (1 - ratio) * 240;
        return `hsl(${hue}, 80%, 60%)`;
    };
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-2", children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Activity, { className: "mr-2 h-5 w-5 text-primary" }), title] }), description && _jsx(CardDescription, { children: description })] }), _jsx(CardContent, { children: renderVisualization() })] }));
}
