import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const kpis = [
    { label: "Leads Captured", value: 312 },
    { label: "Campaign ROI", value: "168%" },
    { label: "Monthly Revenue", value: "$8,400" },
    { label: "Conversion Rate", value: "12.5%" },
];
export default function KPIs() {
    return (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: kpis.map((kpi, idx) => (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { className: "text-sm text-muted-foreground", children: kpi.label }) }), _jsx(CardContent, { children: _jsx("div", { className: "text-2xl font-semibold", children: kpi.value }) })] }, idx))) }));
}
