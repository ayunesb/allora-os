import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
const APIKeyInput = ({ id, label, value, onChange, placeholder, isSecret = true, }) => {
    const [showSecret, setShowSecret] = useState(false);
    // Function to mask API keys for display
    const maskApiKey = (key) => {
        if (!key)
            return "";
        if (key.length <= 8)
            return "••••••••";
        // For longer keys, show first and last 4 characters
        return `${key.substring(0, 4)}••••••••${key.substring(key.length - 4)}`;
    };
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: id, children: label }), _jsxs("div", { className: "flex relative", children: [_jsx(Input, { id: id, type: isSecret && !showSecret ? "password" : "text", placeholder: placeholder || "Enter API key", value: value, onChange: (e) => onChange(e.target.value), className: "pr-10" }), isSecret && (_jsx(Button, { type: "button", variant: "ghost", size: "icon", className: "absolute right-0 top-0 h-full", onClick: () => setShowSecret(!showSecret), children: showSecret ? (_jsx(EyeOff, { className: "h-4 w-4" })) : (_jsx(Eye, { className: "h-4 w-4" })) }))] })] }));
};
export default APIKeyInput;
