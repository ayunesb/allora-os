import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { TrendingUp, Plus, RefreshCw, AlertCircle } from "lucide-react";
import { useBreakpoint } from "@/hooks/use-mobile";
import { Alert, AlertDescription } from "@/components/ui/alert";
const EmptyState = ({ onCreateNew, isLoading = false, error = null, onRetry, }) => {
    const breakpoint = useBreakpoint();
    const isMobile = breakpoint === "mobile";
    if (error) {
        return (_jsxs("div", { className: "bg-secondary/40 border border-border/50 rounded-lg p-4 sm:p-6 text-center mb-10", children: [_jsx(AlertCircle, { className: "h-10 w-10 sm:h-12 sm:w-12 text-destructive mx-auto mb-3 sm:mb-4" }), _jsx("h3", { className: "text-xl font-bold mb-2", children: "Error Loading Strategies" }), _jsx(Alert, { variant: "destructive", className: "mb-4 sm:mb-6", children: _jsx(AlertDescription, { children: error }) }), onRetry && (_jsxs(Button, { onClick: onRetry, variant: "outline", size: isMobile ? "sm" : "default", children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), "Retry"] }))] }));
    }
    return (_jsxs("div", { className: "bg-secondary/40 border border-border/50 rounded-lg p-4 sm:p-6 text-center mb-10", children: [_jsx(TrendingUp, { className: "h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" }), _jsx("h3", { className: "text-xl font-bold mb-2", children: "No Strategies Yet" }), _jsx("p", { className: "text-gray-300 mb-4 sm:mb-6", children: "Create your first business strategy with AI assistance." }), _jsxs(Button, { onClick: onCreateNew, className: "allora-button", size: isMobile ? "sm" : "default", disabled: isLoading, children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), isLoading ? "Creating..." : "Create First Strategy"] })] }));
};
export default EmptyState;
