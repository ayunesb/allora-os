import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
export default function CommunicationTools() {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Communication Tools" }), _jsx(CardDescription, { children: "Configure calling, messaging, and other communication features" })] }), _jsx(CardContent, { children: _jsx("p", { children: "Communication tools configuration content will be displayed here." }) })] }) }));
}
