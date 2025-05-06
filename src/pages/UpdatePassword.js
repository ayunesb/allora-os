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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { updateUserPassword } from "@/services/authService";
export default function UpdatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast({
                title: "Passwords don't match",
                description: "Please make sure your passwords match",
                variant: "destructive",
            });
            return;
        }
        if (password.length < 6) {
            toast({
                title: "Password too short",
                description: "Password must be at least 6 characters long",
                variant: "destructive",
            });
            return;
        }
        setIsLoading(true);
        try {
            const result = yield updateUserPassword(password);
            if (result.success) {
                toast({
                    title: "Password updated",
                    description: "Your password has been successfully updated",
                });
                // Redirect to login page after successful password update
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
            else {
                toast({
                    title: "Error",
                    description: result.error || "Failed to update password",
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
    return (_jsx("div", { className: "flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-2xl font-bold", children: "Update Password" }), _jsx(CardDescription, { children: "Create a new password for your account" })] }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "password", className: "text-sm font-medium", children: "New Password" }), _jsx(Input, { id: "password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter your new password", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "confirmPassword", className: "text-sm font-medium", children: "Confirm Password" }), _jsx(Input, { id: "confirmPassword", type: "password", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), placeholder: "Confirm your new password", required: true })] }), _jsx(Button, { type: "submit", className: "w-full", disabled: isLoading, children: isLoading ? "Updating..." : "Update Password" })] }) }), _jsx(CardFooter, { children: _jsx("div", { className: "text-center w-full text-sm text-muted-foreground", children: _jsx("p", { children: "After updating your password, you'll be redirected to the login page." }) }) })] }) }));
}
