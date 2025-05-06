"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignMetricCards = CampaignMetricCards;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function CampaignMetricCards(_a) {
  var campaign = _a.campaign;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-8",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.Card, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          className: "p-4",
          children: (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-1",
            children: [
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-sm text-muted-foreground",
                children: "Budget",
              }),
              (0, jsx_runtime_1.jsxs)("p", {
                className: "text-2xl font-bold",
                children: ["$", campaign.budget.toLocaleString()],
              }),
            ],
          }),
        }),
      }),
      campaign.management_fee !== undefined &&
        (0, jsx_runtime_1.jsx)(card_1.Card, {
          children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "p-4",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-1",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Management Fee",
                }),
                (0, jsx_runtime_1.jsxs)("p", {
                  className: "text-2xl font-bold",
                  children: ["$", campaign.management_fee.toLocaleString()],
                }),
              ],
            }),
          }),
        }),
      campaign.total_amount !== undefined &&
        (0, jsx_runtime_1.jsx)(card_1.Card, {
          children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "p-4",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-1",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground",
                  children: "Total",
                }),
                (0, jsx_runtime_1.jsxs)("p", {
                  className: "text-2xl font-bold",
                  children: ["$", campaign.total_amount.toLocaleString()],
                }),
              ],
            }),
          }),
        }),
    ],
  });
}
