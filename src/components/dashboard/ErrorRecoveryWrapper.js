import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { logger } from "@/utils/loggingService";
export function ErrorRecoveryWrapper({ children, fallbackComponent, onReset, errorTitle = "Something went wrong", errorMessage = "We encountered an error loading this component. Your data is safe, and you can try again.", componentName = "unknown component", }) {
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState(null);
    const [errorInfo, setErrorInfo] = useState(null);
    // Reset error state when children change
    useEffect(() => {
        setHasError(false);
        setError(null);
    }, [children]);
    const handleReset = () => {
        setHasError(false);
        setError(null);
        // Execute custom reset logic if provided
        if (onReset) {
            onReset();
        }
        toast.success("Component has been reset");
    };
    const handleCatchError = (error, errorInfo) => {
        // Log the error
        logger.error(`Error in ${componentName}:`, error, {
            component: componentName,
            errorInfo: errorInfo.componentStack,
        });
        // Update state
        setHasError(true);
        setError(error);
        setErrorInfo(errorInfo);
    };
    if (hasError) {
        // Use custom fallback if provided, otherwise show default error UI
        if (fallbackComponent) {
            return _jsx(_Fragment, { children: fallbackComponent });
        }
        return (_jsxs(Card, { className: "w-full border border-red-200 bg-red-50/50 dark:bg-red-950/10 dark:border-red-900/50", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-red-500" }), _jsx(CardTitle, { className: "text-lg", children: errorTitle })] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-muted-foreground mb-4", children: errorMessage }), process.env.NODE_ENV !== "production" && error && (_jsxs("div", { className: "bg-muted p-3 rounded-md overflow-auto max-h-32 text-xs", children: [_jsx("p", { className: "font-mono text-red-500", children: error.toString() }), errorInfo && (_jsx("pre", { className: "mt-2 text-muted-foreground", children: errorInfo.componentStack }))] }))] }), _jsx(CardFooter, { className: "flex justify-end space-x-2", children: _jsxs(Button, { onClick: handleReset, className: "flex items-center", children: [_jsx(RefreshCw, { className: "mr-2 h-4 w-4" }), "Try Again"] }) })] }));
    }
    // Use error boundary class to catch errors in children
    return (_jsx(ErrorBoundaryClass, { onError: handleCatchError, children: children }));
}
// Class component is required for error boundaries
class ErrorBoundaryClass extends React.Component {
    componentDidCatch(error, errorInfo) {
        this.props.onError(error, errorInfo);
    }
    render() {
        return this.props.children;
    }
}
