"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsEmptyState = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var AddLeadDialog_1 = require("@/components/admin/leads/AddLeadDialog");
var campaigns_1 = require("@/hooks/campaigns");
var LeadsEmptyState = function () {
  var campaigns = (0, campaigns_1.useCampaigns)().campaigns;
  var formattedCampaigns = campaigns.map(function (campaign) {
    return {
      id: campaign.id,
      name: campaign.name,
    };
  });
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full shadow-md",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "text-center",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-2xl font-bold",
            children: "No Leads Yet",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "Start building your leads database to track potential customers",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "flex flex-col items-center space-y-6 py-8",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "rounded-full bg-primary/10 p-6",
            children: (0, jsx_runtime_1.jsx)(lucide_react_1.UserPlus, {
              className: "h-10 w-10 text-primary",
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "text-center max-w-md",
            children: (0, jsx_runtime_1.jsx)("p", {
              className: "mb-4",
              children:
                "Add your first lead to start managing your sales pipeline. You can manually add leads or import them from a CSV file.",
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "flex justify-center gap-4",
        children: [
          (0, jsx_runtime_1.jsx)(AddLeadDialog_1.AddLeadDialog, {
            onLeadAdded: function () {},
            campaigns: formattedCampaigns,
            isMobileView: false,
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            className: "gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Upload, {
                className: "h-4 w-4",
              }),
              "Import from CSV",
            ],
          }),
        ],
      }),
    ],
  });
};
exports.LeadsEmptyState = LeadsEmptyState;
