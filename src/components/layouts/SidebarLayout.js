import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";
import clsx from "clsx";
const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "KPI Dashboard", path: "/dashboard/kpis" },
    { label: "Campaigns", path: "/dashboard/campaigns" },
    { label: "Executives", path: "/dashboard/executives" },
    { label: "AI Settings", path: "/dashboard/ai-settings" },
    { label: "Galaxy Explorer", path: "/explore/galaxy" },
];
export default function SidebarLayout() {
    const { pathname } = useLocation();
    return (_jsxs("div", { className: "flex h-screen bg-background text-foreground", children: [_jsxs("aside", { className: "w-60 bg-muted border-r border-border p-4 space-y-6", children: [_jsx("div", { className: "text-lg font-bold tracking-wide", children: "Allora OS" }), _jsx("nav", { className: "flex flex-col gap-2", children: navLinks.map((link) => (_jsx(Link, { to: link.path, className: clsx("text-sm px-3 py-2 rounded-md transition", pathname.startsWith(link.path)
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-muted/70"), children: link.label }, link.path))) }), _jsx("div", { className: "absolute bottom-4 left-4", children: _jsx(ThemeToggle, {}) })] }), _jsx("main", { className: "flex-1 p-6 overflow-y-auto", children: _jsx(Outlet, {}) })] }));
}
