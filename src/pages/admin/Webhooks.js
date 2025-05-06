"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Webhooks;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function Webhooks() {
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-6",
    children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Webhook Management",
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: "Configure integrations with external services",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)("p", {
            children: "Webhook configuration content will be displayed here.",
          }),
        }),
      ],
    }),
  });
}
