"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignDetailHeader = CampaignDetailHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var lucide_react_2 = require("lucide-react");
var TikTokIcon_1 = require("@/components/icons/TikTokIcon");
function CampaignDetailHeader(_a) {
  var campaign = _a.campaign,
    onBack = _a.onBack,
    onDeploy = _a.onDeploy,
    isDeploying = _a.isDeploying;
  var getStatusBadge = function () {
    if (campaign.payment_status !== "paid") {
      return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
        variant: "destructive",
        children: "Payment Required",
      });
    }
    if (campaign.deployment_status === "pending") {
      return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
        variant: "outline",
        children: "Pending Deployment",
      });
    }
    if (campaign.deployment_status === "ready") {
      return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
        variant: "outline",
        className: "bg-yellow-100 text-yellow-800 border-yellow-300",
        children: "Ready to Deploy",
      });
    }
    if (campaign.deployment_status === "deployed") {
      if (
        campaign.platform_status === "ACTIVE" ||
        campaign.platform_status === "CAMPAIGN_STATUS_ENABLE"
      ) {
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className: "bg-green-100 text-green-800 border-green-300",
          children: "Live",
        });
      } else {
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "secondary",
          children: campaign.platform_status,
        });
      }
    }
    return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
      children: campaign.deployment_status,
    });
  };
  // Helper function to determine platform safely
  var getPlatform = function () {
    return campaign.ad_platform || campaign.platform;
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex items-center mb-8",
    children: [
      (0, jsx_runtime_1.jsxs)(button_1.Button, {
        variant: "ghost",
        size: "sm",
        onClick: onBack,
        className: "mr-4",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowLeft, {
            className: "h-4 w-4 mr-1",
          }),
          "Back",
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-2xl font-bold",
                children: campaign.name,
              }),
              getStatusBadge(),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center text-muted-foreground mt-1",
            children: [
              getPlatform() === "meta"
                ? (0, jsx_runtime_1.jsx)(lucide_react_2.Facebook, {
                    className: "h-4 w-4 mr-1 text-blue-600",
                  })
                : (0, jsx_runtime_1.jsx)(TikTokIcon_1.TikTokIcon, {
                    className: "h-4 w-4 mr-1",
                  }),
              (0, jsx_runtime_1.jsx)("span", {
                children: getPlatform() === "meta" ? "Meta Ads" : "TikTok Ads",
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "ml-auto flex gap-2",
        children:
          campaign.payment_status === "paid" &&
          campaign.deployment_status === "ready" &&
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: onDeploy,
            disabled: isDeploying,
            children: isDeploying
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCcw, {
                      className: "mr-2 h-4 w-4 animate-spin",
                    }),
                    "Deploying...",
                  ],
                })
              : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Share2, {
                      className: "mr-2 h-4 w-4",
                    }),
                    "Deploy Campaign",
                  ],
                }),
          }),
      }),
    ],
  });
}
