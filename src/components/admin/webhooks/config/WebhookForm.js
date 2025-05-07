import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
const WebhookForm = ({ title, description, placeholder, value, onChange, onTest, onSave, isSaving, isValid, isTestLoading, webhookType, }) => {
    return (_jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: `${webhookType}-webhook`, children: title }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { id: `${webhookType}-webhook`, placeholder: placeholder, value: value, onChange: (e) => onChange(e.target.value), className: !isValid && value ? "border-red-500" : "" }), _jsx(Button, { type: "button", variant: "outline", onClick: onTest, disabled: !isValid || isTestLoading || !value, children: isTestLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Testing"] })) : ("Test") })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: description })] }), !isValid && value && (_jsxs(Alert, { variant: "destructive", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsxs(AlertDescription, { children: ["Invalid webhook URL format for ", webhookType] })] })), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { onClick: onSave, disabled: isSaving, children: isSaving ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Saving"] })) : ("Save All Webhooks") }) })] }));
};
export default WebhookForm;
