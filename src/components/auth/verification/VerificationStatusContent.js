import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle, XCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export function VerificationStatusContent({ status }) {
    if (status === "verified") {
        return (_jsxs(Alert, { className: "bg-green-50 border-green-200", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), _jsx(AlertTitle, { className: "text-green-700", children: "Success!" }), _jsx(AlertDescription, { className: "text-green-600", children: "Your email has been verified. You'll be redirected to the dashboard." })] }));
    }
    return (_jsxs(Alert, { variant: "destructive", children: [_jsx(XCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Verification Failed" }), _jsx(AlertDescription, { children: "There was a problem verifying your email. Please try again or contact support." })] }));
}
