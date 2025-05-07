import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useUser } from "@/hooks/useUser";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getUserDisplayName, getUserAvatar } from "@/utils/authCompatibility";
export const Navbar = () => {
    const { user } = useUser();
    return (_jsx("nav", { className: "bg-background border-b border-border/40 px-4 py-3", children: _jsxs("div", { className: "max-w-7xl mx-auto flex justify-between items-center", children: [_jsx(Link, { to: "/", className: "font-bold text-xl text-primary", children: "Allora AI" }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx(Link, { to: "/dashboard", className: "text-sm font-medium hover:text-primary", children: "Dashboard" }), _jsx(Link, { to: "/campaigns", className: "text-sm font-medium hover:text-primary", children: "Campaigns" }), _jsx(Link, { to: "/analytics", className: "text-sm font-medium hover:text-primary", children: "Analytics" }), user ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: getUserAvatar(user), alt: `${getUserDisplayName(user)}'s avatar`, className: "w-8 h-8 rounded-full" }), _jsx("span", { className: "text-sm font-medium", children: getUserDisplayName(user) })] })) : (_jsx(Button, { asChild: true, size: "sm", children: _jsx(Link, { to: "/login", children: "Sign In" }) }))] })] }) }));
};
// This is exported as default for backwards compatibility
export default Navbar;
