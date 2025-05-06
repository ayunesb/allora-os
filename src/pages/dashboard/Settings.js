"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Settings;
var jsx_runtime_1 = require("react/jsx-runtime");
var page_title_1 = require("@/components/ui/page-title");
function Settings() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-6",
    children: [
      (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
        title: "Settings",
        description: "Manage your account and application settings",
        children: "Settings",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mt-6 space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "p-4 border rounded-lg",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium",
                children: "Account Settings",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Manage your account preferences",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "p-4 border rounded-lg",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium",
                children: "Notification Settings",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Configure how you receive notifications",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "p-4 border rounded-lg",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium",
                children: "Privacy Settings",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Manage your privacy preferences",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
