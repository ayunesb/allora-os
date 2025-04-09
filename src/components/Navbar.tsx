
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { BarChart3 } from "lucide-react";
import ThemeToggle from "./navigation/ThemeToggle";
import UserMenu from "./navigation/UserMenu";
import MobileNavigation from "./navigation/MobileNavigation";
import { toast } from "sonner";

// Logo component
const Logo = ({ className }: { className?: string }) => (
  <div className={cn("rounded-full bg-primary/10 p-1", className)}>
    <BarChart3 className="h-5 w-5 text-primary" />
  </div>
);

// Navigation items definition
const getNavItems = () => [
  {
    name: "Home",
    href: "/dashboard",
    icon: ({ className }: { className?: string }) => <BarChart3 className={className} />,
  },
  {
    name: "Strategies",
    href: "/dashboard/strategies",
    icon: ({ className }: { className?: string }) => <BarChart3 className={className} />,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: ({ className }: { className?: string }) => <BarChart3 className={className} />,
  },
  {
    name: "Compliance",
    href: "/compliance",
    icon: ({ className }: { className?: string }) => <BarChart3 className={className} />,
  }
];

export function Navbar({ isLoggedIn = true }) {
  const { signOut, user, profile } = useAuth();
  const { toast: uiToast } = useToast();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);
  
  // Mock subscription data
  const subscription = { status: "inactive" };
  const navItems = getNavItems();

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      const result = await signOut();
      
      if (result && !result.success) {
        throw new Error(result.error || "Failed to sign out");
      }
      
      toast("Signed out successfully");
      navigate("/login");
    } catch (error: any) {
      uiToast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MobileNavigation 
          isOpen={open}
          setIsOpen={setOpen}
          navItems={navItems}
          onSignOut={handleSignOut}
          isSigningOut={isSigningOut}
        />
        
        <Link className="ml-auto font-bold text-2xl flex items-center" to="/dashboard">
          <Logo className="h-6 w-6 mr-2" />
          <span>Allora AI</span>
        </Link>
        
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserMenu 
            avatarUrl={profile?.avatar_url} 
            name={profile?.name}
            email={user?.email}
            onSignOut={handleSignOut}
            isSigningOut={isSigningOut}
            hasActiveSubscription={subscription?.status === "active"}
          />
        </div>
      </div>
      
      {isLoggedIn && (
        <div className="hidden md:flex justify-center space-x-6 p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
                location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
