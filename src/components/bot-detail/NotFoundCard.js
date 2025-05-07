import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { ArrowLeft, AlertCircle, Home, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { logger } from "@/utils/loggingService";
const NotFoundCard = ({ resourceType = "Advisor", redirectPath = "/dashboard/ai-bots", redirectLabel = "Back to Advisors", message = "We couldn't find the executive advisor you're looking for. This may be because the advisor has been removed or the URL is incorrect.", autoRedirectDelay = 0, // 0 means no auto-redirect
logError = true, }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (logError) {
            // Log the 404 error for this resource
            logger.error(`Resource not found: ${resourceType} at path ${window.location.pathname}`);
        }
        // If autoRedirectDelay is specified, automatically redirect after the delay
        if (autoRedirectDelay > 0) {
            const timer = setTimeout(() => {
                toast.info(`Redirecting to ${redirectLabel}`);
                navigate(redirectPath);
            }, autoRedirectDelay * 1000);
            return () => clearTimeout(timer);
        }
    }, [
        navigate,
        autoRedirectDelay,
        redirectPath,
        redirectLabel,
        resourceType,
        logError,
    ]);
    return (_jsxs(CardContent, { className: "pt-6 flex flex-col items-center justify-center min-h-[300px]", children: [_jsx("div", { className: "mb-4 text-destructive", children: _jsx(AlertCircle, { className: "h-12 w-12", "aria-hidden": "true" }) }), _jsxs("h2", { className: "text-xl font-semibold mb-2", id: "not-found-title", children: [resourceType, " not found"] }), _jsxs(Alert, { variant: "destructive", className: "mb-4", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Not Found" }), _jsx(AlertDescription, { children: message })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mt-2", children: [_jsx(Link, { to: redirectPath, "aria-labelledby": "not-found-title", children: _jsxs(Button, { variant: "outline", className: "flex items-center gap-2", children: [_jsx(ArrowLeft, { className: "h-4 w-4", "aria-hidden": "true" }), _jsx("span", { children: redirectLabel })] }) }), _jsx(Link, { to: "/dashboard", "aria-label": "Return to dashboard", children: _jsxs(Button, { variant: "secondary", className: "flex items-center gap-2", children: [_jsx(Home, { className: "h-4 w-4", "aria-hidden": "true" }), _jsx("span", { children: "Dashboard" })] }) }), _jsx(Link, { to: "/dashboard/ai-bots", "aria-label": "Browse all advisors", children: _jsxs(Button, { variant: "default", className: "flex items-center gap-2", children: [_jsx(Search, { className: "h-4 w-4", "aria-hidden": "true" }), _jsx("span", { children: "Browse All" })] }) })] }), autoRedirectDelay > 0 && (_jsxs("p", { className: "text-sm text-muted-foreground mt-4", children: ["Auto-redirecting in ", autoRedirectDelay, " seconds..."] }))] }));
};
export default NotFoundCard;
