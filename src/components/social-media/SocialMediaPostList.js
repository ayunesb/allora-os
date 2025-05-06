"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SocialMediaPostList;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var date_fns_1 = require("date-fns");
var utils_1 = require("@/lib/utils");
var useAccessibility_1 = require("@/hooks/useAccessibility");
function SocialMediaPostList(_a) {
  var posts = _a.posts,
    onEditPost = _a.onEditPost,
    onDeletePost = _a.onDeletePost,
    onSchedulePost = _a.onSchedulePost,
    onApprovePost = _a.onApprovePost,
    ariaLabel = _a["aria-label"];
  var screenReaderFriendly = (0, useAccessibility_1.useAccessibility)()
    .screenReaderFriendly;
  var getPlatformColor = function (platform) {
    switch (platform) {
      case "Facebook":
        return "bg-blue-100 text-blue-800";
      case "Instagram":
        return "bg-purple-100 text-purple-800";
      case "LinkedIn":
        return "bg-blue-900 text-white";
      case "Twitter":
        return "bg-blue-400 text-white";
      case "TikTok":
        return "bg-black text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  var getStatusColor = function (status) {
    switch (status) {
      case "draft":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "scheduled":
        return "bg-green-100 text-green-800 border-green-200";
      case "published":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-4",
    role: screenReaderFriendly ? "list" : undefined,
    "aria-label": ariaLabel,
    children: posts.map(function (post) {
      return (0, jsx_runtime_1.jsx)(
        card_1.Card,
        {
          className: "overflow-hidden hover:shadow-md transition-shadow",
          role: screenReaderFriendly ? "listitem" : undefined,
          children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "p-4",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className:
                "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex-1",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-2 mb-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                          className: (0, utils_1.cn)(
                            "font-normal",
                            getPlatformColor(post.platform),
                          ),
                          children: post.platform,
                        }),
                        (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                          variant: "outline",
                          className: getStatusColor(post.status),
                          children: post.status,
                        }),
                        post.is_approved &&
                          (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                            variant: "outline",
                            className:
                              "bg-green-50 text-green-700 border-green-200",
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.CheckCircle,
                                { className: "h-3 w-3 mr-1" },
                              ),
                              "Approved",
                            ],
                          }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-lg font-medium mb-1",
                      onClick: function () {
                        return onEditPost(post);
                      },
                      children: post.title,
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className:
                        "text-sm text-muted-foreground line-clamp-2 mb-2",
                      children: post.content,
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "flex items-center text-xs text-muted-foreground gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                          className: "h-3 w-3",
                        }),
                        (0, jsx_runtime_1.jsxs)("time", {
                          dateTime: post.scheduled_date,
                          children: [
                            (0, date_fns_1.format)(
                              (0, date_fns_1.parseISO)(post.scheduled_date),
                              "MMM d, yyyy",
                            ),
                            post.publish_time
                              ? " at ".concat(post.publish_time)
                              : "",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className:
                    "flex items-center gap-2 self-end sm:self-auto mt-2 sm:mt-0",
                  children: [
                    post.status === "draft" &&
                      !post.is_approved &&
                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                        size: "sm",
                        variant: "outline",
                        onClick: function () {
                          return onApprovePost(post.id);
                        },
                        "aria-label": screenReaderFriendly
                          ? "Approve post: ".concat(post.title)
                          : undefined,
                        children: "Approve",
                      }),
                    post.status === "draft" &&
                      post.is_approved &&
                      (0, jsx_runtime_1.jsx)(button_1.Button, {
                        size: "sm",
                        onClick: function () {
                          return onSchedulePost(post.id);
                        },
                        "aria-label": screenReaderFriendly
                          ? "Schedule post: ".concat(post.title)
                          : undefined,
                        children: "Schedule",
                      }),
                    (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, {
                      children: [
                        (0, jsx_runtime_1.jsx)(
                          dropdown_menu_1.DropdownMenuTrigger,
                          {
                            asChild: true,
                            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                              size: "icon",
                              variant: "ghost",
                              "aria-label": screenReaderFriendly
                                ? "More options for post: ".concat(post.title)
                                : "More options",
                              children: (0, jsx_runtime_1.jsx)(
                                lucide_react_1.MoreHorizontal,
                                { className: "h-4 w-4" },
                              ),
                            }),
                          },
                        ),
                        (0, jsx_runtime_1.jsxs)(
                          dropdown_menu_1.DropdownMenuContent,
                          {
                            align: "end",
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                dropdown_menu_1.DropdownMenuLabel,
                                { children: "Actions" },
                              ),
                              (0, jsx_runtime_1.jsx)(
                                dropdown_menu_1.DropdownMenuSeparator,
                                {},
                              ),
                              (0, jsx_runtime_1.jsx)(
                                dropdown_menu_1.DropdownMenuItem,
                                {
                                  onClick: function () {
                                    return onEditPost(post);
                                  },
                                  children: "Edit",
                                },
                              ),
                              (0, jsx_runtime_1.jsx)(
                                dropdown_menu_1.DropdownMenuItem,
                                {
                                  onClick: function () {
                                    return onDeletePost(post.id);
                                  },
                                  className:
                                    "text-destructive focus:text-destructive",
                                  children: "Delete",
                                },
                              ),
                            ],
                          },
                        ),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        },
        post.id,
      );
    }),
  });
}
