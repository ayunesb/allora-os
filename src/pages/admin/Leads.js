import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
export default function Leads() {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Lead Management" }), _jsx(CardDescription, { children: "Track and manage potential customer information" })] }), _jsx(CardContent, { children: _jsx("p", { children: "Lead management content will be displayed here." }) })] }) }));
}
