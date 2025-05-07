import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "@/components/ui/sheet";
import { Menu, LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useBreakpoint } from "@/hooks/use-mobile";
const MobileNavigation = ({ isOpen, setIsOpen, navItems, onSignOut, isSigningOut, userName, userEmail, }) => {
    const breakpoint = useBreakpoint();
    const isXSmall = breakpoint === "xs";
    // Create the user's initials for the avatar
    const getInitials = () => {
        if (!userName)
            return "U";
        const parts = userName.split(" ");
        if (parts.length === 1)
            return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };
    return (_jsxs(Sheet, { open: isOpen, onOpenChange: setIsOpen, children: [_jsx(SheetTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "sm", className: "mr-2 flex md:hidden touch-target", "aria-label": "Toggle Menu", children: _jsx(Menu, { className: "h-5 w-5" }) }) }), _jsxs(SheetContent, { side: "left", className: "pr-0 w-[85vw] max-w-[280px] sm:max-w-[320px]", children: [_jsx(SheetHeader, { className: "text-left", children: _jsxs("div", { className: "flex items-center mb-4", children: [_jsx(Avatar, { className: "h-10 w-10 mr-3", children: _jsx(AvatarFallback, { children: getInitials() }) }), _jsxs("div", { className: "flex flex-col overflow-hidden", children: [_jsx(SheetTitle, { className: "text-left truncate", children: userName || "Dashboard Menu" }), userEmail && (_jsx(SheetDescription, { className: "text-left text-xs mt-1 truncate", children: userEmail }))] })] }) }), _jsx("div", { className: "py-4", children: navItems.map((item) => (_jsx(Link, { to: item.href, onClick: () => setIsOpen(false), children: _jsxs(Button, { variant: "ghost", className: "w-full justify-start text-base py-3 h-auto", children: [_jsx(item.icon, { className: "mr-3 h-5 w-5" }), item.name] }) }, item.name))) }), _jsxs("div", { className: "absolute bottom-0 left-0 right-0 border-t border-border/50 p-4", children: [_jsxs(Button, { variant: "outline", className: "w-full justify-start mb-2", onClick: () => {
                                    // Navigate to profile page
                                    setIsOpen(false);
                                }, children: [_jsx(Settings, { className: "mr-2 h-4 w-4" }), "Settings"] }), _jsxs(Button, { variant: "destructive", className: "w-full justify-start", onClick: onSignOut, disabled: isSigningOut, children: [_jsx(LogOut, { className: "mr-2 h-4 w-4" }), isSigningOut ? "Signing out..." : "Sign Out"] })] })] })] }));
};
export default MobileNavigation;
