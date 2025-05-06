"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var WebhookInput_1 = require("./WebhookInput");
var useWebhookValidation_1 = require("./useWebhookValidation");
var ZapierWebhookDemo_1 = require("./zapier-demo/ZapierWebhookDemo");
var ZapierWebhookSection = function (_a) {
  var zapierWebhook = _a.zapierWebhook,
    onZapierWebhookChange = _a.onZapierWebhookChange,
    onTestWebhook = _a.onTestWebhook,
    isTestLoading = _a.isTestLoading;
  var _b = (0, useWebhookValidation_1.useWebhookValidation)("zapier"),
    isZapierWebhookValid = _b.isValid,
    validationMessage = _b.validationMessage,
    validateUrl = _b.validateUrl;
  // Handle input change
  var handleZapierWebhookChange = function (e) {
    var value = e.target.value;
    onZapierWebhookChange(value);
    validateUrl(value);
    // Also store in localStorage for the automatic event system
    if (value) {
      localStorage.setItem("zapier_webhook_url", value);
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4 p-4 border rounded-md border-border/30 bg-muted/20",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Webhook, {
            className: "h-4 w-4 text-primary",
          }),
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-sm font-medium",
            children: "Zapier Integration",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(WebhookInput_1.default, {
        id: "zapier-webhook",
        label: "Zapier Webhook URL",
        placeholder: "https://hooks.zapier.com/hooks/catch/...",
        value: zapierWebhook,
        onChange: handleZapierWebhookChange,
        isValid: isZapierWebhookValid,
        errorMessage: "Invalid Zapier webhook URL",
        validMessage: "Valid Zapier webhook URL",
        validationMessage: validationMessage,
        description:
          "Enter your Zapier webhook URL to automate workflows when events occur in the platform.",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex gap-2",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: onTestWebhook,
            disabled:
              isTestLoading || !zapierWebhook || isZapierWebhookValid !== true,
            children: isTestLoading ? "Testing..." : "Test Webhook",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: function () {
              return window.open("https://zapier.com/apps/webhook", "_blank");
            },
            children: "Zapier Documentation",
          }),
        ],
      }),
      zapierWebhook &&
        isZapierWebhookValid &&
        (0, jsx_runtime_1.jsx)(ZapierWebhookDemo_1.default, {
          webhookUrl: zapierWebhook,
        }),
    ],
  });
};
exports.default = ZapierWebhookSection;
