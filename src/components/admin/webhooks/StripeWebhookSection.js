import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebhookInput from "./WebhookInput";
import { useWebhookValidation } from "./useWebhookValidation";
const StripeWebhookSection = ({ stripeWebhook, onStripeWebhookChange, onTestWebhook, isTestLoading, isValid: externalIsValid, }) => {
    const { isValid: internalIsValid, validationMessage, validateUrl, } = useWebhookValidation("stripe");
    // Use external isValid if provided, otherwise use internal validation
    const isStripeWebhookValid = externalIsValid !== undefined ? externalIsValid : internalIsValid;
    // Handle input change
    const handleStripeWebhookChange = (e) => {
        const value = e.target.value;
        onStripeWebhookChange(value);
        validateUrl(value);
    };
    return (_jsxs("div", { className: "space-y-4 p-4 border rounded-md border-border/30 bg-muted/20", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Webhook, { className: "h-4 w-4 text-primary" }), _jsx("h3", { className: "text-sm font-medium", children: "Stripe Webhook" })] }), _jsx(WebhookInput, { id: "stripe-webhook", label: "Stripe Webhook URL", placeholder: "https://your-domain.com/api/webhooks/stripe", value: stripeWebhook, onChange: handleStripeWebhookChange, isValid: isStripeWebhookValid, errorMessage: "Invalid URL format", validMessage: "Valid URL format", validationMessage: validationMessage, description: "Enter the URL where Stripe should send webhook events. This is used for payment processing." }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: onTestWebhook, disabled: isTestLoading || !stripeWebhook || isStripeWebhookValid !== true, children: isTestLoading ? "Testing..." : "Test Webhook" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => window.open("https://stripe.com/docs/webhooks", "_blank"), children: "Stripe Documentation" })] })] }));
};
export default StripeWebhookSection;
