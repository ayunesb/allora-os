import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle } from "lucide-react";
const WebhookInput = ({ id, label, placeholder, value, onChange, isValid, errorMessage = "Invalid URL", validMessage = "Valid URL", validationMessage, description, }) => {
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: id, children: label }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: id, placeholder: placeholder, value: value, onChange: onChange, className: `pr-10 ${isValid === true
                            ? "border-green-500 focus-visible:ring-green-500"
                            : isValid === false
                                ? "border-red-500 focus-visible:ring-red-500"
                                : ""}` }), isValid !== null && (_jsx("div", { className: "absolute right-3 top-2.5", children: isValid ? (_jsx(CheckCircle2, { className: "h-5 w-5 text-green-500" })) : (_jsx(XCircle, { className: "h-5 w-5 text-red-500" })) }))] }), description && (_jsx("p", { className: "text-xs text-muted-foreground", children: description })), validationMessage && (_jsx("p", { className: `text-xs ${isValid ? "text-green-500" : "text-red-500"}`, children: validationMessage }))] }));
};
export default WebhookInput;
