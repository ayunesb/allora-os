import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { Link } from "react-router-dom";
import { Home, Users, GitBranch, Phone, BarChart2, Bot, Settings, MessageSquare, Activity, ClipboardList, Globe, X, } from "lucide-react";
import { Button } from "@/components/ui/button";
export function MobileNavDrawer({ open, onOpenChange, currentPath }) {
    const isActive = (path) => {
        // Special case for strategies/strategy route
        if (path === "/dashboard/strategies" &&
            (currentPath === "/dashboard/strategies" ||
                currentPath === "/dashboard/strategy")) {
            return true;
        }
        return currentPath === path || currentPath.startsWith(path + "/");
    };
    const tabs = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: _jsx(Home, { className: "h-5 w-5" }),
            exact: true,
        },
        {
            name: "Leads",
            path: "/dashboard/leads",
            icon: _jsx(Users, { className: "h-5 w-5" }),
        },
        {
            name: "Strategies",
            path: "/dashboard/strategies",
            icon: _jsx(GitBranch, { className: "h-5 w-5" }),
        },
        {
            name: "Calls",
            path: "/dashboard/calls",
            icon: _jsx(Phone, { className: "h-5 w-5" }),
        },
        {
            name: "Campaigns",
            path: "/dashboard/campaigns",
            icon: _jsx(BarChart2, { className: "h-5 w-5" }),
        },
        {
            name: "Executives",
            path: "/dashboard/executives",
            icon: _jsx(Bot, { className: "h-5 w-5" }),
        },
        {
            name: "Decisions",
            path: "/dashboard/decisions",
            icon: _jsx(ClipboardList, { className: "h-5 w-5" }),
        },
        {
            name: "Forecast",
            path: "/dashboard/forecast",
            icon: _jsx(Activity, { className: "h-5 w-5" }),
        },
        {
            name: "Digital Twin",
            path: "/dashboard/digital-twin",
            icon: _jsx(Globe, { className: "h-5 w-5" }),
        },
        {
            name: "AI Bots",
            path: "/dashboard/ai-bots",
            icon: _jsx(Bot, { className: "h-5 w-5" }),
        },
        {
            name: "Debate",
            path: "/dashboard/debate",
            icon: _jsx(MessageSquare, { className: "h-5 w-5" }),
        },
        {
            name: "Settings",
            path: "/dashboard/settings",
            icon: _jsx(Settings, { className: "h-5 w-5" }),
        },
    ];
    return (_jsx(Drawer, { open: open, onOpenChange: onOpenChange, children: _jsxs(DrawerContent, { children: [_jsx("div", { className: "p-4 flex justify-end", children: _jsx(DrawerClose, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "hover:bg-accent rounded-full", children: _jsx(X, { className: "h-5 w-5" }) }) }) }), _jsx("div", { className: "py-4 max-h-[70vh] overflow-y-auto", children: tabs.map((tab) => (_jsxs(Link, { to: tab.path, className: `flex items-center space-x-2 p-3 hover:bg-accent rounded-md transition-colors ${isActive(tab.path) ? "font-medium" : ""}`, onClick: () => onOpenChange(false), children: [tab.icon, _jsx("span", { children: tab.name })] }, tab.name))) })] }) }));
}
