
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface MobileNavDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  navItems?: Array<{ label: string; path: string }>;
  currentPath?: string;
  onNavigateToProfile?: () => void;
  onSignOut?: () => Promise<void>;
}

export function MobileNavDrawer({ 
  open, 
  onOpenChange, 
  navItems,
  currentPath,
  onNavigateToProfile,
  onSignOut
}: MobileNavDrawerProps = {}) {
  const location = useLocation();
  const pathname = location.pathname;
  const [internalOpen, setInternalOpen] = React.useState(false);
  
  // Use either provided state or internal state
  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <div className="px-2 py-6">
          <div className="mb-4 px-4">
            <h2 className="text-lg font-semibold">Menu</h2>
          </div>
          <nav className="flex flex-col space-y-1">
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent",
                  tab.match
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {tab.icon}
                <span className="ml-3">{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
