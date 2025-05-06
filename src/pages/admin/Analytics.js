import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
export default function Analytics() {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Analytics Dashboard" }), _jsx(CardDescription, { children: "View business performance metrics and visualization data" })] }), _jsx(CardContent, { children: _jsx("p", { children: "Analytics content will be displayed here." }) })] }) }));
}
