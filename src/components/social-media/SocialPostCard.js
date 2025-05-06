"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialPostCard = SocialPostCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var date_fns_1 = require("date-fns");
var lucide_react_1 = require("lucide-react");
function SocialPostCard(_a) {
  var post = _a.post,
    onEdit = _a.onEdit,
    onDelete = _a.onDelete,
    onSchedule = _a.onSchedule,
    onPublish = _a.onPublish;
  var id = post.id,
    title = post.title,
    content = post.content,
    _b = post.platform,
    platform = _b === void 0 ? "All Platforms" : _b,
    _c = post.status,
    status = _c === void 0 ? "Draft" : _c,
    scheduled_date = post.scheduled_date,
    published_date = post.published_date,
    created_at = post.created_at,
    _d = post.media_urls,
    media_urls = _d === void 0 ? [] : _d;
  var isDraft = status === "draft" || status === "Draft";
  var isScheduled = status === "scheduled" || status === "Scheduled";
  var isPublished = status === "published" || status === "Published";
  // Safely format dates with fallbacks
  var getFormattedDate = function (dateString) {
    if (!dateString) return "Not set";
    try {
      return (0, date_fns_1.format)(new Date(dateString), "MMM d, yyyy h:mm a");
    } catch (e) {
      return "Invalid date";
    }
  };
  var getTimeAgo = function (dateString) {
    try {
      return (0, date_fns_1.formatDistanceToNow)(new Date(dateString), {
        addSuffix: true,
      });
    } catch (e) {
      return "Unknown time";
    }
  };
  var scheduledDate = scheduled_date
    ? getFormattedDate(scheduled_date)
    : "Not scheduled";
  var publishedDate = published_date
    ? getFormattedDate(published_date)
    : "Not published";
  var createdAt = getTimeAgo(created_at);
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
                    children: title || "Untitled Post",
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className:
                      "flex items-center gap-2 text-sm text-muted-foreground",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", { children: platform }),
                      (0, jsx_runtime_1.jsx)("span", { children: "\u2022" }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "\n                "
                          .concat(
                            isPublished ? "text-green-600" : "",
                            "\n                ",
                          )
                          .concat(
                            isScheduled ? "text-blue-600" : "",
                            "\n                ",
                          )
                          .concat(
                            isDraft ? "text-amber-600" : "",
                            "\n              ",
                          ),
                        children: status,
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  isDraft &&
                    onSchedule &&
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "outline",
                      size: "sm",
                      onClick: function () {
                        return onSchedule(id);
                      },
                      className: "mr-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                          className: "h-4 w-4 mr-1",
                        }),
                        "Schedule",
                      ],
                    }),
                  (isDraft || isScheduled) &&
                    onPublish &&
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "outline",
                      size: "sm",
                      onClick: function () {
                        return onPublish(id);
                      },
                      className: "mr-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpRight, {
                          className: "h-4 w-4 mr-1",
                        }),
                        "Publish",
                      ],
                    }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm mb-3 line-clamp-3",
            children: content,
          }),
          media_urls.length > 0 &&
            (0, jsx_runtime_1.jsx)("div", {
              className: "mb-3 flex flex-wrap gap-2",
              children: media_urls.map(function (url, index) {
                return (0, jsx_runtime_1.jsx)(
                  "img",
                  {
                    src: url,
                    alt: "Media for ".concat(title || "post"),
                    className: "h-20 w-20 object-cover rounded",
                  },
                  index,
                );
              }),
            }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "grid grid-cols-2 gap-2 text-xs text-muted-foreground",
            children: [
              scheduled_date &&
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                      className: "h-3 w-3 mr-1",
                    }),
                    scheduledDate,
                  ],
                }),
              published_date &&
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpRight, {
                      className: "h-3 w-3 mr-1",
                    }),
                    publishedDate,
                  ],
                }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                    className: "h-3 w-3 mr-1",
                  }),
                  "Created ",
                  createdAt,
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "px-4 py-3 border-t bg-muted/30 flex justify-end",
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
            className: "text-destructive hover:text-destructive",
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
  });
}
