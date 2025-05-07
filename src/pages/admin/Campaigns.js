import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
export default function Campaigns() {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Campaign Management" }), _jsx(CardDescription, { children: "Manage marketing campaigns across different platforms" })] }), _jsx(CardContent, { children: _jsx("p", { children: "Campaign management content will be displayed here." }) })] }) }));
}
