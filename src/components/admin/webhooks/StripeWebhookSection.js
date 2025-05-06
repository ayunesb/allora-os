"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var WebhookInput_1 = require("./WebhookInput");
var useWebhookValidation_1 = require("./useWebhookValidation");
var StripeWebhookSection = function (_a) {
  var stripeWebhook = _a.stripeWebhook,
    onStripeWebhookChange = _a.onStripeWebhookChange,
    onTestWebhook = _a.onTestWebhook,
    isTestLoading = _a.isTestLoading,
    externalIsValid = _a.isValid;
  var _b = (0, useWebhookValidation_1.useWebhookValidation)("stripe"),
    internalIsValid = _b.isValid,
    validationMessage = _b.validationMessage,
    validateUrl = _b.validateUrl;
  // Use external isValid if provided, otherwise use internal validation
  var isStripeWebhookValid =
    externalIsValid !== undefined ? externalIsValid : internalIsValid;
  // Handle input change
  var handleStripeWebhookChange = function (e) {
    var value = e.target.value;
    onStripeWebhookChange(value);
    validateUrl(value);
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
            children: "Stripe Webhook",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(WebhookInput_1.default, {
        id: "stripe-webhook",
        label: "Stripe Webhook URL",
        placeholder: "https://your-domain.com/api/webhooks/stripe",
        value: stripeWebhook,
        onChange: handleStripeWebhookChange,
        isValid: isStripeWebhookValid,
        errorMessage: "Invalid URL format",
        validMessage: "Valid URL format",
        validationMessage: validationMessage,
        description:
          "Enter the URL where Stripe should send webhook events. This is used for payment processing.",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex gap-2",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: onTestWebhook,
            disabled:
              isTestLoading || !stripeWebhook || isStripeWebhookValid !== true,
            children: isTestLoading ? "Testing..." : "Test Webhook",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: function () {
              return window.open("https://stripe.com/docs/webhooks", "_blank");
            },
            children: "Stripe Documentation",
          }),
        ],
      }),
    ],
  });
};
exports.default = StripeWebhookSection;
