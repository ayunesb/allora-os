
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  LayoutDashboard, 
  Settings, 
  Brain, 
  Megaphone, 
  Phone, 
  CheckCircle, 
  MessageSquare,
  Calendar,
  Sliders
} from "lucide-react";

interface DashboardTabsProps {
  navItems?: Array<{ label: string; path: string }>;
}

export function DashboardTabs({ navItems }: DashboardTabsProps = {}) {
  const location = useLocation();
  const pathname = location.pathname;

  const tabs = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      match: pathname === "/dashboard",
    },
    {
      name: "AI Bots",
      href: "/dashboard/ai-bots",
      icon: <Brain className="h-5 w-5" />,
      match: pathname.includes("/dashboard/ai-bots") || pathname.includes("/dashboard/debate"),
    },
    {
      name: "AI Settings",
      href: "/dashboard/ai-settings",
      icon: <Sliders className="h-5 w-5" />,
      match: pathname.includes("/dashboard/ai-settings"),
    },
    {
      name: "Campaigns",
      href: "/dashboard/campaigns",
      icon: <Megaphone className="h-5 w-5" />,
      match: pathname.includes("/dashboard/campaigns"),
    },
    {
      name: "Social Media",
      href: "/dashboard/social-media",
      icon: <Calendar className="h-5 w-5" />,
      match: pathname.includes("/dashboard/social-media"),
    },
    {
      name: "Leads",
      href: "/dashboard/leads",
      icon: <Users className="h-5 w-5" />,
      match: pathname.includes("/dashboard/leads"),
    },
    {
      name: "Calls",
      href: "/dashboard/calls",
      icon: <Phone className="h-5 w-5" />,
      match: pathname.includes("/dashboard/calls"),
    },
    {
      name: "Strategies",
      href: "/dashboard/strategies",
      icon: <CheckCircle className="h-5 w-5" />,
      match: pathname.includes("/dashboard/strategies"),
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      match: pathname.includes("/dashboard/analytics"),
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      match: pathname.includes("/dashboard/settings") ||
        pathname.includes("/dashboard/profile"),
    },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          to={tab.href}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            tab.match
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {tab.icon}
          <span className="ml-2">{tab.name}</span>
        </Link>
      ))}
    </nav>
  );
}
