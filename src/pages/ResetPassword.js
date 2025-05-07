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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { sendPasswordResetEmail } from "@/services/authService";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const { toast } = useToast();
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!email.trim()) {
            toast({
                title: "Email required",
                description: "Please enter your email address",
                variant: "destructive",
            });
            return;
        }
        setIsLoading(true);
        try {
            const result = yield sendPasswordResetEmail(email);
            if (result.success) {
                setResetSent(true);
                toast({
                    title: "Reset email sent",
                    description: "Check your email for password reset instructions",
                });
            }
            else {
                toast({
                    title: "Error",
                    description: result.error || "Failed to send reset instructions",
                    variant: "destructive",
                });
            }
        }
        catch (error) {
            toast({
                title: "Error",
                description: error.message || "An unexpected error occurred",
                variant: "destructive",
            });
        }
        finally {
            setIsLoading(false);
        }
    });
    return (_jsx("div", { className: "flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-2xl font-bold", children: "Reset Password" }), _jsx(CardDescription, { children: resetSent
                                ? "Check your email for reset instructions"
                                : "Enter your email address and we'll send you a reset link" })] }), !resetSent ? (_jsxs(_Fragment, { children: [_jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "email", className: "text-sm font-medium", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "name@example.com", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? "Sending..." : "Send Reset Link" })] }) }), _jsx(CardFooter, { children: _jsx("div", { className: "text-center w-full text-sm", children: _jsx(Link, { to: "/login", className: "text-primary hover:underline", children: "Back to login" }) }) })] })) : (_jsxs(CardContent, { className: "space-y-4", children: [_jsx("div", { className: "p-4 bg-green-50 text-green-800 rounded-md", children: _jsxs("p", { className: "text-sm", children: ["We've sent an email to ", _jsx("strong", { children: email }), " with instructions to reset your password."] }) }), _jsxs("div", { className: "text-center space-y-2", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: "Didn't receive the email? Check your spam folder or try again." }), _jsx(Button, { variant: "outline", className: "mt-2", onClick: () => setResetSent(false), children: "Try Again" }), _jsx("div", { className: "mt-4", children: _jsx(Link, { to: "/login", className: "text-primary hover:underline text-sm", children: "Back to login" }) })] })] }))] }) }));
}
