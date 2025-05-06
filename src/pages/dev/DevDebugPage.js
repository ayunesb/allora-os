"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DevDebugPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var page_title_1 = require("@/components/ui/page-title");
function DevDebugPage() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-6",
    children: [
      (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
        title: "Debug Page",
        description: "For development and testing",
        children: "Debug Page",
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "mt-6 space-y-6",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "p-4 border rounded-lg",
          children: [
            (0, jsx_runtime_1.jsx)("h3", {
              className: "text-lg font-medium",
              children: "Debug Information",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground",
              children: "Development tools and settings",
            }),
          ],
        }),
      }),
    ],
  });
}
