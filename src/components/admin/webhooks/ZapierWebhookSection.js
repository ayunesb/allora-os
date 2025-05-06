import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebhookInput from "./WebhookInput";
import { useWebhookValidation } from "./useWebhookValidation";
import ZapierWebhookDemo from "./zapier-demo/ZapierWebhookDemo";
const ZapierWebhookSection = ({ zapierWebhook, onZapierWebhookChange, onTestWebhook, isTestLoading, }) => {
    const { isValid: isZapierWebhookValid, validationMessage, validateUrl, } = useWebhookValidation("zapier");
    // Handle input change
    const handleZapierWebhookChange = (e) => {
        const value = e.target.value;
        onZapierWebhookChange(value);
        validateUrl(value);
        // Also store in localStorage for the automatic event system
        if (value) {
            localStorage.setItem("zapier_webhook_url", value);
        }
    };
    return (_jsxs("div", { className: "space-y-4 p-4 border rounded-md border-border/30 bg-muted/20", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Webhook, { className: "h-4 w-4 text-primary" }), _jsx("h3", { className: "text-sm font-medium", children: "Zapier Integration" })] }), _jsx(WebhookInput, { id: "zapier-webhook", label: "Zapier Webhook URL", placeholder: "https://hooks.zapier.com/hooks/catch/...", value: zapierWebhook, onChange: handleZapierWebhookChange, isValid: isZapierWebhookValid, errorMessage: "Invalid Zapier webhook URL", validMessage: "Valid Zapier webhook URL", validationMessage: validationMessage, description: "Enter your Zapier webhook URL to automate workflows when events occur in the platform." }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: onTestWebhook, disabled: isTestLoading || !zapierWebhook || isZapierWebhookValid !== true, children: isTestLoading ? "Testing..." : "Test Webhook" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => window.open("https://zapier.com/apps/webhook", "_blank"), children: "Zapier Documentation" })] }), zapierWebhook && isZapierWebhookValid && (_jsx(ZapierWebhookDemo, { webhookUrl: zapierWebhook }))] }));
};
export default ZapierWebhookSection;
