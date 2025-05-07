import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export const WebhookConfigForm = ({ webhookType, onWebhookTypeChange, stripeWebhook = "", stripeSecret = "", zapierWebhook = "", githubWebhook = "", githubSecret = "", slackWebhook = "", customWebhook = "", stripeValid = false, zapierValid = false, githubValid = false, slackValid = false, customValid = false, onSave, onDelete, onTest, }) => {
    // Simple placeholder for the form component
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "Configure Webhooks" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Set up integration webhooks for external services" })] }));
};
export const WebhookConfigTab = ({ stripeWebhook, stripeSecret, zapierWebhook, githubWebhook, githubSecret, slackWebhook, customWebhook, stripeValid = false, zapierValid = false, githubValid = false, slackValid = false, customValid = false, onSave, onDelete, onTest, onTypeChange, 
// Handle legacy props
stripeWebhookId, stripeEndpointSecret, zapierWebhookUrl, githubWebhookUrl, slackWebhookUrl, customWebhookUrl, }) => {
    const [activeWebhookType, setActiveWebhookType] = useState("stripe");
    // Map legacy props to new prop names
    const effectiveStripeWebhook = stripeWebhook || stripeWebhookId;
    const effectiveStripeSecret = stripeSecret || stripeEndpointSecret;
    const effectiveZapierWebhook = zapierWebhook || zapierWebhookUrl;
    const effectiveGithubWebhook = githubWebhook || githubWebhookUrl;
    const effectiveGithubSecret = githubSecret || "";
    const effectiveSlackWebhook = slackWebhook || slackWebhookUrl;
    const effectiveCustomWebhook = customWebhook || customWebhookUrl;
    const handleTypeChange = (type) => {
        setActiveWebhookType(type);
        if (onTypeChange) {
            onTypeChange(type);
        }
    };
    return (_jsx(WebhookConfigForm, { webhookType: activeWebhookType, onWebhookTypeChange: handleTypeChange, stripeWebhook: effectiveStripeWebhook, stripeSecret: effectiveStripeSecret, zapierWebhook: effectiveZapierWebhook, githubWebhook: effectiveGithubWebhook, githubSecret: effectiveGithubSecret, slackWebhook: effectiveSlackWebhook, customWebhook: effectiveCustomWebhook, stripeValid: stripeValid, zapierValid: zapierValid, githubValid: githubValid, slackValid: slackValid, customValid: customValid, onSave: onSave, onDelete: onDelete, onTest: onTest }));
};
export default WebhookConfigTab;
