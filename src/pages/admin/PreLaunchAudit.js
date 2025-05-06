"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PreLaunchAudit;
var jsx_runtime_1 = require("react/jsx-runtime");
var page_title_1 = require("@/components/ui/page-title");
function PreLaunchAudit() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-6",
    children: [
      (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
        title: "Pre-Launch Audit",
        description: "Verify your application before launch",
        children: "Pre-Launch Audit",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mt-6 space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "p-4 border rounded-lg",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium",
                children: "Security Audit",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Review security measures and practices",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "p-4 border rounded-lg",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium",
                children: "Performance Check",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Analyze application performance metrics",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "p-4 border rounded-lg",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium",
                children: "Compliance Review",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Verify compliance with relevant regulations",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
