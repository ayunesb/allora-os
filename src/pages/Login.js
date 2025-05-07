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
import { useAuthCompat } from "@/hooks/useAuthCompat";
import { useNavigate } from "react-router-dom";
// Simplified placeholder component for demo purposes
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, isLoading } = useAuthCompat();
    const navigate = useNavigate();
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!signIn)
            return;
        const result = yield signIn(email, password);
        if (result.success) {
            navigate("/dashboard");
        }
    });
    const handleLogin = (email, password) => __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            console.error("Login error:", error.message);
        }
        else {
            console.log("Login successful:", data);
        }
    });
    return (_jsxs("div", { className: "flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8", children: [_jsx("div", { className: "sm:mx-auto sm:w-full sm:max-w-sm", children: _jsx("h2", { className: "mt-10 text-center text-2xl font-bold leading-9 tracking-tight", children: "Sign in to your account" }) }), _jsx("div", { className: "mt-10 sm:mx-auto sm:w-full sm:max-w-sm", children: _jsxs("form", { className: "space-y-6", onSubmit: handleSubmit, children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium leading-6", children: "Email address" }), _jsx("div", { className: "mt-2", children: _jsx("input", { id: "email", name: "email", type: "email", autoComplete: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "block w-full rounded-md border py-1.5 px-3" }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium leading-6", children: "Password" }), _jsx("div", { className: "mt-2", children: _jsx("input", { id: "password", name: "password", type: "password", autoComplete: "current-password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "block w-full rounded-md border py-1.5 px-3" }) })] }), _jsx("div", { children: _jsx("button", { type: "submit", disabled: isLoading, className: "flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500", children: isLoading ? "Signing in..." : "Sign in" }) })] }) })] }));
}
