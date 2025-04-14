
import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  Users, 
  GitBranch, 
  Phone, 
  BarChart2, 
  Bot, 
  Settings,
  MessageSquare,
  Activity
} from "lucide-react";

const DashboardTabs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    // Special case for strategies/strategy route
    if (path === "/dashboard/strategies" && 
        (currentPath === "/dashboard/strategies" || currentPath === "/dashboard/strategy")) {
      return true;
    }
    return currentPath === path || currentPath.startsWith(path + "/");
  };

  const tabs = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-5 w-5" />,
      exact: true
    },
    {
      name: "Leads",
      path: "/dashboard/leads",
      icon: <Users className="h-5 w-5" />
    },
    {
      name: "Strategies",
      path: "/dashboard/strategies",
      icon: <GitBranch className="h-5 w-5" />
    },
    {
      name: "Calls",
      path: "/dashboard/calls",
      icon: <Phone className="h-5 w-5" />
    },
    {
      name: "Campaigns",
      path: "/dashboard/campaigns",
      icon: <BarChart2 className="h-5 w-5" />
    },
    {
      name: "Executives",
      path: "/dashboard/executives",
      icon: <Bot className="h-5 w-5" />
    },
    {
      name: "AI Bots",
      path: "/dashboard/ai-bots",
      icon: <Bot className="h-5 w-5" />
    },
    {
      name: "Debate",
      path: "/dashboard/debate",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: <Activity className="h-5 w-5" />
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />
    }
  ];

  return (
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6 overflow-x-auto pb-2 w-full">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          to={tab.path}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
            isActive(tab.path)
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
};

export default memo(DashboardTabs);
