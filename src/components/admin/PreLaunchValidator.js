var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { validateProductionReadiness } from "@/utils/launchValidator";
import { toast } from "sonner";
export default function PreLaunchValidator() {
    const [isValidating, setIsValidating] = useState(false);
    const [validationResult, setValidationResult] = useState(null);
    const runValidation = () => __awaiter(this, void 0, void 0, function* () {
        setIsValidating(true);
        try {
            const result = yield validateProductionReadiness();
            setValidationResult(result);
            if (result.ready) {
                toast.success("All production readiness checks passed! 🚀");
            }
            else {
                toast.error(`${result.issues.length} issues found that need to be fixed before going live`);
            }
        }
        catch (error) {
            console.error("Validation error:", error);
            toast.error("Failed to complete readiness validation");
        }
        finally {
            setIsValidating(false);
        }
    });
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Production Readiness Validator" }), _jsx(CardDescription, { children: "Verify that your application is ready for production" })] }), _jsx(CardContent, { children: validationResult ? (_jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: `p-4 rounded-lg border ${validationResult.ready
                                ? "bg-green-50 border-green-200"
                                : "bg-amber-50 border-amber-200"}`, children: validationResult.ready ? (_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(CheckCircle, { className: "h-5 w-5 text-green-500 mt-0.5" }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-green-800", children: "Ready for Production!" }), _jsx("p", { className: "text-sm text-green-700", children: "All validation checks have passed. Your application is ready to go live." })] })] })) : (_jsxs("div", { className: "flex items-start gap-3", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-amber-500 mt-0.5" }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-amber-800", children: "Not Ready for Production" }), _jsxs("p", { className: "text-sm text-amber-700", children: [validationResult.issues.length, " issue(s) need to be resolved before going live."] })] })] })) }), validationResult.issues.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "font-medium", children: "Issues to Resolve:" }), validationResult.issues.map((issue, index) => (_jsxs(Alert, { variant: "destructive", className: "bg-red-50 text-red-800 border-red-200", children: [_jsx(XCircle, { className: "h-4 w-4 text-red-500" }), _jsxs(AlertTitle, { children: ["Issue #", index + 1] }), _jsx(AlertDescription, { children: issue.message })] }, index)))] })), validationResult.passedChecks.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "font-medium", children: "Passed Checks:" }), validationResult.passedChecks.map((check, index) => (_jsxs(Alert, { variant: "default", className: "bg-green-50 text-green-800 border-green-200", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), _jsx(AlertDescription, { children: check.message })] }, index)))] }))] })) : (_jsx("div", { className: "text-center py-6", children: _jsx("p", { className: "text-muted-foreground mb-4", children: "Run a production readiness check to verify that your application is ready for launch. This will validate authentication, database, security settings, and API connections." }) })) }), _jsx(CardFooter, { children: _jsx(Button, { onClick: runValidation, disabled: isValidating, className: "w-full", children: isValidating ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Running Validation..."] })) : ("Validate Production Readiness") }) })] }));
}
