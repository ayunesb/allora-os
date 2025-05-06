"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminDashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var page_title_1 = require("@/components/ui/page-title");
function AdminDashboard() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-6",
    children: [
      (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
        title: "Admin Dashboard",
        description: "Manage your platform settings",
        children: "Admin Dashboard",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "p-4 border rounded-lg bg-card",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium",
                children: "User Management",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Manage users and permissions",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "p-4 border rounded-lg bg-card",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium",
                children: "System Settings",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Configure global settings",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "p-4 border rounded-lg bg-card",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium",
                children: "Analytics",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "View platform analytics",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
