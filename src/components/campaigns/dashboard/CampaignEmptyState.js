"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignEmptyState = CampaignEmptyState;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
function CampaignEmptyState(_a) {
  var onCreateCampaign = _a.onCreateCampaign;
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    className: "text-center py-12",
    children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
      children: (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-col items-center",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, {
            className: "h-12 w-12 text-muted-foreground mb-4",
          }),
          (0, jsx_runtime_1.jsx)("h2", {
            className: "text-xl font-semibold mb-2",
            children: "No Campaigns Yet",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground max-w-md mx-auto mb-6",
            children:
              "Start by creating your first advertising campaign to reach your target audience.",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: onCreateCampaign,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                className: "mr-2 h-4 w-4",
              }),
              "Create Your First Campaign",
            ],
          }),
        ],
      }),
    }),
  });
}
