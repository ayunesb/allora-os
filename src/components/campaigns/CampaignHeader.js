"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function CampaignHeader(_a) {
  var onNewCampaign = _a.onNewCampaign;
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 animate-fadeIn",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart, {
            className: "h-8 w-8 text-primary mr-3",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-3xl font-bold gradient-text",
                children: "Marketing Campaigns",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground mt-1",
                children:
                  "Create and manage ad campaigns with AI executive assistance",
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(button_1.Button, {
        onClick: onNewCampaign,
        variant: "gradient",
        className: "shadow-lg hover:shadow-primary/20",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
            className: "mr-2 h-4 w-4",
          }),
          "New Campaign",
        ],
      }),
    ],
  });
}
