"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var ManualTriggerContent = function (_a) {
  var webhookUrl = _a.webhookUrl,
    onTrigger = _a.onTrigger,
    isLoading = _a.isLoading,
    isTriggering = _a.isTriggering;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-sm text-muted-foreground mb-4",
        children:
          "Send a simple test webhook to your Zapier webhook URL. This will help you verify that your Zapier integration is working correctly.",
      }),
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        onClick: onTrigger,
        disabled: !webhookUrl || isLoading || isTriggering === "manual",
        className: "w-full",
        children:
          isLoading || isTriggering === "manual"
            ? "Sending..."
            : "Send Test Webhook",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "bg-muted p-4 rounded-md mt-4",
        children: [
          (0, jsx_runtime_1.jsx)("h4", {
            className: "font-medium text-sm mb-2",
            children: "Webhook Payload",
          }),
          (0, jsx_runtime_1.jsx)("pre", {
            className: "text-xs overflow-auto bg-background p-2 rounded",
            children: JSON.stringify(
              {
                message: "This is a manual trigger test",
                timestamp: new Date().toISOString(),
                triggered_by: "manual-demo",
              },
              null,
              2,
            ),
          }),
        ],
      }),
    ],
  });
};
exports.default = ManualTriggerContent;
