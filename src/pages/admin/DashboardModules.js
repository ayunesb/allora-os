import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
export default function DashboardModules() {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Dashboard Modules" }), _jsx(CardDescription, { children: "Configure dashboard components and user experiences" })] }), _jsx(CardContent, { children: _jsx("p", { children: "Dashboard module configuration content will be displayed here." }) })] }) }));
}
