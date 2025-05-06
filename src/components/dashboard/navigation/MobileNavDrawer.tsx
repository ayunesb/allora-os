import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { Link } from "react-router-dom";
import {
  Home,
  Users,
  GitBranch,
  Phone,
  BarChart2,
  Bot,
  Settings,
  MessageSquare,
  Activity,
  ClipboardList,
  Globe,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
export function MobileNavDrawer({ open, onOpenChange, currentPath }) {
  const isActive = (path) => {
    // Special case for strategies/strategy route
    if (
      path === "/dashboard/strategies" &&
      (currentPath === "/dashboard/strategies" ||
        currentPath === "/dashboard/strategy")
    ) {
      return true;
    }
    return currentPath === path || currentPath.startsWith(path + "/");
  };
  const tabs = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Home className="h-5 w-5" />,
      exact: true,
    },
    {
      name: "Leads",
      path: "/dashboard/leads",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Strategies",
      path: "/dashboard/strategies",
      icon: <GitBranch className="h-5 w-5" />,
    },
    {
      name: "Calls",
      path: "/dashboard/calls",
      icon: <Phone className="h-5 w-5" />,
    },
    {
      name: "Campaigns",
      path: "/dashboard/campaigns",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      name: "Executives",
      path: "/dashboard/executives",
      icon: <Bot className="h-5 w-5" />,
    },
    {
      name: "Decisions",
      path: "/dashboard/decisions",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      name: "Forecast",
      path: "/dashboard/forecast",
      icon: <Activity className="h-5 w-5" />,
    },
    {
      name: "Digital Twin",
      path: "/dashboard/digital-twin",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      name: "AI Bots",
      path: "/dashboard/ai-bots",
      icon: <Bot className="h-5 w-5" />,
    },
    {
      name: "Debate",
      path: "/dashboard/debate",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="p-4 flex justify-end">
          <DrawerClose asChild>
            <Button variant="ghost" className="hover:bg-accent rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </div>
        <div className="py-4 max-h-[70vh] overflow-y-auto">
          {tabs.map((tab) => (
            <Link
              to={tab.path}
              key={tab.name}
              className={`flex items-center space-x-2 p-3 hover:bg-accent rounded-md transition-colors ${isActive(tab.path) ? "font-medium" : ""}`}
              onClick={() => onOpenChange(false)}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
