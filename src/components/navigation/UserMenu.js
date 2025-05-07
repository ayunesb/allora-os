import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Settings, HelpCircle } from "lucide-react";
const UserMenu = ({ avatarUrl, name, email, onSignOut, isSigningOut, hasActiveSubscription, }) => {
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", className: "h-8 w-8 p-0 data-[state=open]:bg-muted", children: _jsxs(Avatar, { className: "h-8 w-8", children: [_jsx(AvatarImage, { src: avatarUrl || "", alt: name || "" }), _jsx(AvatarFallback, { children: (name === null || name === void 0 ? void 0 : name[0]) || (email === null || email === void 0 ? void 0 : email[0]) })] }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: "My Account" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { to: "/dashboard/settings", children: [_jsx(Settings, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "Settings" })] }) }), _jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { to: "/faq", children: [_jsx(HelpCircle, { className: "mr-2 h-4 w-4" }), _jsx("span", { children: "FAQ" })] }) }), _jsx(DropdownMenuSeparator, {}), !hasActiveSubscription && (_jsxs(_Fragment, { children: [_jsx(DropdownMenuItem, { asChild: true, children: _jsx(Link, { to: "/pricing", children: "Upgrade" }) }), _jsx(DropdownMenuSeparator, {})] })), _jsx(DropdownMenuItem, { onClick: onSignOut, disabled: isSigningOut, className: "cursor-pointer", children: isSigningOut ? "Signing out..." : "Sign out" })] })] }));
};
export default UserMenu;
