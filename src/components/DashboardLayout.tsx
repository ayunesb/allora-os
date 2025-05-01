
import React, { ReactNode, useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Settings,
  Users,
  Rocket,
  Menu,
  X
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive: routeIsActive }) =>
        cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          (isActive || routeIsActive) ? "bg-accent text-accent-foreground" : "text-muted-foreground"
        )
      }
    >
      {icon}
      {label}
    </NavLink>
  );
};

const Sidebar = ({ onNavItemClick }: { onNavItemClick?: () => void }) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.app_metadata?.is_admin;
  
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Allora OS
        </h2>
        <div className="space-y-1">
          <NavItem
            to="/dashboard"
            icon={<LayoutDashboard className="h-5 w-5" />}
            label="Dashboard"
            onClick={onNavItemClick}
          />
          <NavItem
            to="/dashboard/strategies"
            icon={<Rocket className="h-5 w-5" />}
            label="Strategies"
            onClick={onNavItemClick}
          />
          <NavItem
            to="/dashboard/team"
            icon={<Users className="h-5 w-5" />}
            label="Team"
            onClick={onNavItemClick}
          />
        </div>
      </div>
      <Separator />
      <div className="px-3 py-2">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Settings
        </h2>
        <div className="space-y-1">
          <NavItem
            to="/dashboard/settings"
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            onClick={onNavItemClick}
          />
          {isAdmin && (
            <NavItem
              to="/admin"
              icon={<Settings className="h-5 w-5" />}
              label="Admin"
              onClick={onNavItemClick}
            />
          )}
        </div>
      </div>
      <ScrollArea className="flex-1">
        {/* Scrollable content as needed */}
      </ScrollArea>
    </div>
  );
};

interface DashboardLayoutProps {
  children?: ReactNode;
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex h-5 items-center">
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="absolute right-4 top-4">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <Sidebar onNavItemClick={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>
        <div className="flex-1">
          <h1 className="text-xl font-semibold">Allora OS</h1>
        </div>
      </header>
      <div className="flex-1 flex">
        <aside className="hidden border-r bg-background md:block md:w-[240px] lg:w-[300px]">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)]">
            <Sidebar />
          </div>
        </aside>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
