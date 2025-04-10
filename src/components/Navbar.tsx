
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { BarChart3, Home, ChartBar, Shield, HelpCircle, CreditCard } from "lucide-react";
import ThemeToggle from "./navigation/ThemeToggle";
import UserMenu from "./navigation/UserMenu";
import MobileNavigation from "./navigation/MobileNavigation";
import { toast } from "sonner";
import { useBreakpoint } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

// Navigation items definition with better icons
const getNavItems = () => [
  {
    name: "Home",
    href: "/dashboard",
    icon: ({ className }: { className?: string }) => <Home className={className} />,
  },
  {
    name: "Strategies",
    href: "/dashboard/strategies",
    icon: ({ className }: { className?: string }) => <BarChart3 className={className} />,
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: ({ className }: { className?: string }) => <ChartBar className={className} />,
  },
  {
    name: "Compliance",
    href: "/compliance",
    icon: ({ className }: { className?: string }) => <Shield className={className} />,
  }
];

// Public navigation items
const getPublicNavItems = () => [
  {
    name: "Pricing",
    href: "/pricing",
    icon: ({ className }: { className?: string }) => <CreditCard className={className} />,
  },
  {
    name: "FAQ",
    href: "/faq",
    icon: ({ className }: { className?: string }) => <HelpCircle className={className} />,
  },
];

export function Navbar({ isLoggedIn = false }) {
  // Get auth context - safely handle not being in context
  let authValues = { signOut: null, user: null, profile: null };
  try {
    authValues = useAuth();
  } catch (error) {
    console.log("Auth context not available yet");
  }
  
  const { signOut, user, profile } = authValues;
  const { toast: uiToast } = useToast();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const breakpoint = useBreakpoint();
  
  // Mock subscription data
  const subscription = { status: "inactive" };
  const navItems = getNavItems();
  const publicNavItems = getPublicNavItems();

  const handleSignOut = async () => {
    if (!signOut) return;
    
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
          navItems={isLoggedIn ? navItems : publicNavItems}
          onSignOut={handleSignOut}
          isSigningOut={isSigningOut}
          userName={profile?.name}
          userEmail={user?.email}
        />
        
        <Link 
          className={cn(
            "flex items-center font-bold", 
            ['xs', 'mobile'].includes(breakpoint) ? "text-xl" : "text-2xl",
            ['xs', 'mobile'].includes(breakpoint) ? "ml-2" : "ml-auto"
          )}
          to="/"
        >
          <img 
            src="/lovable-uploads/fa68c49e-02d3-4f17-b128-a5b8f6f1665b.png" 
            alt="Allora AI Logo" 
            className={cn(
              "mr-2",
              ['xs', 'mobile'].includes(breakpoint) ? "h-8" : "h-10"
            )} 
          />
          <span className="hidden sm:inline">Allora AI</span>
        </Link>

        {/* Public Navigation - Always visible, not conditional on login status */}
        <div className="hidden md:flex ml-6 space-x-4">
          <Link 
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          {publicNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="ml-auto flex items-center space-x-3 sm:space-x-4">
          <ThemeToggle />
          {isLoggedIn ? (
            <UserMenu 
              avatarUrl={profile?.avatar_url} 
              name={profile?.name}
              email={user?.email}
              onSignOut={handleSignOut}
              isSigningOut={isSigningOut}
              hasActiveSubscription={subscription?.status === "active"}
            />
          ) : (
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {isLoggedIn && (
        <div className="hidden md:flex justify-center space-x-3 lg:space-x-6 p-2 md:p-4 overflow-x-auto scrollbar-none">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center space-x-2 rounded-md px-2 py-1.5 md:px-3 md:py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground whitespace-nowrap",
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
