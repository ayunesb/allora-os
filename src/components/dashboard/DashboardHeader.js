import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Bell, Home } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { HelpButton } from "@/components/help/HelpButton";
import { SessionRefreshBanner } from "@/components/dashboard/SessionRefreshBanner";
export function DashboardHeader({ pendingApprovals }) {
    return (_jsxs(_Fragment, { children: [_jsx(SessionRefreshBanner, {}), _jsxs("div", { className: "flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center py-6", children: [_jsxs("div", { className: "animate-fadeIn flex items-center", children: [_jsx(Home, { className: "h-8 w-8 text-primary mr-3 hidden md:block" }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold tracking-tight gradient-text", children: "Dashboard" }), _jsx("p", { className: "text-muted-foreground mt-1", children: "Get a snapshot of your business performance and AI recommendations" })] })] }), _jsxs("div", { className: "flex items-center gap-3 animate-slideIn", style: { animationDelay: "0.2s" }, children: [_jsx(HelpButton, { contextId: "dashboard", variant: "text" }), pendingApprovals && pendingApprovals > 0 ? (_jsx(Button, { asChild: true, variant: "outline", className: "gap-2 hover-glow", children: _jsxs(Link, { to: "/dashboard/approvals", children: [_jsx(Bell, { className: "h-4 w-4 text-primary" }), "Approvals", _jsx(Badge, { variant: "destructive", className: "ml-1 animate-pulse-slow", children: pendingApprovals })] }) })) : null] })] })] }));
}
