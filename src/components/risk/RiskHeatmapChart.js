import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const RiskHeatmapChart = ({ data = [], width = 500, height = 300 }) => {
    return (_jsxs(Card, { className: "w-full", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Risk Heatmap" }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex items-center justify-center bg-muted rounded-md", style: { width: "100%", height: `${height}px` }, children: _jsx("p", { className: "text-muted-foreground text-sm", children: "Risk heatmap visualization will appear here" }) }) })] }));
};
export default RiskHeatmapChart;
