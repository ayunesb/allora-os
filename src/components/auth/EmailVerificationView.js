var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { CheckCircle2, Mail } from "lucide-react";
import { resendVerificationEmail } from "@/utils/authHelpers";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export default function EmailVerificationView({ email, onTryAgain, isNewSignup = false, userId, }) {
    const [isResending, setIsResending] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        // If this is a new signup, we'll set a flag to redirect to onboarding
        if (isNewSignup && userId) {
            console.log("New signup detected in EmailVerificationView, will redirect to onboarding");
            sessionStorage.setItem("newUserSignup", "true");
            sessionStorage.setItem("pendingOnboardingUserId", userId);
        }
    }, [isNewSignup, userId]);
    const handleResendEmail = () => __awaiter(this, void 0, void 0, function* () {
        if (!email) {
            toast.error("No email address available");
            return;
        }
        setIsResending(true);
        try {
            const result = yield resendVerificationEmail(email);
            if (result.success) {
                toast.success("Verification email resent. Please check your inbox.");
            }
            else {
                toast.error(result.error || "Failed to resend verification email");
            }
        }
        catch (error) {
            console.error("Resend verification error:", error);
            toast.error("An unexpected error occurred");
        }
        finally {
            setIsResending(false);
        }
    });
    const handleSignIn = () => {
        navigate("/login");
    };
    const handleGoToOnboarding = () => {
        console.log("Redirecting to onboarding from EmailVerificationView");
        navigate("/onboarding");
    };
    return (_jsxs(Card, { className: "w-full max-w-lg border-primary/10 shadow-lg", children: [_jsxs(CardHeader, { className: "text-center space-y-2", children: [_jsx("div", { className: "mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center", children: _jsx(Mail, { className: "h-8 w-8 text-primary" }) }), _jsx(CardTitle, { className: "text-2xl font-bold", children: "Verify Your Email" }), _jsxs(CardDescription, { children: ["We've sent a verification email to", " ", _jsx("span", { className: "font-medium", children: email })] })] }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "bg-muted p-4 rounded-md space-y-3", children: [_jsxs("div", { className: "flex items-start", children: [_jsx(CheckCircle2, { className: "h-5 w-5 text-primary mr-2 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "Check your inbox" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Click the verification link in the email we just sent you" })] })] }), _jsxs("div", { className: "flex items-start", children: [_jsx(CheckCircle2, { className: "h-5 w-5 text-primary mr-2 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: "After verification" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Return here and sign in to continue to your account" })] })] })] }) }), _jsxs(CardFooter, { className: "flex flex-col space-y-2", children: [_jsxs("div", { className: "w-full flex space-x-2", children: [_jsx(Button, { variant: "outline", className: "flex-1", onClick: handleResendEmail, disabled: isResending, children: isResending ? "Sending..." : "Resend Email" }), _jsx(Button, { className: "flex-1", onClick: handleSignIn, children: "Sign In" })] }), isNewSignup && (_jsx("div", { className: "w-full", children: _jsx(Button, { variant: "link", className: "w-full text-muted-foreground", onClick: handleGoToOnboarding, children: "Skip verification for now" }) })), onTryAgain && (_jsx(Button, { variant: "ghost", className: "w-full mt-4 text-sm", onClick: onTryAgain, children: "Use a different email" }))] })] }));
}
