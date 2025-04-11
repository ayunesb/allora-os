
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Key, 
  Webhook, 
  Building2, 
  PanelRight, 
  HomeIcon,
  Rocket
} from "lucide-react";

interface AdminNavProps {
  className?: string;
}

export function AdminNav({ className }: AdminNavProps) {
  const location = useLocation();
  
  const routes = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: HomeIcon,
      active: location.pathname === "/admin",
    },
    {
      href: "/admin/users",
      label: "User Management",
      icon: Users,
      active: location.pathname === "/admin/users",
    },
    {
      href: "/admin/api-keys",
      label: "API Keys",
      icon: Key,
      active: location.pathname === "/admin/api-keys",
    },
    {
      href: "/admin/webhooks",
      label: "Webhooks",
      icon: Webhook,
      active: location.pathname === "/admin/webhooks",
    },
    {
      href: "/admin/launch-plan",
      label: "Launch Plan",
      icon: Rocket,
      active: location.pathname === "/admin/launch-plan",
    },
    {
      href: "/admin/company",
      label: "Company Settings",
      icon: Building2,
      active: location.pathname === "/admin/company",
    },
  ];

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          to={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
            route.active
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          <route.icon className="h-4 w-4" />
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
