"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApiDocumentation;
var jsx_runtime_1 = require("react/jsx-runtime");
var page_title_1 = require("@/components/ui/page-title");
function ApiDocumentation() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-6",
    children: [
      (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
        title: "API Documentation",
        description: "Documentation for the Allora AI API",
        children: "API Documentation",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mt-6 space-y-6",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "p-4 border rounded-lg",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium",
                children: "Authentication",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Learn about API authentication methods",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "p-4 border rounded-lg",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium",
                children: "Endpoints",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Explore available API endpoints",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "p-4 border rounded-lg",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-lg font-medium",
                children: "Examples",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "Code examples for common API operations",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
