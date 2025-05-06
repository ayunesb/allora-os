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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from "@/components/ui/card";
import { RocketIcon, AlertTriangle } from "lucide-react";
import SignupForm from "@/components/auth/SignupForm";
import EmailVerificationView from "@/components/auth/EmailVerificationView";
import SignupLayout from "@/components/auth/SignupLayout";
import { LegalAcceptanceModal } from "@/components/auth/LegalAcceptanceModal";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
export default function SignUpNew() {
    var _a;
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [newUser, setNewUser] = useState(null); // Using any here to bypass the incompatible types
    const [showLegalModal, setShowLegalModal] = useState(false);
    const [signupError, setSignupError] = useState(null);
    const [legalError, setLegalError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        // Retrieve email from sessionStorage when component mounts or isSubmitted changes
        if (isSubmitted) {
            const email = sessionStorage.getItem("signupEmail") || "";
            setUserEmail(email);
        }
        // Check if user was redirected from email verification
        const emailVerified = new URLSearchParams(window.location.search).get("emailVerified");
        if (emailVerified === "true") {
            toast.success("Email verified successfully! Please log in.");
            navigate("/login");
        }
    }, [isSubmitted, navigate]);
    const handleUser = (user) => {
        if (!user.id) {
            setSignupError("Failed to retrieve user information after signup.");
            return;
        }
        console.log("Signup success, user:", user.id);
        setNewUser(user);
        setShowLegalModal(true);
        setSignupError(null);
    };
    const handleSubmitSuccess = (user) => {
        handleUser(user);
    };
    const handleTryAgain = () => {
        setIsSubmitted(false);
        setSignupError(null);
        setLegalError(null);
    };
    const handleLegalAcceptance = () => __awaiter(this, void 0, void 0, function* () {
        setLegalError(null);
        setRetryCount(0);
        // Store a flag that this is a new user that needs onboarding
        sessionStorage.setItem("newUserSignup", "true");
        // After legal acceptance, show verification screen but also prepare for onboarding
        console.log("Legal acceptance completed. User will be redirected to onboarding after verification.");
        setShowLegalModal(false);
        setIsSubmitted(true);
    });
    const handleModalClose = () => {
        // If the modal is closed without acceptance, sign the user out
        // as they need to accept the terms to use the platform
        supabase.auth.signOut().then(() => {
            toast.info("Sign up cancelled. You must accept the terms to create an account.");
            setShowLegalModal(false);
            setIsSubmitted(false);
            setNewUser(null);
        });
    };
    const handleRetryLegalAcceptance = () => {
        if (retryCount < 3) {
            setRetryCount((prev) => prev + 1);
            setLegalError(null);
            setShowLegalModal(true);
        }
        else {
            // Too many retries, sign out and start over
            supabase.auth.signOut().then(() => {
                toast.error("There seems to be an issue with legal acceptance. Please try signing up again.");
                navigate("/signup");
            });
        }
    };
    if (isSubmitted) {
        const userId = (_a = newUser === null || newUser === void 0 ? void 0 : newUser.id) !== null && _a !== void 0 ? _a : null; // Ensure `id` is properly typed
        return (_jsxs(SignupLayout, { children: [_jsx(EmailVerificationView, { email: userEmail, onTryAgain: handleTryAgain, isNewSignup: true, userId: userId }), legalError && (_jsx(Card, { className: "mt-4 border-destructive bg-destructive/10", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-destructive mt-0.5" }), _jsxs("div", { children: [_jsx("h3", { className: "font-medium text-destructive", children: "Legal Acceptance Error" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: legalError }), _jsx("button", { onClick: handleRetryLegalAcceptance, className: "text-sm text-primary mt-2 hover:underline", children: "Retry Legal Acceptance" })] })] }) }) }))] }));
    }
    return (_jsxs(SignupLayout, { children: [_jsxs(Card, { className: "w-full max-w-lg border-primary/10 shadow-lg", children: [_jsxs(CardHeader, { className: "text-center space-y-2", children: [_jsx("div", { className: "mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center", children: _jsx(RocketIcon, { className: "h-8 w-8 text-primary" }) }), _jsx(CardTitle, { className: "text-2xl font-bold", children: "Join Allora AI" }), _jsx(CardDescription, { children: "Create your account to access AI-powered business strategies" })] }), _jsxs(CardContent, { children: [signupError && (_jsxs("div", { className: "bg-destructive/10 border border-destructive rounded-md p-3 mb-4 text-sm text-destructive", children: [_jsx("p", { children: signupError }), _jsx("button", { onClick: handleTryAgain, className: "text-primary hover:underline mt-1 text-sm", children: "Try again" })] })), _jsx(SignupForm, { onSubmitSuccess: handleSubmitSuccess })] })] }), showLegalModal && newUser && (_jsx(LegalAcceptanceModal, { isOpen: showLegalModal, userId: newUser.id, onClose: handleModalClose, onAccept: handleLegalAcceptance }))] }));
}
