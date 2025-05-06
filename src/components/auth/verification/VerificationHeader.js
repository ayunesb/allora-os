import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { RocketIcon, CheckCircle, XCircle } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
export function VerificationHeader({ verificationStatus, email }) {
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4", children: verificationStatus === "verified" ? (_jsx(CheckCircle, { className: "h-8 w-8 text-green-500" })) : verificationStatus === "failed" ? (_jsx(XCircle, { className: "h-8 w-8 text-destructive" })) : (_jsx(RocketIcon, { className: "h-8 w-8 text-primary" })) }), _jsx(CardTitle, { className: "text-2xl", children: verificationStatus === "verified"
                    ? "Email Verified!"
                    : verificationStatus === "failed"
                        ? "Verification Failed"
                        : "Verify Your Email" }), _jsx(CardDescription, { children: verificationStatus === "verified"
                    ? "You'll be redirected to the dashboard shortly"
                    : verificationStatus === "failed"
                        ? "There was a problem verifying your email"
                        : `We've sent a verification email to ${email}` })] }));
}
