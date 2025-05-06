"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookConfigTab = exports.WebhookConfigForm = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var WebhookConfigForm = function (_a) {
  var webhookType = _a.webhookType,
    onWebhookTypeChange = _a.onWebhookTypeChange,
    _b = _a.stripeWebhook,
    stripeWebhook = _b === void 0 ? "" : _b,
    _c = _a.stripeSecret,
    stripeSecret = _c === void 0 ? "" : _c,
    _d = _a.zapierWebhook,
    zapierWebhook = _d === void 0 ? "" : _d,
    _e = _a.githubWebhook,
    githubWebhook = _e === void 0 ? "" : _e,
    _f = _a.githubSecret,
    githubSecret = _f === void 0 ? "" : _f,
    _g = _a.slackWebhook,
    slackWebhook = _g === void 0 ? "" : _g,
    _h = _a.customWebhook,
    customWebhook = _h === void 0 ? "" : _h,
    _j = _a.stripeValid,
    stripeValid = _j === void 0 ? false : _j,
    _k = _a.zapierValid,
    zapierValid = _k === void 0 ? false : _k,
    _l = _a.githubValid,
    githubValid = _l === void 0 ? false : _l,
    _m = _a.slackValid,
    slackValid = _m === void 0 ? false : _m,
    _o = _a.customValid,
    customValid = _o === void 0 ? false : _o,
    onSave = _a.onSave,
    onDelete = _a.onDelete,
    onTest = _a.onTest;
  // Simple placeholder for the form component
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsx)("h3", {
        className: "text-lg font-medium",
        children: "Configure Webhooks",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-sm text-muted-foreground",
        children: "Set up integration webhooks for external services",
      }),
    ],
  });
};
exports.WebhookConfigForm = WebhookConfigForm;
var WebhookConfigTab = function (_a) {
  var stripeWebhook = _a.stripeWebhook,
    stripeSecret = _a.stripeSecret,
    zapierWebhook = _a.zapierWebhook,
    githubWebhook = _a.githubWebhook,
    githubSecret = _a.githubSecret,
    slackWebhook = _a.slackWebhook,
    customWebhook = _a.customWebhook,
    _b = _a.stripeValid,
    stripeValid = _b === void 0 ? false : _b,
    _c = _a.zapierValid,
    zapierValid = _c === void 0 ? false : _c,
    _d = _a.githubValid,
    githubValid = _d === void 0 ? false : _d,
    _e = _a.slackValid,
    slackValid = _e === void 0 ? false : _e,
    _f = _a.customValid,
    customValid = _f === void 0 ? false : _f,
    onSave = _a.onSave,
    onDelete = _a.onDelete,
    onTest = _a.onTest,
    onTypeChange = _a.onTypeChange,
    // Handle legacy props
    stripeWebhookId = _a.stripeWebhookId,
    stripeEndpointSecret = _a.stripeEndpointSecret,
    zapierWebhookUrl = _a.zapierWebhookUrl,
    githubWebhookUrl = _a.githubWebhookUrl,
    slackWebhookUrl = _a.slackWebhookUrl,
    customWebhookUrl = _a.customWebhookUrl;
  var _g = (0, react_1.useState)("stripe"),
    activeWebhookType = _g[0],
    setActiveWebhookType = _g[1];
  // Map legacy props to new prop names
  var effectiveStripeWebhook = stripeWebhook || stripeWebhookId;
  var effectiveStripeSecret = stripeSecret || stripeEndpointSecret;
  var effectiveZapierWebhook = zapierWebhook || zapierWebhookUrl;
  var effectiveGithubWebhook = githubWebhook || githubWebhookUrl;
  var effectiveGithubSecret = githubSecret || "";
  var effectiveSlackWebhook = slackWebhook || slackWebhookUrl;
  var effectiveCustomWebhook = customWebhook || customWebhookUrl;
  var handleTypeChange = function (type) {
    setActiveWebhookType(type);
    if (onTypeChange) {
      onTypeChange(type);
    }
  };
  return (0, jsx_runtime_1.jsx)(exports.WebhookConfigForm, {
    webhookType: activeWebhookType,
    onWebhookTypeChange: handleTypeChange,
    stripeWebhook: effectiveStripeWebhook,
    stripeSecret: effectiveStripeSecret,
    zapierWebhook: effectiveZapierWebhook,
    githubWebhook: effectiveGithubWebhook,
    githubSecret: effectiveGithubSecret,
    slackWebhook: effectiveSlackWebhook,
    customWebhook: effectiveCustomWebhook,
    stripeValid: stripeValid,
    zapierValid: zapierValid,
    githubValid: githubValid,
    slackValid: slackValid,
    customValid: customValid,
    onSave: onSave,
    onDelete: onDelete,
    onTest: onTest,
  });
};
exports.WebhookConfigTab = WebhookConfigTab;
exports.default = exports.WebhookConfigTab;
