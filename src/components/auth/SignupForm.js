import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSignupForm } from "@/hooks/useSignupForm";
import PasswordInput from "./PasswordInput";
import CompanyInfoFields from "./CompanyInfoFields";
import { useState } from "react";
export default function SignupForm({ onSubmitSuccess }) {
    const { form, isLoading, onSubmit, navigate, formError } = useSignupForm({
        onSubmitSuccess,
    });
    const [showPasswordTips, setShowPasswordTips] = useState(false);
    return (_jsx(Form, Object.assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [formError && (_jsxs(Alert, { variant: "destructive", className: "mb-4", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: formError })] })), _jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Full Name" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "John Doe" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Email" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "you@example.com" }, field, { type: "email", autoComplete: "email" })) }), _jsx(FormMessage, {})] })) }), _jsx(PasswordInput, { form: form, name: "password", label: "Password", showStrengthMeter: true, setShowTips: setShowPasswordTips }), showPasswordTips && (_jsxs("div", { className: "text-xs text-muted-foreground space-y-1 bg-muted p-2 rounded", children: [_jsx("p", { children: "Your password should:" }), _jsxs("ul", { className: "list-disc pl-4 space-y-1", children: [_jsx("li", { children: "Be at least 8 characters long" }), _jsx("li", { children: "Include uppercase and lowercase letters" }), _jsx("li", { children: "Include at least one number" }), _jsx("li", { children: "Include at least one special character" })] })] })), _jsx(PasswordInput, { form: form, name: "confirmPassword", label: "Confirm Password" }), _jsx(CompanyInfoFields, { form: form }), _jsx(Button, { type: "submit", className: "w-full mt-6", disabled: isLoading, size: "lg", children: isLoading ? ("Creating Account...") : (_jsxs(_Fragment, { children: ["Create Account ", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })) }), _jsx("div", { className: "text-center mt-4", children: _jsxs("p", { className: "text-muted-foreground", children: ["Already have an account?", " ", _jsx(Button, { variant: "link", className: "p-0", onClick: () => navigate("/login"), type: "button", children: "Log in" })] }) })] }) })));
}
