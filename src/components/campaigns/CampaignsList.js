"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignsList;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var skeleton_1 = require("@/components/ui/skeleton");
var CampaignCard_1 = require("./CampaignCard");
function CampaignsList(_a) {
  var campaigns = _a.campaigns,
    isLoading = _a.isLoading,
    handleEditCampaign = _a.handleEditCampaign,
    deleteCampaign = _a.deleteCampaign,
    onCreateCampaign = _a.onCreateCampaign,
    onApproveCampaign = _a.onApproveCampaign,
    onExportCampaign = _a.onExportCampaign;
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6",
      children: __spreadArray([], Array(3), true).map(function (_, i) {
        return (0, jsx_runtime_1.jsx)(
          card_1.Card,
          {
            className: "overflow-hidden",
            children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              className: "p-0",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "p-6",
                  children: [
                    (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-5 w-3/4 mb-2",
                    }),
                    (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-4 w-1/2 mb-6",
                    }),
                    (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-2 w-full mb-3",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "grid grid-cols-2 gap-4 mb-4",
                      children: [
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-4 w-full",
                        }),
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-4 w-full",
                        }),
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-4 w-full",
                        }),
                        (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                          className: "h-4 w-full",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-24 w-full mb-4",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "border-t p-4 flex justify-between",
                  children: [
                    (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-9 w-[48%]",
                    }),
                    (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                      className: "h-9 w-[48%]",
                    }),
                  ],
                }),
              ],
            }),
          },
          i,
        );
      }),
    });
  }
  if (campaigns.length === 0) {
    return (0, jsx_runtime_1.jsx)(card_1.Card, {
      className: "mt-6",
      children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className:
          "flex flex-col items-center justify-center py-10 text-center",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "rounded-full bg-primary/10 p-3 mb-4",
            children: (0, jsx_runtime_1.jsx)(lucide_react_1.LineChart, {
              className: "h-6 w-6 text-primary",
            }),
          }),
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-semibold mb-2",
            children: "No campaigns yet",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground max-w-md mb-6",
            children:
              "Create your first marketing campaign to start promoting your business and tracking results.",
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: onCreateCampaign,
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                className: "mr-2 h-4 w-4",
              }),
              "Create Your First Campaign",
            ],
          }),
        ],
      }),
    });
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6",
    children: campaigns.map(function (campaign) {
      return (0, jsx_runtime_1.jsx)(
        CampaignCard_1.default,
        {
          campaign: campaign,
          onEdit: handleEditCampaign,
          onDelete: deleteCampaign,
          onFeedback: function (id, isPositive) {
            if (isPositive && onApproveCampaign) {
              onApproveCampaign(id);
            }
          },
          onExport: function (id, format) {
            if (onExportCampaign) {
              onExportCampaign(id, format);
            }
          },
        },
        campaign.id,
      );
    }),
  });
}
