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
import { Menu, LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useBreakpoint } from "@/hooks/use-mobile";
const MobileNavigation = ({
  isOpen,
  setIsOpen,
  navItems,
  onSignOut,
  isSigningOut,
  userName,
  userEmail,
}) => {
  const breakpoint = useBreakpoint();
  const isXSmall = breakpoint === "xs";
  // Create the user's initials for the avatar
  const getInitials = () => {
    if (!userName) return "U";
    const parts = userName.split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (
      parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
    ).toUpperCase();
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="mr-2 flex md:hidden touch-target"
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="pr-0 w-[85vw] max-w-[280px] sm:max-w-[320px]"
      >
        <SheetHeader className="text-left">
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <SheetTitle className="text-left truncate">
                {userName || "Dashboard Menu"}
              </SheetTitle>
              {userEmail && (
                <SheetDescription className="text-left text-xs mt-1 truncate">
                  {userEmail}
                </SheetDescription>
              )}
            </div>
          </div>
        </SheetHeader>

        <div className="py-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
            >
              <Button
                variant="ghost"
                className="w-full justify-start text-base py-3 h-auto"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border/50 p-4">
          <Button
            variant="outline"
            className="w-full justify-start mb-2"
            onClick={() => {
              // Navigate to profile page
              setIsOpen(false);
            }}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>

          <Button
            variant="destructive"
            className="w-full justify-start"
            onClick={onSignOut}
            disabled={isSigningOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isSigningOut ? "Signing out..." : "Sign Out"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default MobileNavigation;
