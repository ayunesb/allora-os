
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavItem {
  label: string;
  path: string;
}

interface MobileNavDrawerProps {
  navItems: NavItem[];
  currentPath: string;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  onNavigateToProfile: () => void;
  onSignOut: () => void;
}

export function MobileNavDrawer({
  navItems,
  currentPath,
  onOpenChange,
  open,
  onNavigateToProfile,
  onSignOut
}: MobileNavDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <div className="py-6">
          <h2 className="text-lg font-semibold mb-4">Navigation</h2>
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={`px-4 py-2 rounded-md ${
                  currentPath.startsWith(item.path) 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-muted"
                }`}
                onClick={() => onOpenChange(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-8 pt-4 border-t">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={onNavigateToProfile}
            >
              <Settings className="mr-2 h-4 w-4" />
              Profile Settings
            </Button>
            
            <Button 
              variant="destructive" 
              className="w-full justify-start mt-2" 
              onClick={onSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Add missing imports at the top
import { Settings, LogOut } from "lucide-react";
