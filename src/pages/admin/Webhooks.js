import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
export default function Webhooks() {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Webhook Management" }), _jsx(CardDescription, { children: "Configure integrations with external services" })] }), _jsx(CardContent, { children: _jsx("p", { children: "Webhook configuration content will be displayed here." }) })] }) }));
}
