
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu, 
  Home, 
  LayoutDashboard, 
  BarChart3, 
  Shield,
  LogOut
} from "lucide-react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

interface MobileNavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  navItems: Array<{
    name: string;
    href: string;
    icon: React.FC<{ className?: string }>;
  }>;
  onSignOut: () => void;
  isSigningOut: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  setIsOpen,
  navItems,
  onSignOut,
  isSigningOut
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="mr-2 flex md:hidden"
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <SheetHeader className="text-left">
          <SheetTitle>Dashboard Menu</SheetTitle>
          <SheetDescription>
            Navigate through different sections of the dashboard.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {navItems.map((item) => (
            <Link key={item.name} to={item.href}>
              <Button variant="ghost" className="w-full justify-start">
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
        <SheetTitle>Account</SheetTitle>
        <DropdownMenuSeparator />
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          onClick={onSignOut}
          disabled={isSigningOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isSigningOut ? "Signing out..." : "Sign Out"}
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
