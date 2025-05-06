"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCard = PostCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
function PostCard(_a) {
  var post = _a.post,
    onEdit = _a.onEdit,
    onDelete = _a.onDelete,
    onSchedule = _a.onSchedule,
    onApprove = _a.onApprove;
  // Function to get platform badge color
  var getPlatformColor = function (platform) {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return "bg-blue-100 text-blue-800";
      case "facebook":
        return "bg-indigo-100 text-indigo-800";
      case "instagram":
        return "bg-pink-100 text-pink-800";
      case "twitter":
        return "bg-sky-100 text-sky-800";
      case "tiktok":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  // Function to get status badge color
  var getStatusColor = function (status) {
    switch (status.toLowerCase()) {
      case "published":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-amber-100 text-amber-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  // Fix date formatting
  var formatDate = function (date) {
    if (!date) return "Not scheduled";
    try {
      return (0, date_fns_1.format)(new Date(date), "MMM d, yyyy h:mm a");
    } catch (e) {
      return "Invalid date";
    }
  };
  // Determine which action buttons to show based on post status
  var renderActionButtons = function () {
    switch (post.status.toLowerCase()) {
      case "draft":
        return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
          children: [
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              size: "sm",
              onClick: onSchedule,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                  className: "mr-1 h-4 w-4",
                }),
                "Schedule",
              ],
            }),
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              size: "sm",
              onClick: onApprove,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                  className: "mr-1 h-4 w-4",
                }),
                "Publish",
              ],
            }),
          ],
        });
      case "scheduled":
        return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
          children: [
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              size: "sm",
              onClick: onEdit,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, {
                  className: "mr-1 h-4 w-4",
                }),
                "Edit",
              ],
            }),
            (0, jsx_runtime_1.jsxs)(button_1.Button, {
              variant: "outline",
              size: "sm",
              onClick: onApprove,
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                  className: "mr-1 h-4 w-4",
                }),
                "Publish Now",
              ],
            }),
          ],
        });
      default:
        return (0, jsx_runtime_1.jsxs)(button_1.Button, {
          variant: "outline",
          size: "sm",
          onClick: onEdit,
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, {
              className: "mr-1 h-4 w-4",
            }),
            "View",
          ],
        });
    }
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "h-full flex flex-col",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className:
          "px-4 py-3 flex-row justify-between items-center space-y-0 gap-x-2",
        children: [
          (0, jsx_runtime_1.jsx)(badge_1.Badge, {
            variant: "outline",
            className: getPlatformColor(post.platform),
            children: post.platform,
          }),
          (0, jsx_runtime_1.jsx)(badge_1.Badge, {
            variant: "outline",
            className: getStatusColor(post.status),
            children: post.status,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "px-4 py-3 flex-grow",
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "font-medium mb-2",
            children: post.title || post.content.substring(0, 50),
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground line-clamp-3 mb-2",
            children: post.content,
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "text-xs text-muted-foreground mt-2",
            children: [
              post.scheduled_date
                ? (0, jsx_runtime_1.jsxs)("p", {
                    children: [
                      "Scheduled: ",
                      formatDate(
                        ""
                          .concat(post.scheduled_date, "T")
                          .concat(post.publish_time, ":00"),
                      ),
                    ],
                  })
                : (0, jsx_runtime_1.jsx)("p", { children: "Not scheduled" }),
              post.published_at &&
                (0, jsx_runtime_1.jsxs)("p", {
                  className: "mt-1",
                  children: ["Published: ", formatDate(post.published_at)],
                }),
            ],
          }),
          post.tags &&
            post.tags.length > 0 &&
            (0, jsx_runtime_1.jsx)("div", {
              className: "flex flex-wrap gap-1 mt-2",
              children: post.tags.map(function (tag, index) {
                return (0, jsx_runtime_1.jsx)(
                  badge_1.Badge,
                  { variant: "secondary", className: "text-xs", children: tag },
                  index,
                );
              }),
            }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "px-4 py-3 flex justify-between border-t",
        children: [
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            onClick: onDelete,
            children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash, {
              className: "h-4 w-4",
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex gap-2",
            children: renderActionButtons(),
          }),
        ],
      }),
    ],
  });
}
