"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var date_fns_1 = require("date-fns");
var CampaignList = function (_a) {
  var campaigns = _a.campaigns,
    filteredCampaigns = _a.filteredCampaigns,
    onCreateCampaign = _a.onCreateCampaign,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b;
  var _c = (0, react_1.useState)(null),
    expandedCampaignId = _c[0],
    setExpandedCampaignId = _c[1];
  var campaignsToDisplay = filteredCampaigns || campaigns;
  var toggleCampaign = function (id) {
    setExpandedCampaignId(expandedCampaignId === id ? null : id);
  };
  // Helper function to safely format dates
  var formatDate = function (dateString) {
    if (!dateString) return null;
    try {
      return (0, date_fns_1.format)(
        (0, date_fns_1.parseISO)(dateString),
        "MMM dd, yyyy",
      );
    } catch (e) {
      return "Invalid date";
    }
  };
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("p", { children: "Loading campaigns..." });
  }
  if (!campaignsToDisplay || campaignsToDisplay.length === 0) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "text-center p-8",
      children: [
        (0, jsx_runtime_1.jsx)("p", { children: "No campaigns found." }),
        onCreateCampaign &&
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: onCreateCampaign,
            className: "mt-4",
            children: "Create Campaign",
          }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    children: campaignsToDisplay.map(function (campaign) {
      return (0, jsx_runtime_1.jsxs)(
        card_1.Card,
        {
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: campaign.name,
              }),
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground",
                  children: campaign.description,
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "mt-2",
                  children: (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                    variant: "secondary",
                    children: campaign.status,
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
              className: "flex items-center justify-between",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  children:
                    campaign.startDate &&
                    (0, jsx_runtime_1.jsxs)("p", {
                      className: "text-xs text-muted-foreground",
                      children: ["Starts: ", formatDate(campaign.startDate)],
                    }),
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  asChild: true,
                  variant: "link",
                  children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, {
                    to: "/dashboard/campaigns/".concat(campaign.id),
                    children: "View Details",
                  }),
                }),
              ],
            }),
          ],
        },
        campaign.id,
      );
    }),
  });
};
exports.CampaignList = CampaignList;
