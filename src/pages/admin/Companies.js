import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
export default function Companies() {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Companies Management" }), _jsx(CardDescription, { children: "Manage company accounts and details" })] }), _jsx(CardContent, { children: _jsx("p", { children: "Company management content will be displayed here." }) })] }) }));
}
