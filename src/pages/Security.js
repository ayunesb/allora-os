"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Security;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_helmet_async_1 = require("react-helmet-async");
var PageErrorBoundary_1 = require("@/components/errorHandling/PageErrorBoundary");
function Security() {
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "Security Settings - Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsx)(PageErrorBoundary_1.PageErrorBoundary, {
        pageName: "Security Settings",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "container mx-auto px-4 py-6",
          children: [
            (0, jsx_runtime_1.jsx)("h1", {
              className: "text-2xl font-bold tracking-tight mb-6",
              children: "Security Settings",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground",
              children:
                "Manage your security settings and authentication preferences",
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "mt-8 p-6 border rounded-lg bg-card",
              children: [
                (0, jsx_runtime_1.jsx)("h2", {
                  className: "text-xl font-medium mb-4",
                  children: "Security Options",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  children:
                    "This is a placeholder for the Security page content.",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
