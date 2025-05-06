"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignNotFound = CampaignNotFound;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function CampaignNotFound(_a) {
  var onBack = _a.onBack;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "container mx-auto px-4 py-12",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "text-center",
      children: [
        (0, jsx_runtime_1.jsx)("h1", {
          className: "text-2xl font-bold mb-2",
          children: "Campaign Not Found",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground mb-4",
          children:
            "The campaign you're looking for doesn't exist or you don't have access to it.",
        }),
        (0, jsx_runtime_1.jsxs)(button_1.Button, {
          onClick: onBack,
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, {
              className: "mr-2 h-4 w-4",
            }),
            "Back to Campaigns",
          ],
        }),
      ],
    }),
  });
}
