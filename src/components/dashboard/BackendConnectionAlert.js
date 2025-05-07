import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SUPABASE_CONFIG } from "@/config/appConfig";
const BackendConnectionAlert = ({ children, variant = "info", size = "medium", }) => {
    // Only show this alert when we're using fallback values
    if (!SUPABASE_CONFIG.usingFallback)
        return null;
    return (_jsxs(Alert, { variant: "warning", className: "mb-4", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Backend Connection Issue" }), _jsxs(AlertDescription, { children: [_jsx("p", { className: "mb-2", children: "The application is running with limited functionality because it couldn't connect to the backend services." }), _jsx("div", { className: "flex space-x-2 mt-2", children: _jsx(Button, { size: "sm", variant: "outline", asChild: true, children: _jsx("a", { href: "https://docs.lovable.dev/integrations/supabase/", target: "_blank", rel: "noopener noreferrer", children: "Setup Guide" }) }) })] })] }));
};
