import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Campaigns", path: "/dashboard/campaigns" },
    { name: "Settings", path: "/dashboard/settings" },
    { name: "KPI Dashboard", path: "/dashboard/kpis" },
];
const navigation = [
    {
        title: "Main",
        links: [{ label: "Dashboard", href: "/dashboard", icon: "🏠" }],
    },
    {
        title: "Explore",
        links: [
            {
                label: "Galaxy",
                href: "/explore/galaxy",
                icon: "🌌",
            },
        ],
    },
];
export function Sidebar() {
    return (_jsxs("aside", { className: "w-64 border-r bg-card shadow-md dark:bg-muted/20", children: [_jsx("div", { className: "p-6 text-xl font-bold tracking-wide", children: "Allora OS" }), _jsx("nav", { className: "flex flex-col space-y-2 px-4", children: navItems.map((item) => (_jsx(NavLink, { to: item.path, className: ({ isActive }) => cn("rounded-md px-3 py-2 text-sm font-medium transition-colors", isActive
                        ? "bg-muted text-accent-foreground"
                        : "text-muted-foreground hover:text-primary"), children: item.name }, item.path))) })] }));
}
