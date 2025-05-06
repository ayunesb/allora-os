import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
export default function PasswordInput({ form, name, label, showStrengthMeter = false, setShowTips, }) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (_jsx(FormField, { control: form.control, name: name, render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: label }), _jsxs("div", { className: "relative", children: [_jsx(FormControl, { children: _jsx(Input, Object.assign({ type: showPassword ? "text" : "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }, field, { onFocus: () => setShowTips && setShowTips(true), onBlur: () => setShowTips && setShowTips(false), className: "pr-10" })) }), _jsxs(Button, { type: "button", variant: "ghost", size: "sm", className: "absolute right-0 top-0 h-full px-3", onClick: togglePasswordVisibility, children: [showPassword ? (_jsx(EyeOff, { className: "h-4 w-4" })) : (_jsx(Eye, { className: "h-4 w-4" })), _jsx("span", { className: "sr-only", children: showPassword ? "Hide password" : "Show password" })] })] }), showStrengthMeter && form.watch(name) && (_jsx(PasswordStrengthMeter, { password: form.watch(name) })), _jsx(FormMessage, {})] })) }));
}
