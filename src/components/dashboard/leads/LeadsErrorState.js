import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
export const LeadsErrorState = ({ onRetry }) => {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Error loading leads" }), _jsx(AlertDescription, { children: "There was a problem loading your leads data. Please try refreshing the page or contact support." })] }), _jsx(Button, { onClick: onRetry, children: "Retry" })] }));
};
