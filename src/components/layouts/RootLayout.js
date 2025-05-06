import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { setupAccessibleErrorHandling } from "@/utils/api/errorHandling";
import { logger } from "@/utils/loggingService";
import { AccessibilityButton } from "@/components/accessibility/AccessibilityPanel";
import { HelpProvider } from "@/context/HelpContext";
import { HelpModal } from "@/components/help/HelpModal";
import AccessibilityAnnouncer from "@/components/accessibility/AccessibilityAnnouncer";
import { Link } from "react-router-dom";
export default function RootLayout() {
    // Apply any global effects or settings when the root layout mounts
    React.useEffect(() => {
        try {
            logger.info("RootLayout mounted");
            document.documentElement.classList.add("antialiased");
            setupAccessibleErrorHandling();
            return () => {
                logger.info("RootLayout unmounted");
                document.documentElement.classList.remove("antialiased");
            };
        }
        catch (error) {
            logger.error("Error in RootLayout useEffect:", error);
        }
    }, []);
    // Check if we're inside a Router context to safely render AccessibilityAnnouncer
    let isRouterContextAvailable = true;
    try {
        // This will throw if not in Router context
        useLocation();
    }
    catch (e) {
        isRouterContextAvailable = false;
    }
    return (_jsx(ErrorBoundary, { children: _jsx(HelpProvider, { children: _jsxs("div", { className: "min-h-screen bg-background text-foreground font-sans", children: [_jsx("header", { className: "border-b px-6 py-4 bg-white/10 sticky top-0 z-50 backdrop-blur", children: _jsxs("div", { className: "max-w-7xl mx-auto flex items-center justify-between", children: [_jsx("h1", { className: "text-xl font-heading font-semibold", children: "Allora OS" }), _jsx("nav", { className: "hidden md:block", children: _jsxs("ul", { className: "flex items-center space-x-6", children: [_jsx("li", { children: _jsx(Link, { to: "/dashboard", className: "hover:text-primary transition-colors", children: "Dashboard" }) }), _jsx("li", { children: _jsx(Link, { to: "/strategies", className: "hover:text-primary transition-colors", children: "Strategies" }) }), _jsx("li", { children: _jsx(Link, { to: "/settings", className: "hover:text-primary transition-colors", children: "Settings" }) })] }) })] }) }), _jsx("main", { className: "max-w-7xl mx-auto p-6 space-y-8", children: _jsx(Outlet, {}) }), _jsx(Toaster, {}), _jsx(AccessibilityButton, {}), _jsx(HelpModal, {}), isRouterContextAvailable && _jsx(AccessibilityAnnouncer, {})] }) }) }));
}
