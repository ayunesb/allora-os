
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";
import { Link } from "react-router-dom";
import { 
  Home, 
  Users, 
  GitBranch, 
  Phone, 
  BarChart2, 
  Calendar, 
  Bot, 
  Settings,
  MessageSquare,
  ShoppingCart,
  Activity,
  Bell,
  Cpu,
  X,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPath: string;
}

export function MobileNavDrawer({ open, onOpenChange, currentPath }: MobileNavDrawerProps) {
  const isActive = (path: string) => {
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
      name: "Calendar",
      path: "/dashboard/calendar",
      icon: <Calendar className="h-5 w-5" />
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
      name: "Shop",
      path: "/dashboard/shop",
      icon: <ShoppingCart className="h-5 w-5" />
    },
    {
      name: "Analytics",
      path: "/dashboard/analytics",
      icon: <Activity className="h-5 w-5" />
    },
    {
      name: "Approvals",
      path: "/dashboard/approvals",
      icon: <Bell className="h-5 w-5" />
    },
    {
      name: "Integrations",
      path: "/dashboard/integrations",
      icon: <Cpu className="h-5 w-5" />
    },
    {
      name: "Technical",
      path: "/dashboard/technical-improvements",
      icon: <Zap className="h-5 w-5" />
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />
    }
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
        <div className="py-4">
          {tabs.map((tab) => (
            <Link
              to={tab.path}
              key={tab.name}
              className={`flex items-center space-x-2 p-3 hover:bg-accent rounded-md transition-colors ${
                isActive(tab.path) ? "font-medium" : ""
              }`}
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
