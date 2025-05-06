import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { Home, BarChart2, Users, Settings, FileText, Zap, MessageSquare, Calendar, PanelRight, Rocket, } from "lucide-react";
export function Sidebar({ className }) {
    const navItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: _jsx(Home, { className: "h-5 w-5" }),
        },
        {
            name: "AI Executives",
            path: "/dashboard/ai-executives",
            icon: _jsx(Users, { className: "h-5 w-5" }),
        },
        {
            name: "Strategy",
            path: "/dashboard/strategy",
            icon: _jsx(Zap, { className: "h-5 w-5" }),
        },
        {
            name: "Marketing",
            path: "/dashboard/marketing",
            icon: _jsx(BarChart2, { className: "h-5 w-5" }),
        },
        {
            name: "Communication",
            path: "/dashboard/communication",
            icon: _jsx(MessageSquare, { className: "h-5 w-5" }),
        },
        {
            name: "Calendar",
            path: "/dashboard/calendar",
            icon: _jsx(Calendar, { className: "h-5 w-5" }),
        },
        {
            name: "Documentation",
            path: "/dashboard/docs",
            icon: _jsx(FileText, { className: "h-5 w-5" }),
        },
        {
            name: "Launch",
            path: "/dashboard/launch",
            icon: _jsx(Rocket, { className: "h-5 w-5" }),
        },
    ];
    const adminItems = [
        {
            name: "Admin Panel",
            path: "/admin",
            icon: _jsx(PanelRight, { className: "h-5 w-5" }),
        },
        {
            name: "Settings",
            path: "/dashboard/settings",
            icon: _jsx(Settings, { className: "h-5 w-5" }),
        },
    ];
    return (_jsxs("div", { className: cn("flex flex-col h-screen bg-background", className), children: [_jsx("div", { className: "px-4 py-6", children: _jsx("div", { className: "flex items-center", children: _jsx("h1", { className: "text-xl font-bold", children: "Allora AI" }) }) }), _jsxs("div", { className: "flex-1 overflow-y-auto", children: [_jsx("nav", { className: "px-2 space-y-1", children: navItems.map((item) => (_jsxs(NavLink, { to: item.path, className: ({ isActive }) => cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", isActive
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground"), children: [item.icon, item.name] }, item.path))) }), _jsxs("div", { className: "mt-6 border-t pt-4", children: [_jsx("div", { className: "px-2 mb-2 text-xs uppercase text-muted-foreground", children: "Administration" }), _jsx("nav", { className: "px-2 space-y-1", children: adminItems.map((item) => (_jsxs(NavLink, { to: item.path, className: ({ isActive }) => cn("flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "hover:bg-muted text-muted-foreground hover:text-foreground"), children: [item.icon, item.name] }, item.path))) })] })] }), _jsx("div", { className: "px-4 py-4 border-t", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center", children: _jsx(Users, { className: "h-4 w-4" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium truncate", children: "Account" }), _jsx("p", { className: "text-xs text-muted-foreground truncate", children: "Manage settings" })] })] }) })] }));
}
