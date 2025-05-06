import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
const ManualTriggerContent = ({ webhookUrl, onTrigger, isLoading, isTriggering, }) => {
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Send a simple test webhook to your Zapier webhook URL. This will help you verify that your Zapier integration is working correctly." }), _jsx(Button, { onClick: onTrigger, disabled: !webhookUrl || isLoading || isTriggering === "manual", className: "w-full", children: isLoading || isTriggering === "manual"
                    ? "Sending..."
                    : "Send Test Webhook" }), _jsxs("div", { className: "bg-muted p-4 rounded-md mt-4", children: [_jsx("h4", { className: "font-medium text-sm mb-2", children: "Webhook Payload" }), _jsx("pre", { className: "text-xs overflow-auto bg-background p-2 rounded", children: JSON.stringify({
                            message: "This is a manual trigger test",
                            timestamp: new Date().toISOString(),
                            triggered_by: "manual-demo",
                        }, null, 2) })] })] }));
};
export default ManualTriggerContent;
