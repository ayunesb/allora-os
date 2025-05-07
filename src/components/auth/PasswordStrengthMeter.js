import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, X } from "lucide-react";
const passwordRequirements = [
    {
        id: "length",
        label: "At least 8 characters",
        validator: (password) => password.length >= 8,
    },
    {
        id: "uppercase",
        label: "Contains uppercase letter",
        validator: (password) => /[A-Z]/.test(password),
    },
    {
        id: "lowercase",
        label: "Contains lowercase letter",
        validator: (password) => /[a-z]/.test(password),
    },
    {
        id: "number",
        label: "Contains number",
        validator: (password) => /[0-9]/.test(password),
    },
    {
        id: "special",
        label: "Contains special character",
        validator: (password) => /[^A-Za-z0-9]/.test(password),
    },
];
export function calculatePasswordStrength(password) {
    if (!password)
        return 0;
    const fulfilledRequirements = passwordRequirements.filter((req) => req.validator(password)).length;
    return Math.min(100, (fulfilledRequirements / passwordRequirements.length) * 100);
}
export default function PasswordStrengthMeter({ password }) {
    const strength = calculatePasswordStrength(password);
    const getStrengthLabel = (strength) => {
        if (strength <= 0)
            return "";
        if (strength < 40)
            return "Weak";
        if (strength < 80)
            return "Medium";
        return "Strong";
    };
    const getStrengthColor = (strength) => {
        if (strength <= 0)
            return "bg-transparent";
        if (strength < 40)
            return "bg-red-500";
        if (strength < 80)
            return "bg-yellow-500";
        return "bg-green-500";
    };
    return (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "w-full h-2 bg-muted rounded overflow-hidden", children: _jsx("div", { className: `h-full transition-all duration-300 ${getStrengthColor(strength)}`, style: { width: `${strength}%` } }) }), password && (_jsxs("div", { className: "text-xs font-medium", children: ["Password strength:", " ", _jsx("span", { className: "font-semibold", children: getStrengthLabel(strength) })] })), password && (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 text-xs", children: passwordRequirements.map((requirement) => {
                    const isFulfilled = requirement.validator(password);
                    return (_jsxs("div", { className: `flex items-center gap-1.5 ${isFulfilled ? "text-green-500" : "text-muted-foreground"}`, children: [isFulfilled ? (_jsx(Check, { className: "h-3.5 w-3.5" })) : (_jsx(X, { className: "h-3.5 w-3.5" })), _jsx("span", { children: requirement.label })] }, requirement.id));
                }) }))] }));
}
