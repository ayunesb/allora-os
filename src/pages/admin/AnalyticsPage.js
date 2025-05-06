"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnalyticsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function AnalyticsPage() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-3xl font-bold tracking-tight",
        children: "Analytics Dashboard",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-muted-foreground",
        children: "View and analyze platform usage and performance metrics.",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  className: "text-sm font-medium",
                  children: "Total Users",
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsx)("div", {
                  className: "text-3xl font-bold",
                  children: "2,543",
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  className: "text-sm font-medium",
                  children: "Active Companies",
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsx)("div", {
                  className: "text-3xl font-bold",
                  children: "186",
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                className: "pb-2",
                children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  className: "text-sm font-medium",
                  children: "Total Campaigns",
                }),
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsx)("div", {
                  className: "text-3xl font-bold",
                  children: "1,324",
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
