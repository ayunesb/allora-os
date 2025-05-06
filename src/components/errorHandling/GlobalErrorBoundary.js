import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { AlertOctagon, RefreshCw, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { logger } from "@/utils/loggingService";
export function GlobalErrorBoundary({ children, onError, fallback }) {
    const handleError = (error, errorInfo) => {
        // Log to our centralized logging service
        logger.error("Global application error:", error, {
            componentStack: errorInfo.componentStack,
            url: window.location.href,
            userAgent: navigator.userAgent,
        });
        // Here you could also integrate with error monitoring services like Sentry
        console.error("Global error caught:", error);
        console.error("Component stack:", errorInfo.componentStack);
        // Call the onError prop if provided
        if (onError) {
            onError(error, errorInfo);
        }
    };
    const GlobalErrorFallback = ({ error, resetErrorBoundary }) => (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted", children: _jsxs(Card, { className: "w-full max-w-md border-destructive/20", children: [_jsx(CardHeader, { className: "space-y-1", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(AlertOctagon, { className: "h-6 w-6 text-destructive" }), _jsx(CardTitle, { children: "Application Error" })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { className: "text-muted-foreground", children: "We've encountered an unexpected error. Our team has been notified and is working to fix it." }), _jsx("div", { className: "bg-muted/50 border border-border p-3 rounded-md overflow-auto max-h-40", children: _jsx("p", { className: "font-mono text-sm", children: error.message || "Unknown error" }) }), _jsxs("div", { className: "bg-card p-4 border border-border rounded-md", children: [_jsx("h3", { className: "text-sm font-medium mb-2", children: "You can try:" }), _jsxs("ul", { className: "text-sm text-muted-foreground space-y-1", children: [_jsx("li", { children: "\u2022 Refreshing the page" }), _jsx("li", { children: "\u2022 Checking your internet connection" }), _jsx("li", { children: "\u2022 Going back to the home page" }), _jsx("li", { children: "\u2022 Logging out and back in" })] })] })] }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", asChild: true, children: _jsxs(Link, { to: "/", className: "inline-flex items-center gap-2", children: [_jsx(Home, { className: "h-4 w-4" }), "Home"] }) }), _jsxs(Button, { onClick: () => {
                                resetErrorBoundary();
                                window.location.reload();
                            }, className: "inline-flex items-center gap-2", children: [_jsx(RefreshCw, { className: "h-4 w-4" }), "Reload App"] })] })] }) }));
    return (_jsx(ErrorBoundary, { fallback: fallback
            ? fallback
            : ({ error, resetErrorBoundary }) => (_jsx(GlobalErrorFallback, { error: error, resetErrorBoundary: resetErrorBoundary })), onError: handleError, children: children }));
}
