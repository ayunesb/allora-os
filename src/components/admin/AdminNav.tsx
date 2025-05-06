import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  LineChart,
  Settings,
  Shield,
  ServerCrash,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useBreakpoint } from "@/hooks/use-mobile";
export function AdminNav() {
  const breakpoint = useBreakpoint();
  const isMobileView = ["xs", "mobile"].includes(breakpoint);
  const location = useLocation();
  // Check if we're on the entities page and which tab is active
  const isOnEntitiesPage = location.pathname.includes("/admin/entities");
  const entitiesTab =
    new URLSearchParams(location.search).get("tab") || "users";
  const navItems = [
    {
      href: "/admin",
      label: "Overview",
      icon: <LayoutDashboard size={isMobileView ? 16 : 20} />,
    },
    {
      href: "/admin/entities",
      label: "Entities",
      icon: <Users size={isMobileView ? 16 : 20} />,
    },
    {
      href: "/admin/campaigns",
      label: "Campaigns",
      icon: <BarChart3 size={isMobileView ? 16 : 20} />,
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      icon: <LineChart size={isMobileView ? 16 : 20} />,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: <Settings size={isMobileView ? 16 : 20} />,
    },
    {
      href: "/admin/system-health",
      label: "System Health",
      icon: <ServerCrash size={isMobileView ? 16 : 20} />,
    },
    {
      href: "/admin/audit",
      label: "Security",
      icon: <Shield size={isMobileView ? 16 : 20} />,
    },
    {
      href: "/admin/launch-prep",
      label: "Launch Prep",
      icon: <Rocket size={isMobileView ? 16 : 20} />,
    },
  ];
  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        // Special handling for entities page to check active tab
        const isEntitiesActive =
          item.href === "/admin/entities" && isOnEntitiesPage;
        return (
          <NavLink
            key={item.href}
            to={item.href}
            end={item.href === "/admin"}
            className={({ isActive }) =>
              cn(
                "flex items-center py-2 px-3 text-sm font-medium rounded-md mb-1",
                // If it's the entities page, we check if we're on that page
                isActive || isEntitiesActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )
            }
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
