"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var WebhookInput_1 = require("./WebhookInput");
var useWebhookValidation_1 = require("./useWebhookValidation");
var SlackWebhookSection = function (_a) {
  var slackWebhook = _a.slackWebhook,
    onSlackWebhookChange = _a.onSlackWebhookChange,
    onTestWebhook = _a.onTestWebhook,
    isTestLoading = _a.isTestLoading;
  var _b = (0, useWebhookValidation_1.useWebhookValidation)("slack"),
    isValid = _b.isValid,
    validationMessage = _b.validationMessage,
    validateUrl = _b.validateUrl;
  // Handle input change
  var handleSlackWebhookChange = function (e) {
    var value = e.target.value;
    onSlackWebhookChange(value);
    validateUrl(value);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4 p-4 border rounded-md border-border/30 bg-muted/20",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
            className: "h-4 w-4 text-primary",
          }),
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-sm font-medium",
            children: "Slack Integration",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(WebhookInput_1.default, {
        id: "slack-webhook",
        label: "Slack Webhook URL",
        placeholder:
          "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
        value: slackWebhook,
        onChange: handleSlackWebhookChange,
        isValid: isValid,
        errorMessage: "Invalid Slack webhook URL",
        validMessage: "Valid Slack webhook URL",
        validationMessage: validationMessage,
        description:
          "Enter your Slack incoming webhook URL to send notifications to your Slack channels.",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex gap-2",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: onTestWebhook,
            disabled: isTestLoading || !slackWebhook || isValid !== true,
            children: isTestLoading ? "Testing..." : "Test Webhook",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: function () {
              return window.open(
                "https://api.slack.com/messaging/webhooks",
                "_blank",
              );
            },
            children: "Slack Webhooks Documentation",
          }),
        ],
      }),
    ],
  });
};
exports.default = SlackWebhookSection;
