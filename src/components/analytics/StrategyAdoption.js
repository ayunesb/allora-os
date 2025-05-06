import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, } from "recharts";
const StrategyAdoption = () => {
    // Sample data - would come from an API in a real application
    const strategyData = [
        {
            name: "High Risk",
            value: 20,
            color: "var(--risk-high-DEFAULT, #ea384c)",
        },
        {
            name: "Medium Risk",
            value: 45,
            color: "var(--risk-medium-DEFAULT, #f97316)",
        },
        { name: "Low Risk", value: 35, color: "var(--risk-low-DEFAULT, #0ea5e9)" },
    ];
    return (_jsxs(Card, { className: "h-full", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Strategy Adoption" }) }), _jsx(CardContent, { children: _jsx("div", { className: "h-[300px]", children: _jsx(ResponsiveContainer, { width: "100%", height: "100%", children: _jsxs(PieChart, { children: [_jsx(Pie, { data: strategyData, cx: "50%", cy: "50%", labelLine: false, label: ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`, outerRadius: 80, fill: "#8884d8", dataKey: "value", children: strategyData.map((entry, index) => (_jsx(Cell, { fill: entry.color }, `cell-${index}`))) }), _jsx(Tooltip, {}), _jsx(Legend, {})] }) }) }) })] }));
};
export default StrategyAdoption;
