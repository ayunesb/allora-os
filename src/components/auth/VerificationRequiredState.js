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
import { AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export function VerificationRequiredState({ onRefresh, onResendVerification, isResending, }) {
    return (_jsx("div", { className: "flex flex-col items-center justify-center min-h-screen p-4", children: _jsxs("div", { className: "max-w-md w-full space-y-4", children: [_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "Email verification required" }), _jsx(AlertDescription, { children: "Please verify your email address before accessing this page. Check your inbox for a verification email." })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsxs(Button, { onClick: () => __awaiter(this, void 0, void 0, function* () {
                                yield onRefresh();
                                toast.info("Session refreshed. If you've verified your email, try again.");
                            }), variant: "outline", className: "flex items-center gap-2", children: [_jsx(RefreshCw, { className: "h-4 w-4" }), "I've verified my email"] }), _jsx(Button, { onClick: onResendVerification, disabled: isResending, className: "flex items-center gap-2", children: isResending ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Sending..."] })) : (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "h-4 w-4" }), "Resend verification email"] })) })] })] }) }));
}
