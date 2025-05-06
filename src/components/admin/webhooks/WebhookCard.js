"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WebhookCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
function WebhookCard(_a) {
  var webhook = _a.webhook,
    onEdit = _a.onEdit,
    onDelete = _a.onDelete,
    onTest = _a.onTest;
  var formatWebhookType = function (type) {
    return type.replace(/_/g, " ").replace(/\b\w/g, function (c) {
      return c.toUpperCase();
    });
  };
  var truncateUrl = function (url) {
    return url.length > 40 ? "".concat(url.substring(0, 40), "...") : url;
  };
  var getWebhookBadgeColor = function (type) {
    switch (type) {
      case "strategy_created":
        return "bg-blue-100 text-blue-800";
      case "campaign_updated":
        return "bg-green-100 text-green-800";
      case "lead_captured":
        return "bg-yellow-100 text-yellow-800";
      case "payment_received":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-3",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center justify-between",
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              className: "text-lg",
              children: (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                className: "".concat(getWebhookBadgeColor(webhook.type)),
                children: formatWebhookType(webhook.type),
              }),
            }),
            webhook.created_at &&
              (0, jsx_runtime_1.jsxs)("div", {
                className: "text-xs text-muted-foreground flex items-center",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                    className: "h-3 w-3 mr-1",
                  }),
                  new Date(webhook.created_at).toLocaleDateString(),
                ],
              }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "space-y-2",
          children: (0, jsx_runtime_1.jsxs)("div", {
            className: "text-sm",
            children: [
              (0, jsx_runtime_1.jsx)("span", {
                className: "font-medium",
                children: "URL:",
              }),
              " ",
              (0, jsx_runtime_1.jsxs)("a", {
                href: webhook.url,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-primary hover:underline flex items-center",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "truncate",
                    children: truncateUrl(webhook.url),
                  }),
                  (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, {
                    className: "ml-1 h-3 w-3",
                  }),
                ],
              }),
            ],
          }),
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "flex justify-end gap-2 pt-2",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: function () {
              return onTest(webhook.id);
            },
            children: "Test",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: function () {
              return onEdit(webhook);
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, {
                className: "h-4 w-4 mr-1",
              }),
              "Edit",
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "destructive",
            size: "sm",
            onClick: function () {
              return onDelete(webhook.id);
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, {
                className: "h-4 w-4 mr-1",
              }),
              "Delete",
            ],
          }),
        ],
      }),
    ],
  });
}
