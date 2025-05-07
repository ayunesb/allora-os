import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
export function UserDropdown({ onSignOut }) {
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full", children: _jsx(User, { className: "h-5 w-5" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuLabel, { children: "My Account" }), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { to: "/dashboard/profile", children: [_jsx(Settings, { className: "mr-2 h-4 w-4" }), "Profile Settings"] }) }), _jsx(DropdownMenuSeparator, {}), _jsxs(DropdownMenuItem, { onClick: onSignOut, children: [_jsx(LogOut, { className: "mr-2 h-4 w-4" }), "Logout"] })] })] }));
}
