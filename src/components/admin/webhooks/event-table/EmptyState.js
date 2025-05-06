import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AlertCircle, Search, Loader2 } from "lucide-react";
export const EmptyState = ({ isLoading = false, filtered = false }) => {
    if (isLoading) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center py-12 px-4 border rounded-md bg-muted/30", children: [_jsx(Loader2, { className: "h-8 w-8 text-primary animate-spin mb-4" }), _jsx("p", { className: "text-muted-foreground", children: "Loading webhook events..." })] }));
    }
    return (_jsx("div", { className: "flex flex-col items-center justify-center py-12 px-4 border rounded-md bg-muted/30", children: filtered ? (_jsxs(_Fragment, { children: [_jsx(Search, { className: "h-8 w-8 text-muted-foreground mb-4" }), _jsx("p", { className: "font-medium", children: "No matching webhook events found" }), _jsx("p", { className: "text-muted-foreground text-center mt-1", children: "Try adjusting your search or filters" })] })) : (_jsxs(_Fragment, { children: [_jsx(AlertCircle, { className: "h-8 w-8 text-muted-foreground mb-4" }), _jsx("p", { className: "font-medium", children: "No webhook events" }), _jsx("p", { className: "text-muted-foreground text-center mt-1", children: "Webhook events will appear here once they are triggered" })] })) }));
};
export default EmptyState;
