import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
export function DashboardBreadcrumb({ rootPath, rootLabel, rootIcon, currentPath, currentLabel, }) {
    return (_jsxs("div", { className: "flex items-center text-sm mb-6 text-muted-foreground", children: [_jsx(Link, { to: "/dashboard", className: "hover:text-foreground transition-colors", children: "Dashboard" }), _jsx(ChevronRight, { className: "h-4 w-4 mx-2" }), _jsxs(Link, { to: rootPath, className: "flex items-center hover:text-foreground transition-colors", children: [rootIcon && _jsx("span", { className: "mr-1.5", children: rootIcon }), rootLabel] }), currentPath && currentLabel && (_jsxs(_Fragment, { children: [_jsx(ChevronRight, { className: "h-4 w-4 mx-2" }), _jsx(Link, { to: currentPath, className: "text-foreground font-medium", children: currentLabel })] }))] }));
}
