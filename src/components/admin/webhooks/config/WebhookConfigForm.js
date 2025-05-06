"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookConfigForm = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var label_1 = require("@/components/ui/label");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
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
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
      className: "pt-6",
      children: (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        value: webhookType,
        onValueChange: onWebhookTypeChange,
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "grid w-full grid-cols-5",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "stripe",
                children: "Stripe",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "zapier",
                children: "Zapier",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "github",
                children: "GitHub",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "slack",
                children: "Slack",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "custom",
                children: "Custom",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
            value: "stripe",
            className: "space-y-4 mt-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "stripe-webhook",
                        children: "Webhook ID",
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(input_1.Input, {
                            id: "stripe-webhook",
                            placeholder: "whsec_...",
                            value: stripeWebhook,
                          }),
                          stripeValid &&
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                              className: "text-green-500 mt-2",
                            }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "stripe-secret",
                        children: "Secret Key",
                      }),
                      (0, jsx_runtime_1.jsx)(input_1.Input, {
                        id: "stripe-secret",
                        placeholder: "sk_...",
                        type: "password",
                        value: stripeSecret,
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-end gap-2 pt-4",
                children: [
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onDelete === null || onDelete === void 0
                        ? void 0
                        : onDelete("stripe");
                    },
                    children: "Delete",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onTest === null || onTest === void 0
                        ? void 0
                        : onTest("stripe");
                    },
                    children: "Test",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    size: "sm",
                    onClick: function () {
                      return onSave === null || onSave === void 0
                        ? void 0
                        : onSave("stripe", {
                            webhook: stripeWebhook,
                            secret: stripeSecret,
                          });
                    },
                    children: "Save",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
            value: "zapier",
            className: "space-y-4 mt-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "zapier-webhook",
                    children: "Webhook URL",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(input_1.Input, {
                        id: "zapier-webhook",
                        placeholder: "https://hooks.zapier.com/...",
                        value: zapierWebhook,
                      }),
                      zapierValid &&
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                          className: "text-green-500 mt-2",
                        }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-end gap-2 pt-4",
                children: [
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onDelete === null || onDelete === void 0
                        ? void 0
                        : onDelete("zapier");
                    },
                    children: "Delete",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onTest === null || onTest === void 0
                        ? void 0
                        : onTest("zapier");
                    },
                    children: "Test",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    size: "sm",
                    onClick: function () {
                      return onSave === null || onSave === void 0
                        ? void 0
                        : onSave("zapier", { webhook: zapierWebhook });
                    },
                    children: "Save",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
            value: "github",
            className: "space-y-4 mt-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "github-webhook",
                        children: "Webhook URL",
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex gap-2",
                        children: [
                          (0, jsx_runtime_1.jsx)(input_1.Input, {
                            id: "github-webhook",
                            placeholder: "https://api.github.com/repos/...",
                            value: githubWebhook,
                          }),
                          githubValid &&
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                              className: "text-green-500 mt-2",
                            }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(label_1.Label, {
                        htmlFor: "github-secret",
                        children: "Secret Key",
                      }),
                      (0, jsx_runtime_1.jsx)(input_1.Input, {
                        id: "github-secret",
                        placeholder: "GitHub webhook secret",
                        type: "password",
                        value: githubSecret,
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-end gap-2 pt-4",
                children: [
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onDelete === null || onDelete === void 0
                        ? void 0
                        : onDelete("github");
                    },
                    children: "Delete",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onTest === null || onTest === void 0
                        ? void 0
                        : onTest("github");
                    },
                    children: "Test",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    size: "sm",
                    onClick: function () {
                      return onSave === null || onSave === void 0
                        ? void 0
                        : onSave("github", {
                            webhook: githubWebhook,
                            secret: githubSecret,
                          });
                    },
                    children: "Save",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
            value: "slack",
            className: "space-y-4 mt-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "slack-webhook",
                    children: "Webhook URL",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(input_1.Input, {
                        id: "slack-webhook",
                        placeholder: "https://hooks.slack.com/services/...",
                        value: slackWebhook,
                      }),
                      slackValid &&
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                          className: "text-green-500 mt-2",
                        }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-end gap-2 pt-4",
                children: [
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onDelete === null || onDelete === void 0
                        ? void 0
                        : onDelete("slack");
                    },
                    children: "Delete",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onTest === null || onTest === void 0
                        ? void 0
                        : onTest("slack");
                    },
                    children: "Test",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    size: "sm",
                    onClick: function () {
                      return onSave === null || onSave === void 0
                        ? void 0
                        : onSave("slack", { webhook: slackWebhook });
                    },
                    children: "Save",
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
            value: "custom",
            className: "space-y-4 mt-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, jsx_runtime_1.jsx)(label_1.Label, {
                    htmlFor: "custom-webhook",
                    children: "Webhook URL",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)(input_1.Input, {
                        id: "custom-webhook",
                        placeholder: "https://your-api.com/webhook",
                        value: customWebhook,
                      }),
                      customValid &&
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                          className: "text-green-500 mt-2",
                        }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children:
                      "Custom webhooks can be used to integrate with any service that accepts HTTP requests.",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex justify-end gap-2 pt-4",
                children: [
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onDelete === null || onDelete === void 0
                        ? void 0
                        : onDelete("custom");
                    },
                    children: "Delete",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onTest === null || onTest === void 0
                        ? void 0
                        : onTest("custom");
                    },
                    children: "Test",
                  }),
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    size: "sm",
                    onClick: function () {
                      return onSave === null || onSave === void 0
                        ? void 0
                        : onSave("custom", { webhook: customWebhook });
                    },
                    children: "Save",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  });
};
exports.WebhookConfigForm = WebhookConfigForm;
