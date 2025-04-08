
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RocketIcon, Menu, LogOut, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Update the props type to include optional isLoggedIn
interface NavbarProps {
  isLoggedIn?: boolean;
}

export default function Navbar({ isLoggedIn: propIsLoggedIn }: NavbarProps = {}) {
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  // Use the prop if provided, otherwise derive from user state
  const isLoggedIn = propIsLoggedIn !== undefined ? propIsLoggedIn : !!user;
  
  const navLinks = isLoggedIn ? [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Strategies", href: "/dashboard/strategies" },
    { name: "Campaigns", href: "/dashboard/campaigns" },
    { name: "Calls", href: "/dashboard/calls" },
    { name: "Leads", href: "/dashboard/leads" },
    { name: "AI Team", href: "/dashboard/ai-bots" },
  ] : [
    { name: "Home", href: "/" },
    { name: "Login", href: "/login" },
    { name: "Signup", href: "/signup" },
  ];

  // Check if user has admin access (simplified for demo)
  const isAdmin = isLoggedIn && user?.email === 'admin@example.com';
  
  if (isAdmin) {
    navLinks.push({ name: "Admin", href: "/admin" });
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    toast.success('You have been logged out');
  };

  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.name}
          to={link.href}
          className="text-gray-300 hover:text-white transition-colors"
        >
          {link.name}
        </Link>
      ))}
    </>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <RocketIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Allora AI</span>
        </Link>

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-6 mt-6">
                <NavLinks />
                {isLoggedIn && (
                  <Button 
                    variant="destructive" 
                    onClick={handleSignOut}
                    className="mt-4"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center space-x-6">
            <NavLinks />
            
            {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
