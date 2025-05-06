"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WebhookList;
var jsx_runtime_1 = require("react/jsx-runtime");
var WebhookCard_1 = require("./WebhookCard");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var skeleton_1 = require("@/components/ui/skeleton");
function WebhookList(_a) {
  var webhooks = _a.webhooks,
    isLoading = _a.isLoading,
    onAddWebhook = _a.onAddWebhook,
    onEditWebhook = _a.onEditWebhook,
    onDeleteWebhook = _a.onDeleteWebhook,
    onTestWebhook = _a.onTestWebhook;
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "space-y-4",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center",
          children: [
            (0, jsx_runtime_1.jsx)("h2", {
              className: "text-xl font-semibold",
              children: "Webhooks",
            }),
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              disabled: true,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                  className: "h-4 w-4 mr-2",
                }),
                "Add Webhook",
              ],
            }),
          ],
        }),
        [1, 2, 3].map(function (i) {
          return (0, jsx_runtime_1.jsx)(
            skeleton_1.Skeleton,
            { className: "h-[180px] w-full" },
            i,
          );
        }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center",
        children: [
          (0, jsx_runtime_1.jsx)("h2", {
            className: "text-xl font-semibold",
            children: "Webhooks",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: onAddWebhook,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                className: "h-4 w-4 mr-2",
              }),
              "Add Webhook",
            ],
          }),
        ],
      }),
      webhooks.length === 0
        ? (0, jsx_runtime_1.jsxs)("div", {
            className: "text-center py-12 border rounded-lg",
            children: [
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "No webhooks configured",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: onAddWebhook,
                variant: "link",
                className: "mt-2",
                children: "Add your first webhook",
              }),
            ],
          })
        : (0, jsx_runtime_1.jsx)("div", {
            className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
            children: webhooks.map(function (webhook) {
              return (0, jsx_runtime_1.jsx)(
                WebhookCard_1.default,
                {
                  webhook: webhook,
                  onEdit: onEditWebhook,
                  onDelete: onDeleteWebhook,
                  onTest: onTestWebhook,
                },
                webhook.id,
              );
            }),
          }),
    ],
  });
}
