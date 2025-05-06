import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { AlertTriangle, Loader2, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
export function AuthErrorState({ error, onRetry, isRetrying }) {
    return (_jsx("div", { className: "flex flex-col items-center justify-center min-h-screen p-4", children: _jsxs("div", { className: "max-w-md w-full space-y-4", children: [_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Authentication Error" }), _jsx(AlertDescription, { children: error })] }), _jsx("div", { className: "flex justify-center", children: _jsx(Button, { onClick: onRetry, disabled: isRetrying, className: "flex items-center gap-2", children: isRetrying ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Retrying..."] })) : (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4" }), "Retry"] })) }) })] }) }));
}
