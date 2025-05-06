"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var WebhookInput_1 = require("./WebhookInput");
var useWebhookValidation_1 = require("./useWebhookValidation");
var sonner_1 = require("sonner");
var badge_1 = require("@/components/ui/badge");
var GitHubWebhookSection = function (_a) {
  var githubWebhook = _a.githubWebhook,
    onGithubWebhookChange = _a.onGithubWebhookChange,
    onTestWebhook = _a.onTestWebhook,
    isTestLoading = _a.isTestLoading;
  var _b = (0, useWebhookValidation_1.useWebhookValidation)("github"),
    isValid = _b.isValid,
    validationMessage = _b.validationMessage,
    validateUrl = _b.validateUrl;
  var _c = (0, react_1.useState)(false),
    isConnected = _c[0],
    setIsConnected = _c[1];
  // Check connection status on mount and when webhook URL changes
  (0, react_1.useEffect)(
    function () {
      // Check if we have a valid GitHub webhook URL stored
      setIsConnected(!!githubWebhook && isValid === true);
    },
    [githubWebhook, isValid],
  );
  // Handle input change
  var handleGithubWebhookChange = function (e) {
    var value = e.target.value;
    onGithubWebhookChange(value);
    validateUrl(value);
  };
  // Handle direct GitHub connect
  var handleDirectGitHubConnect = function () {
    // In a real implementation, this would open GitHub OAuth flow
    // For demo purposes, we'll simulate a successful connection
    sonner_1.toast.success("GitHub connection initiated");
    // Simulate the OAuth process
    setTimeout(function () {
      var mockGitHubWebhookUrl =
        "https://api.github.com/repos/allora-ai/platform/hooks/12345678";
      onGithubWebhookChange(mockGitHubWebhookUrl);
      validateUrl(mockGitHubWebhookUrl);
      setIsConnected(true);
      sonner_1.toast.success("GitHub repository connected successfully!");
    }, 1500);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4 p-4 border rounded-md border-border/30 bg-muted/20",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Github, {
                className: "h-4 w-4 ".concat(
                  isConnected ? "text-green-500" : "text-primary",
                ),
              }),
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-sm font-medium",
                children: "GitHub Integration",
              }),
            ],
          }),
          isConnected
            ? (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                variant: "outline",
                className: "bg-green-50 text-green-700 border-green-200",
                children: "Connected",
              })
            : (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                variant: "outline",
                className: "bg-orange-50 text-orange-700 border-orange-200",
                children: "Not Connected",
              }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(WebhookInput_1.default, {
        id: "github-webhook",
        label: "GitHub Webhook URL",
        placeholder: "https://api.github.com/repos/username/repo/hooks/...",
        value: githubWebhook,
        onChange: handleGithubWebhookChange,
        isValid: isValid,
        errorMessage: "Invalid GitHub webhook URL",
        validMessage: "Valid GitHub webhook URL",
        validationMessage: validationMessage,
        description:
          "Enter your GitHub webhook URL to receive repository events like pushes, pull requests, etc.",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-wrap gap-2",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: onTestWebhook,
            disabled: isTestLoading || !githubWebhook || isValid !== true,
            children: isTestLoading ? "Testing..." : "Test Webhook",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: function () {
              return window.open(
                "https://docs.github.com/en/developers/webhooks-and-events/webhooks",
                "_blank",
              );
            },
            children: "GitHub Docs",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "default",
            size: "sm",
            className: "gap-2",
            onClick: handleDirectGitHubConnect,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Link2, {
                className: "h-4 w-4",
              }),
              "Connect GitHub Directly",
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = GitHubWebhookSection;
