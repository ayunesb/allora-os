"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Overview;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function Overview() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "grid gap-6 lg:grid-cols-3",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "col-span-1",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Active Campaigns",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "text-3xl font-semibold",
            children: "7",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "col-span-1",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Monthly Leads",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "text-3xl font-semibold",
            children: "318",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "col-span-1",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "ROI %",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "text-3xl font-semibold",
            children: "147%",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "col-span-full lg:col-span-2",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Campaign Performance",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "text-muted-foreground",
            children: "[\uD83D\uDCCA Chart coming soon]",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "col-span-full lg:col-span-1",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
            children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
              children: "Recent Activity",
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("ul", {
              className: "space-y-2 text-sm",
              children: [
                (0, jsx_runtime_1.jsx)("li", {
                  children: '\u2705 Approved "Mother\'s Day Promo"',
                }),
                (0, jsx_runtime_1.jsx)("li", {
                  children: "\uD83D\uDD01 Refreshed Meta data sync",
                }),
                (0, jsx_runtime_1.jsx)("li", {
                  children: "\uD83D\uDCE5 Imported leads from Zapier",
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
