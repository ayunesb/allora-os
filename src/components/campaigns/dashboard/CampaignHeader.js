"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignHeader = CampaignHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
/**
 * CampaignHeader Component
 *
 * Displays the header for the campaign dashboard with title and action buttons
 * for refreshing data and creating new campaigns.
 */
function CampaignHeader(_a) {
  var onRefresh = _a.onRefresh,
    onCreateCampaign = _a.onCreateCampaign,
    isRefreshing = _a.isRefreshing;
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-3xl font-bold mb-1",
            children: "Campaign Dashboard",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground",
            children:
              "Manage your advertising campaigns across different platforms",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex gap-2",
        children: [
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            onClick: onRefresh,
            disabled: isRefreshing,
            "aria-label": isRefreshing
              ? "Refreshing campaign data"
              : "Refresh campaign data",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCcw, {
                className: "mr-2 h-4 w-4 ".concat(
                  isRefreshing ? "animate-spin" : "",
                ),
              }),
              isRefreshing ? "Refreshing..." : "Refresh Data",
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: onCreateCampaign,
            "aria-label": "Create new campaign",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                className: "mr-2 h-4 w-4",
              }),
              "Create Campaign",
            ],
          }),
        ],
      }),
    ],
  });
}
