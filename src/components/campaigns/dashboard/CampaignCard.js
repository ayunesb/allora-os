"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignCard = CampaignCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
function CampaignCard(_a) {
  var _b, _c, _d;
  var campaign = _a.campaign,
    onEdit = _a.onEdit,
    onDelete = _a.onDelete,
    onViewAnalytics = _a.onViewAnalytics,
    onStatusChange = _a.onStatusChange;
  var id = campaign.id,
    name = campaign.name,
    description = campaign.description,
    status = campaign.status,
    startDate = campaign.startDate,
    endDate = campaign.endDate,
    budget = campaign.budget,
    _e = campaign.platform,
    platform = _e === void 0 ? "All Platforms" : _e,
    metrics = campaign.metrics,
    createdAt = campaign.createdAt;
  // Format dates with fallbacks
  var formatDate = function (dateString) {
    if (!dateString) return null;
    try {
      return (0, date_fns_1.format)(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      return null;
    }
  };
  var timeAgo = function (dateString) {
    try {
      return (0, date_fns_1.formatDistanceToNow)(new Date(dateString), {
        addSuffix: true,
      });
    } catch (e) {
      return "some time ago";
    }
  };
  var formattedStartDate = formatDate(startDate);
  var formattedEndDate = formatDate(endDate);
  var dateRange =
    formattedStartDate && formattedEndDate
      ? "".concat(formattedStartDate, " - ").concat(formattedEndDate)
      : formattedStartDate
        ? "Started ".concat(formattedStartDate)
        : "No dates set";
  var isDraft = status === "draft";
  var isActive = status === "active";
  var isPaused = status === "paused";
  var isCompleted = status === "completed";
  var statusColor = {
    draft: "bg-gray-200 text-gray-800",
    active: "bg-green-100 text-green-800",
    paused: "bg-amber-100 text-amber-800",
    completed: "bg-blue-100 text-blue-800",
  };
  var getStatusColor = function () {
    if (isDraft) return statusColor.draft;
    if (isActive) return statusColor.active;
    if (isPaused) return statusColor.paused;
    if (isCompleted) return statusColor.completed;
    return statusColor.draft;
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "overflow-hidden",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "p-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-start mb-3",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "font-medium text-lg",
                    children: name,
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-sm text-muted-foreground",
                        children: platform,
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-xs px-2 py-0.5 rounded-full ".concat(
                          getStatusColor(),
                        ),
                        children:
                          status.charAt(0).toUpperCase() + status.slice(1),
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                size: "sm",
                onClick: function () {
                  return onViewAnalytics(id);
                },
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart2, {
                    className: "h-4 w-4 mr-1",
                  }),
                  "Analytics",
                ],
              }),
            ],
          }),
          description &&
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-sm mb-3",
              children: description,
            }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "grid grid-cols-1 md:grid-cols-3 gap-3 mb-3",
            children:
              metrics &&
              (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "bg-muted p-2 rounded text-center",
                    children: [
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-xs text-muted-foreground",
                        children: "Impressions",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "font-medium",
                        children:
                          ((_b = metrics.impressions) === null || _b === void 0
                            ? void 0
                            : _b.toLocaleString()) || "0",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "bg-muted p-2 rounded text-center",
                    children: [
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-xs text-muted-foreground",
                        children: "Clicks",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "font-medium",
                        children:
                          ((_c = metrics.clicks) === null || _c === void 0
                            ? void 0
                            : _c.toLocaleString()) || "0",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "bg-muted p-2 rounded text-center",
                    children: [
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-xs text-muted-foreground",
                        children: "Conversions",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "font-medium",
                        children:
                          ((_d = metrics.conversions) === null || _d === void 0
                            ? void 0
                            : _d.toLocaleString()) || "0",
                      }),
                    ],
                  }),
                ],
              }),
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className:
              "flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground",
            children: [
              budget &&
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "font-medium",
                      children: "Budget:",
                    }),
                    " $",
                    budget.toLocaleString(),
                  ],
                }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                    className: "h-3 w-3 mr-1",
                  }),
                  dateRange,
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                children: ["Created ", timeAgo(createdAt)],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "px-4 py-3 border-t bg-muted/30 flex justify-between",
        children: [
          onStatusChange &&
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex space-x-2",
              children: [
                isDraft &&
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onStatusChange(id, "active");
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.PlayCircle, {
                        className: "h-4 w-4 mr-1",
                      }),
                      "Activate",
                    ],
                  }),
                isActive &&
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onStatusChange(id, "paused");
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.PauseCircle, {
                        className: "h-4 w-4 mr-1",
                      }),
                      "Pause",
                    ],
                  }),
                isPaused &&
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onStatusChange(id, "active");
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.PlayCircle, {
                        className: "h-4 w-4 mr-1",
                      }),
                      "Resume",
                    ],
                  }),
                !isCompleted &&
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: function () {
                      return onStatusChange(id, "completed");
                    },
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                        className: "h-4 w-4 mr-1",
                      }),
                      "Complete",
                    ],
                  }),
              ],
            }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex space-x-2",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "ghost",
                size: "sm",
                onClick: function () {
                  return onEdit(id);
                },
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, {
                    className: "h-4 w-4 mr-1",
                  }),
                  "Edit",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "ghost",
                size: "sm",
                onClick: function () {
                  return onDelete(id);
                },
                className: "text-destructive",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, {
                    className: "h-4 w-4 mr-1",
                  }),
                  "Delete",
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
