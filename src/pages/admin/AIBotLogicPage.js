import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function AIBotLogicPage() {
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "AI Bot Logic" }), _jsx("p", { className: "text-muted-foreground", children: "Configure and manage AI bot behavior and responses." }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Bot Configuration" }) }), _jsx(CardContent, { children: _jsx("p", { children: "AI Bot configuration settings will be displayed here." }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Response Templates" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Manage bot response templates and patterns here." }) })] })] })] }));
}
