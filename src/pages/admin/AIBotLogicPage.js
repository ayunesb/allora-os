"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AIBotLogicPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function AIBotLogicPage() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-3xl font-bold tracking-tight",
        children: "AI Bot Logic",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground",
        children: "Configure and manage AI bot behavior and responses.",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid gap-4 md:grid-cols-2",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Bot Configuration",
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsx)("p", {
                  children:
                    "AI Bot configuration settings will be displayed here.",
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Response Templates",
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsx)("p", {
                  children: "Manage bot response templates and patterns here.",
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
