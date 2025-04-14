
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Laptop, LogOut, Settings, User, CreditCard } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@/hooks/useUser";

export default function Navbar() {
  const { user, signOut } = useAuth();
  const { userDetails } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  const isAuthPage = 
    location.pathname === "/login" || 
    location.pathname === "/signup" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/forgot-password";
  
  const isLandingPage = 
    location.pathname === "/" || 
    location.pathname === "/pricing" || 
    location.pathname === "/faq" ||
    location.pathname === "/contact";
  
  const isDashboardPage = location.pathname.startsWith("/dashboard");
  const isAdminPage = location.pathname.startsWith("/admin");
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };
  
  const getInitials = () => {
    if (!user) return "U";
    if (userDetails?.name) {
      return userDetails.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    return user.email ? user.email[0].toUpperCase() : "U";
  };
  
  // Mobile navigation links
  const renderMobileNav = () => {
    return (
      <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col h-full py-6">
            <div className="flex-1 space-y-4">
              {user ? (
                <>
                  <div className="border-b pb-4 mb-4">
                    <div className="flex items-center gap-3 py-3">
                      <Avatar>
                        <AvatarImage src={userDetails?.avatar_url || ""} />
                        <AvatarFallback>{getInitials()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{userDetails?.name || user.email}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <nav className="flex flex-col space-y-1">
                    <Link
                      to="/dashboard"
                      className="py-2 px-3 rounded-md hover:bg-accent transition-colors"
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/leads"
                      className="py-2 px-3 rounded-md hover:bg-accent transition-colors"
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Leads
                    </Link>
                    <Link
                      to="/dashboard/campaigns"
                      className="py-2 px-3 rounded-md hover:bg-accent transition-colors"
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Campaigns
                    </Link>
                    <Link
                      to="/dashboard/strategy"
                      className="py-2 px-3 rounded-md hover:bg-accent transition-colors"
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Strategy
                    </Link>
                    <Link
                      to="/dashboard/billing"
                      className="py-2 px-3 rounded-md hover:bg-accent transition-colors"
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Billing & Subscription
                    </Link>
                    <Link
                      to="/dashboard/account"
                      className="py-2 px-3 rounded-md hover:bg-accent transition-colors"
                      onClick={() => setIsMobileNavOpen(false)}
                    >
                      Account
                    </Link>
                    {userDetails?.is_admin && (
                      <Link
                        to="/admin"
                        className="py-2 px-3 rounded-md hover:bg-accent transition-colors"
                        onClick={() => setIsMobileNavOpen(false)}
                      >
                        Admin
                      </Link>
                    )}
                  </nav>
                </>
              ) : (
                <nav className="flex flex-col space-y-1">
                  <Link
                    to="/"
                    className="py-2 px-3 rounded-md hover:bg-accent transition-colors"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/pricing"
                    className="py-2 px-3 rounded-md hover:bg-accent transition-colors"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/faq"
                    className="py-2 px-3 rounded-md hover:bg-accent transition-colors"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/contact"
                    className="py-2 px-3 rounded-md hover:bg-accent transition-colors"
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    Contact
                  </Link>
                </nav>
              )}
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <ThemeToggle />
                {user ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileNavOpen(false);
                    }}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <div className="space-x-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        navigate("/login");
                        setIsMobileNavOpen(false);
                      }}
                    >
                      Log In
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/signup");
                        setIsMobileNavOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  };
  
  // Desktop navigation links
  const renderDesktopNav = () => {
    if (isLandingPage) {
      return (
        <div className="hidden md:flex gap-6">
          <Link
            to="/"
            className={cn(
              "text-sm transition-colors hover:text-primary",
              location.pathname === "/" ? "text-primary font-medium" : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link
            to="/pricing"
            className={cn(
              "text-sm transition-colors hover:text-primary",
              location.pathname === "/pricing" ? "text-primary font-medium" : "text-muted-foreground"
            )}
          >
            Pricing
          </Link>
          <Link
            to="/faq"
            className={cn(
              "text-sm transition-colors hover:text-primary",
              location.pathname === "/faq" ? "text-primary font-medium" : "text-muted-foreground"
            )}
          >
            FAQ
          </Link>
          <Link
            to="/contact"
            className={cn(
              "text-sm transition-colors hover:text-primary",
              location.pathname === "/contact" ? "text-primary font-medium" : "text-muted-foreground"
            )}
          >
            Contact
          </Link>
        </div>
      );
    }
    
    return null;
  };
  
  // Don't show navbar on auth pages
  if (isAuthPage) return null;
  
  // Don't show normal navbar on admin pages
  if (isAdminPage) return null;
  
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all",
        isScrolled || !isLandingPage
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
          : ""
      )}
    >
      <div className="container flex h-16 items-center">
        <div className="flex items-center justify-between w-full">
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
            <img src="/logo.png" alt="Allora AI" className="h-8 w-8" />
            <span className="font-bold text-xl">Allora AI</span>
          </Link>
          
          {renderDesktopNav()}
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userDetails?.avatar_url || ""} alt={userDetails?.name || "User"} />
                      <AvatarFallback>{getInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {userDetails?.name && (
                        <p className="font-medium">{userDetails.name}</p>
                      )}
                      {user.email && (
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <Laptop className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/account">
                      <User className="mr-2 h-4 w-4" />
                      <span>Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/billing">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={(e) => {
                      e.preventDefault();
                      handleSignOut();
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button onClick={() => navigate("/signup")}>Sign Up</Button>
              </div>
            )}
            
            {renderMobileNav()}
          </div>
        </div>
      </div>
    </header>
  );
}
