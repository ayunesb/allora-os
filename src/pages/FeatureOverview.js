"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FeatureOverview;
var jsx_runtime_1 = require("react/jsx-runtime");
var page_title_1 = require("@/components/ui/page-title");
function FeatureOverview() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-10",
    children: [
      (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
        title: "Feature Overview",
        description: "Explore what Allora AI can do for your business",
        children: "Feature Overview",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mt-8 space-y-12",
        children: [
          (0, jsx_runtime_1.jsxs)("section", {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-2xl font-bold",
                children: "AI Executive Team",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children:
                  "Access a virtual board of AI executives that provide specialized advice tailored to your business.",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("section", {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-2xl font-bold",
                children: "Dashboard & Analytics",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children:
                  "Get personalized strategic overviews and actionable business recommendations.",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("section", {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-2xl font-bold",
                children: "Communication Tools",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children:
                  "Make calls, send messages, and create customized scripts all from one platform.",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
