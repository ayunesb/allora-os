import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebhookInput from "./WebhookInput";
import { useWebhookValidation } from "./useWebhookValidation";
const CustomWebhookSection = ({ customWebhook, onCustomWebhookChange, onTestWebhook, isTestLoading, webhookName = "Custom", }) => {
    const { isValid, validationMessage, validateUrl } = useWebhookValidation("custom");
    // Handle input change
    const handleCustomWebhookChange = (e) => {
        const value = e.target.value;
        onCustomWebhookChange(value);
        validateUrl(value);
    };
    return (_jsxs("div", { className: "space-y-4 p-4 border rounded-md border-border/30 bg-muted/20", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Link, { className: "h-4 w-4 text-primary" }), _jsxs("h3", { className: "text-sm font-medium", children: [webhookName, " Webhook"] })] }), _jsx(WebhookInput, { id: "custom-webhook", label: `${webhookName} Webhook URL`, placeholder: "https://api.example.com/webhooks/your-endpoint", value: customWebhook, onChange: handleCustomWebhookChange, isValid: isValid, errorMessage: "Invalid webhook URL", validMessage: "Valid webhook URL", validationMessage: validationMessage, description: `Enter your ${webhookName.toLowerCase()} webhook URL to integrate with external services.` }), _jsx("div", { className: "flex gap-2", children: _jsx(Button, { variant: "outline", size: "sm", onClick: onTestWebhook, disabled: isTestLoading || !customWebhook || isValid !== true, children: isTestLoading ? "Testing..." : "Test Webhook" }) })] }));
};
export default CustomWebhookSection;
