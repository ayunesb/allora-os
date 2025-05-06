"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var WebhookInput_1 = require("./WebhookInput");
var useWebhookValidation_1 = require("./useWebhookValidation");
var CustomWebhookSection = function (_a) {
  var customWebhook = _a.customWebhook,
    onCustomWebhookChange = _a.onCustomWebhookChange,
    onTestWebhook = _a.onTestWebhook,
    isTestLoading = _a.isTestLoading,
    _b = _a.webhookName,
    webhookName = _b === void 0 ? "Custom" : _b;
  var _c = (0, useWebhookValidation_1.useWebhookValidation)("custom"),
    isValid = _c.isValid,
    validationMessage = _c.validationMessage,
    validateUrl = _c.validateUrl;
  // Handle input change
  var handleCustomWebhookChange = function (e) {
    var value = e.target.value;
    onCustomWebhookChange(value);
    validateUrl(value);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4 p-4 border rounded-md border-border/30 bg-muted/20",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Link, {
            className: "h-4 w-4 text-primary",
          }),
          (0, jsx_runtime_1.jsxs)("h3", {
            className: "text-sm font-medium",
            children: [webhookName, " Webhook"],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(WebhookInput_1.default, {
        id: "custom-webhook",
        label: "".concat(webhookName, " Webhook URL"),
        placeholder: "https://api.example.com/webhooks/your-endpoint",
        value: customWebhook,
        onChange: handleCustomWebhookChange,
        isValid: isValid,
        errorMessage: "Invalid webhook URL",
        validMessage: "Valid webhook URL",
        validationMessage: validationMessage,
        description: "Enter your ".concat(
          webhookName.toLowerCase(),
          " webhook URL to integrate with external services.",
        ),
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex gap-2",
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "outline",
          size: "sm",
          onClick: onTestWebhook,
          disabled: isTestLoading || !customWebhook || isValid !== true,
          children: isTestLoading ? "Testing..." : "Test Webhook",
        }),
      }),
    ],
  });
};
exports.default = CustomWebhookSection;
