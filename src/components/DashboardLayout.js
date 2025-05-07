import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/ui/loading";
import { normalizeUserObject } from "@/utils/authCompatibility";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";
export default function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const authContext = useAuth();
    const auth = createAuthCompatibilityLayer(authContext);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const normalizedUser = normalizeUserObject(auth === null || auth === void 0 ? void 0 : auth.user);
    const isLoading = (auth === null || auth === void 0 ? void 0 : auth.isLoading) || (auth === null || auth === void 0 ? void 0 : auth.loading);
    useEffect(() => {
        // Close sidebar when route changes
        setSidebarOpen(false);
    }, [location.pathname]);
    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading && !(auth === null || auth === void 0 ? void 0 : auth.user)) {
            navigate("/auth", { state: { from: location.pathname } });
        }
    }, [auth === null || auth === void 0 ? void 0 : auth.user, isLoading, navigate, location.pathname]);
    // Check for admin routes and redirect if not admin
    useEffect(() => {
        var _a;
        if (!isLoading &&
            (auth === null || auth === void 0 ? void 0 : auth.user) &&
            location.pathname.startsWith("/admin") &&
            (normalizedUser === null || normalizedUser === void 0 ? void 0 : normalizedUser.role) !== "admin" &&
            !((_a = normalizedUser === null || normalizedUser === void 0 ? void 0 : normalizedUser.app_metadata) === null || _a === void 0 ? void 0 : _a.is_admin)) {
            navigate("/dashboard", { replace: true });
        }
    }, [auth === null || auth === void 0 ? void 0 : auth.user, isLoading, navigate, location.pathname, normalizedUser]);
    if (isLoading) {
        return (_jsx("div", { className: "flex items-center justify-center min-h-screen", children: _jsx(Loading, { size: "lg", text: "Loading dashboard..." }) }));
    }
    if (!(auth === null || auth === void 0 ? void 0 : auth.user)) {
        return null; // Will redirect to login via useEffect
    }
    return (_jsxs("div", { className: "flex min-h-screen bg-background", children: [_jsx("div", { className: "hidden md:flex", children: _jsx(Sidebar, { className: "w-64 border-r min-h-screen" }) }), _jsx("div", { className: "md:hidden", children: _jsx(MobileSidebar, { open: sidebarOpen, onClose: () => setSidebarOpen(false) }) }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "md:hidden flex items-center p-4 border-b", children: [_jsxs(Button, { variant: "outline", size: "icon", className: "mr-4", onClick: () => setSidebarOpen(true), children: [_jsx(Menu, { className: "h-5 w-5" }), _jsx("span", { className: "sr-only", children: "Toggle menu" })] }), _jsx("h1", { className: "font-semibold", children: "Dashboard" })] }), _jsx("main", { className: "p-4 md:p-6 lg:p-8", children: _jsx(Outlet, {}) })] })] }));
}
