"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WebhookManagement;
var jsx_runtime_1 = require("react/jsx-runtime");
var admin_1 = require("@/components/admin");
var react_helmet_async_1 = require("react-helmet-async");
function WebhookManagement() {
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "Webhook Management | Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-2xl font-bold",
                children: "Webhook Management",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground mb-4",
                children:
                  "Configure and manage webhooks to integrate with external services",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(admin_1.WebhooksTab, {}),
        ],
      }),
    ],
  });
}
