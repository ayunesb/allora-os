import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { useToast } from "@/components/ui/use-toast";
import { useSubscription } from "@/hooks/useSubscription";
import { Icons } from "@/components/Icons";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";
import { Home, LayoutDashboard, Settings, HelpCircle, LogOut, BarChart3 } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType;
}

export function Navbar() {
  const { signOut } = useAuth();
  const { toast } = useToast();
  const { user } = useAuth();
  const { subscription } = useSubscription();
  const { settings, updateSettings } = useSettings();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      navigate("/sign-in");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  const navItems: NavItem[] = [
    {
      name: "Home",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Strategies",
      href: "/dashboard/strategies",
      icon: LayoutDashboard,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
  ];

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Sheet open={open} onOpenChange={setOpen}>
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
            <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </SheetContent>
        </Sheet>
        <Link className="ml-auto font-bold text-2xl flex items-center" to="/dashboard">
          <Icons.logo className="h-6 w-6 mr-2" />
          <span>Allora AI</span>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 data-[state=open]:bg-muted">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image} alt={user?.name} />
                  <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/faq">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>FAQ</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {subscription?.status === "active" ? null : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/pricing">Upgrade</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onClick={handleSignOut}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="hidden md:flex justify-center space-x-6 p-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
              location.pathname === item.href
                ? "bg-secondary text-foreground"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
