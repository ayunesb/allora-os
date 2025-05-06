import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { errorEventBus } from "@/utils/errorHandling/errorEventBus";
export function GlobalErrorModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        // Subscribe to global errors
        const handleError = (appError) => {
            // Only show the modal for critical errors
            if (appError.isCritical) {
                setError(appError);
                setIsOpen(true);
            }
        };
        errorEventBus.subscribe(handleError);
        return () => {
            errorEventBus.unsubscribe(handleError);
        };
    }, []);
    const handleClose = () => {
        setIsOpen(false);
    };
    const handleRefresh = () => {
        window.location.reload();
    };
    if (!error)
        return null;
    return (_jsx(Dialog, { open: isOpen, onOpenChange: setIsOpen, children: _jsxs(DialogContent, { className: "sm:max-w-md", children: [_jsxs(DialogHeader, { children: [_jsxs("div", { className: "flex items-center", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-destructive mr-2" }), _jsx(DialogTitle, { children: "Application Error" })] }), _jsx(DialogDescription, { children: "We've encountered an unexpected error. Our team has been notified." })] }), _jsxs("div", { className: "bg-muted p-3 rounded-md overflow-auto max-h-40 text-xs", children: [_jsx("p", { className: "font-mono", children: error.message }), error.code && (_jsxs("p", { className: "font-mono mt-1", children: ["Error code: ", error.code] }))] }), _jsxs(DialogFooter, { className: "flex justify-between items-center", children: [_jsxs(Button, { variant: "outline", onClick: handleClose, children: [_jsx(X, { className: "h-4 w-4 mr-2" }), "Close"] }), _jsx(Button, { onClick: handleRefresh, children: "Refresh Application" })] })] }) }));
}
