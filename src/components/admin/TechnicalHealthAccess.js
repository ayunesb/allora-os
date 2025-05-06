import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Activity, Zap, Server } from "lucide-react";
import { Link } from "react-router-dom";
export default function TechnicalHealthAccess() {
    const adminLinks = [
        {
            title: "Technical",
            description: "Performance improvements",
            icon: _jsx(Zap, { className: "h-8 w-8 text-amber-500" }),
            link: "/admin/technical-improvements",
        },
        {
            title: "System Health",
            description: "Monitor system performance",
            icon: _jsx(Activity, { className: "h-8 w-8 text-blue-500" }),
            link: "/admin/system-health",
        },
    ];
    return (_jsxs(Card, { className: "border-primary/20", children: [_jsxs(CardHeader, { children: [_jsxs(CardTitle, { className: "flex items-center", children: [_jsx(Server, { className: "h-5 w-5 text-primary mr-2" }), "Technical Administration"] }), _jsx(CardDescription, { children: "Monitor and manage system performance" })] }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-2 gap-4", children: adminLinks.map((link, index) => (_jsx(Link, { to: link.link, children: _jsxs("div", { className: "flex flex-col items-center justify-center p-4 rounded-lg border hover:bg-accent/50 transition-colors h-full", children: [link.icon, _jsx("h3", { className: "mt-3 font-medium text-sm", children: link.title }), _jsx("p", { className: "text-xs text-muted-foreground text-center mt-1", children: link.description })] }) }, index))) }) })] }));
}
