import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function CommunicationToolsPage() {
    return (_jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight", children: "Communication Tools" }), _jsx("p", { className: "text-muted-foreground", children: "Manage and configure communication tools and integrations." }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Message Templates" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Manage communication templates here." }) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "API Integrations" }) }), _jsx(CardContent, { children: _jsx("p", { children: "Configure third-party messaging service integrations." }) })] })] })] }));
}
