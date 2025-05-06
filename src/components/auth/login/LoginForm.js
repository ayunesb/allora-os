import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().default(true),
});
export function LoginForm({ onSubmit, isLoading }) {
    const [showPassword, setShowPassword] = useState(false);
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: true,
        },
    });
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    return (_jsx(Form, Object.assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "you@example.com" }, field, { disabled: isLoading, className: "allora-input" })) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "password", render: ({ field }) => (_jsxs(FormItem, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(FormLabel, { children: "Password" }), _jsx(Link, { to: "/reset-password", className: "text-xs text-primary hover:underline", children: "Forgot password?" })] }), _jsxs("div", { className: "relative", children: [_jsx(FormControl, { children: _jsx(Input, Object.assign({ type: showPassword ? "text" : "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }, field, { disabled: isLoading, className: "allora-input" })) }), _jsxs(Button, { type: "button", variant: "ghost", size: "sm", className: "absolute right-0 top-0 h-full px-3", onClick: togglePasswordVisibility, children: [showPassword ? (_jsx(EyeOff, { className: "h-4 w-4" })) : (_jsx(Eye, { className: "h-4 w-4" })), _jsx("span", { className: "sr-only", children: showPassword ? "Hide password" : "Show password" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "rememberMe", render: ({ field }) => (_jsxs(FormItem, { className: "flex flex-row items-start space-x-3 space-y-0 py-1", children: [_jsx(FormControl, { children: _jsx(Checkbox, { checked: field.value, onCheckedChange: field.onChange, id: "remember-me" }) }), _jsx("div", { className: "space-y-1 leading-none", children: _jsx(FormLabel, { htmlFor: "remember-me", className: "text-sm text-muted-foreground cursor-pointer", children: "Keep me signed in" }) })] })) }), _jsx(Button, { type: "submit", className: "allora-button w-full mt-6", disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), " Logging in..."] })) : ("Login") })] }) })));
}
