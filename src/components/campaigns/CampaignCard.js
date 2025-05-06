"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CampaignCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
function CampaignCard(_a) {
  var _b;
  var campaign = _a.campaign,
    onEdit = _a.onEdit,
    onDelete = _a.onDelete,
    onFeedback = _a.onFeedback,
    onExport = _a.onExport;
  var executiveName =
    typeof campaign.executiveBot === "string"
      ? campaign.executiveBot
      : ((_b = campaign.executiveBot) === null || _b === void 0
          ? void 0
          : _b.name) || "";
  var getStatusColor = function () {
    var _a;
    var status =
      (_a = campaign.status) === null || _a === void 0
        ? void 0
        : _a.toLowerCase();
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500";
      case "paused":
        return "bg-yellow-500/10 text-yellow-500";
      case "completed":
        return "bg-blue-500/10 text-blue-500";
      case "draft":
        return "bg-gray-500/10 text-gray-500";
      case "approved":
        return "bg-purple-500/10 text-purple-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };
  var getHealthColor = function () {
    switch (campaign.healthScore) {
      case "good":
        return "bg-green-500/10 text-green-500";
      case "warning":
        return "bg-yellow-500/10 text-yellow-500";
      case "critical":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };
  var renderMetrics = function () {
    var metrics = [];
    if (campaign.impressions !== undefined)
      metrics.push(
        "Impressions: ".concat(campaign.impressions.toLocaleString()),
      );
    if (campaign.clicks !== undefined)
      metrics.push("Clicks: ".concat(campaign.clicks.toLocaleString()));
    if (campaign.leads !== undefined)
      metrics.push("Leads: ".concat(campaign.leads));
    return metrics.length > 0 ? metrics.join(" | ") : "No metrics available";
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "overflow-hidden",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-2",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: campaign.name,
                }),
                (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
                  className: "flex items-center mt-1",
                  children: [
                    (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: "outline",
                      className: "mr-2",
                      children: campaign.platform,
                    }),
                    campaign.status &&
                      (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                        variant: "outline",
                        className: getStatusColor(),
                        children: campaign.status,
                      }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, {
              children: [
                (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, {
                  asChild: true,
                  children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "ghost",
                    size: "icon",
                    children: (0, jsx_runtime_1.jsx)(
                      lucide_react_1.MoreHorizontal,
                      { className: "h-4 w-4" },
                    ),
                  }),
                }),
                (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, {
                  align: "end",
                  children: [
                    (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, {
                      onClick: function () {
                        return onEdit(campaign.id);
                      },
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, {
                          className: "mr-2 h-4 w-4",
                        }),
                        "Edit",
                      ],
                    }),
                    onExport &&
                      (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                        children: [
                          (0, jsx_runtime_1.jsxs)(
                            dropdown_menu_1.DropdownMenuItem,
                            {
                              onClick: function () {
                                return onExport(campaign.id, "pdf");
                              },
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.Download,
                                  { className: "mr-2 h-4 w-4" },
                                ),
                                "Export as PDF",
                              ],
                            },
                          ),
                          (0, jsx_runtime_1.jsxs)(
                            dropdown_menu_1.DropdownMenuItem,
                            {
                              onClick: function () {
                                return onExport(campaign.id, "csv");
                              },
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.Download,
                                  { className: "mr-2 h-4 w-4" },
                                ),
                                "Export as CSV",
                              ],
                            },
                          ),
                        ],
                      }),
                    (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuItem, {
                      onClick: function () {
                        return onDelete(campaign.id);
                      },
                      className: "text-destructive",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, {
                          className: "mr-2 h-4 w-4",
                        }),
                        "Delete",
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "pb-2",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "grid grid-cols-2 gap-y-1 text-sm mb-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "text-muted-foreground",
                      children: "Budget:",
                    }),
                    (0, jsx_runtime_1.jsxs)("span", {
                      children: ["$", campaign.budget || 0],
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "text-muted-foreground",
                      children: "Health:",
                    }),
                    (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                      variant: "outline",
                      className: getHealthColor(),
                      children: campaign.healthScore
                        ? campaign.healthScore.charAt(0).toUpperCase() +
                          campaign.healthScore.slice(1)
                        : "N/A",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "text-muted-foreground",
                      children: "Created by:",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      children: executiveName || "N/A",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground mt-2",
                  children: renderMetrics(),
                }),
              ],
            }),
            campaign.justification &&
              (0, jsx_runtime_1.jsxs)("div", {
                className: "bg-muted p-3 rounded-md text-sm",
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "font-medium mb-1",
                    children: "Executive Justification:",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-muted-foreground",
                    children: campaign.justification,
                  }),
                ],
              }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
        className: "flex flex-col space-y-2",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "w-full flex space-x-2",
          children: [
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              className: "flex-1",
              onClick: function () {
                return onEdit(campaign.id);
              },
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, {
                  className: "mr-2 h-4 w-4",
                }),
                "Edit",
              ],
            }),
            onFeedback &&
              campaign.aiGenerated &&
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex space-x-2 flex-1",
                children: [
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    className:
                      "flex-1 bg-green-500/10 hover:bg-green-500/20 border-green-500/30",
                    onClick: function () {
                      return onFeedback(campaign.id, true);
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsUp, {
                        className: "mr-2 h-4 w-4",
                      }),
                      "Approve",
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    className:
                      "flex-1 bg-red-500/10 hover:bg-red-500/20 border-red-500/30",
                    onClick: function () {
                      return onFeedback(campaign.id, false);
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsDown, {
                        className: "mr-2 h-4 w-4",
                      }),
                      "Reject",
                    ],
                  }),
                ],
              }),
          ],
        }),
      }),
    ],
  });
}
