import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
export default function SignUp() {
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-muted/40", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { className: "space-y-1", children: [_jsx(CardTitle, { className: "text-2xl", children: "Create an account" }), _jsx(CardDescription, { children: "Enter your email below to create your account" })] }), _jsxs(CardContent, { className: "grid gap-4", children: [_jsx("div", { className: "grid gap-2", children: _jsx(Input, { id: "name", type: "text", placeholder: "Full Name" }) }), _jsx("div", { className: "grid gap-2", children: _jsx(Input, { id: "email", type: "email", placeholder: "Email" }) }), _jsx("div", { className: "grid gap-2", children: _jsx(Input, { id: "password", type: "password", placeholder: "Password" }) }), _jsx("div", { className: "grid gap-2", children: _jsx(Input, { id: "company", type: "text", placeholder: "Company" }) })] }), _jsx(CardFooter, { children: _jsx(Button, { className: "w-full", children: "Create account" }) })] }) }));
}
