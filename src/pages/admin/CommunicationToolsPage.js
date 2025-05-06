"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommunicationToolsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function CommunicationToolsPage() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-3xl font-bold tracking-tight",
        children: "Communication Tools",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground",
        children: "Manage and configure communication tools and integrations.",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid gap-4 md:grid-cols-2",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Message Templates",
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsx)("p", {
                  children: "Manage communication templates here.",
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "API Integrations",
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsx)("p", {
                  children:
                    "Configure third-party messaging service integrations.",
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
