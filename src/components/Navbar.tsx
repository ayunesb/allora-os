
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RocketIcon, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const isMobile = useIsMobile();
  
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
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center space-x-6">
            <NavLinks />
          </div>
        )}
      </div>
    </nav>
  );
}
