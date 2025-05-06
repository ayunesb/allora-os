import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebhookInput from "./WebhookInput";
import { useWebhookValidation } from "./useWebhookValidation";
const SlackWebhookSection = ({ slackWebhook, onSlackWebhookChange, onTestWebhook, isTestLoading, }) => {
    const { isValid, validationMessage, validateUrl } = useWebhookValidation("slack");
    // Handle input change
    const handleSlackWebhookChange = (e) => {
        const value = e.target.value;
        onSlackWebhookChange(value);
        validateUrl(value);
    };
    return (_jsxs("div", { className: "space-y-4 p-4 border rounded-md border-border/30 bg-muted/20", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MessageSquare, { className: "h-4 w-4 text-primary" }), _jsx("h3", { className: "text-sm font-medium", children: "Slack Integration" })] }), _jsx(WebhookInput, { id: "slack-webhook", label: "Slack Webhook URL", placeholder: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX", value: slackWebhook, onChange: handleSlackWebhookChange, isValid: isValid, errorMessage: "Invalid Slack webhook URL", validMessage: "Valid Slack webhook URL", validationMessage: validationMessage, description: "Enter your Slack incoming webhook URL to send notifications to your Slack channels." }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "outline", size: "sm", onClick: onTestWebhook, disabled: isTestLoading || !slackWebhook || isValid !== true, children: isTestLoading ? "Testing..." : "Test Webhook" }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => window.open("https://api.slack.com/messaging/webhooks", "_blank"), children: "Slack Webhooks Documentation" })] })] }));
};
export default SlackWebhookSection;
