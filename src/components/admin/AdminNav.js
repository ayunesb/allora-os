import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, LineChart, Settings, Shield, ServerCrash, Rocket, } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBreakpoint } from "@/hooks/use-mobile";
export function AdminNav() {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    const location = useLocation();
    // Check if we're on the entities page and which tab is active
    const isOnEntitiesPage = location.pathname.includes("/admin/entities");
    const entitiesTab = new URLSearchParams(location.search).get("tab") || "users";
    const navItems = [
        {
            href: "/admin",
            label: "Overview",
            icon: _jsx(LayoutDashboard, { size: isMobileView ? 16 : 20 }),
        },
        {
            href: "/admin/entities",
            label: "Entities",
            icon: _jsx(Users, { size: isMobileView ? 16 : 20 }),
        },
        {
            href: "/admin/campaigns",
            label: "Campaigns",
            icon: _jsx(BarChart3, { size: isMobileView ? 16 : 20 }),
        },
        {
            href: "/admin/analytics",
            label: "Analytics",
            icon: _jsx(LineChart, { size: isMobileView ? 16 : 20 }),
        },
        {
            href: "/admin/settings",
            label: "Settings",
            icon: _jsx(Settings, { size: isMobileView ? 16 : 20 }),
        },
        {
            href: "/admin/system-health",
            label: "System Health",
            icon: _jsx(ServerCrash, { size: isMobileView ? 16 : 20 }),
        },
        {
            href: "/admin/audit",
            label: "Security",
            icon: _jsx(Shield, { size: isMobileView ? 16 : 20 }),
        },
        {
            href: "/admin/launch-prep",
            label: "Launch Prep",
            icon: _jsx(Rocket, { size: isMobileView ? 16 : 20 }),
        },
    ];
    return (_jsx("nav", { className: "space-y-1", children: navItems.map((item) => {
            // Special handling for entities page to check active tab
            const isEntitiesActive = item.href === "/admin/entities" && isOnEntitiesPage;
            return (_jsxs(NavLink, { to: item.href, end: item.href === "/admin", className: ({ isActive }) => cn("flex items-center py-2 px-3 text-sm font-medium rounded-md mb-1", 
                // If it's the entities page, we check if we're on that page
                isActive || isEntitiesActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"), children: [_jsx("span", { className: "mr-3", children: item.icon }), item.label] }, item.href));
        }) }));
}
