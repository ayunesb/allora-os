import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useProductionData } from "@/hooks/useProductionData";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function ProductionDataAlert() {
    const [showAlert, setShowAlert] = useState(true);
    const { isProductionReady, isProductionMode, validateProductionData, forceProductionMode, } = useProductionData();
    const navigate = useNavigate();
    // Check if the alert has been dismissed before
    useEffect(() => {
        const isDismissed = localStorage.getItem("production-alert-dismissed");
        if (isDismissed === "true") {
            setShowAlert(false);
        }
    }, []);
    const handleDismiss = () => {
        localStorage.setItem("production-alert-dismissed", "true");
        setShowAlert(false);
    };
    const handleSetupProduction = () => {
        navigate("/admin/launch-verification");
    };
    const handleForceProduction = () => {
        forceProductionMode(true);
        setShowAlert(false);
    };
    if (!showAlert || isProductionMode) {
        return null;
    }
    return (_jsx(Alert, { variant: isProductionReady ? "default" : "destructive", className: isProductionReady
            ? "border-risk-low-light bg-risk-low-light/20 text-risk-low-DEFAULT dark:text-risk-low-dark"
            : "border-amber-300 bg-amber-50 text-amber-900", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-start gap-3", children: [isProductionReady ? (_jsx(CheckCircle2, { className: "h-5 w-5 text-green-500 mt-0.5" })) : (_jsx(AlertCircle, { className: "h-5 w-5 text-amber-600 mt-0.5" })), _jsxs("div", { children: [_jsx(AlertTitle, { className: isProductionReady
                                        ? "text-risk-low-DEFAULT dark:text-risk-low-dark"
                                        : "text-amber-800", children: isProductionReady
                                        ? "Ready for Production"
                                        : "Development Environment" }), _jsx(AlertDescription, { className: isProductionReady
                                        ? "text-risk-low-DEFAULT/80 dark:text-risk-low-dark/80 mt-1"
                                        : "text-amber-700 mt-1", children: isProductionReady
                                        ? "Your data is validated and ready for production use."
                                        : "You're viewing demo data. Set up production data before going live." })] })] }), _jsxs("div", { className: "flex gap-2", children: [!isProductionReady && (_jsx(Button, { variant: "outline", size: "sm", onClick: handleSetupProduction, className: "border-amber-400 bg-amber-100 hover:bg-amber-200 text-amber-900", children: "Setup Production" })), _jsx(Button, { variant: "outline", size: "sm", onClick: handleForceProduction, className: "border-green-400 bg-green-100 hover:bg-green-200 text-green-900", children: "Use Real Data" }), _jsx(Button, { variant: "ghost", size: "sm", onClick: handleDismiss, className: "text-amber-900 hover:bg-amber-100", children: "Dismiss" })] })] }) }));
}
