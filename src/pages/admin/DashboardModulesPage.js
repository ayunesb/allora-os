"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardModulesPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function DashboardModulesPage() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-3xl font-bold tracking-tight",
        children: "Dashboard Modules",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground",
        children: "Configure and manage dashboard modules and components.",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid gap-4 md:grid-cols-2",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Module Manager",
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsx)("p", {
                  children:
                    "Dashboard module management interface will be displayed here.",
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Layout Configuration",
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsx)("p", {
                  children: "Configure dashboard layouts and positioning here.",
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
