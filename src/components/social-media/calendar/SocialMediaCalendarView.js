"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaCalendarView = SocialMediaCalendarView;
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_1 = require("date-fns");
var tooltip_1 = require("@/components/ui/tooltip");
var utils_1 = require("@/lib/utils");
var use_mobile_1 = require("@/hooks/use-mobile");
/**
 * Calendar view for social media posts
 * Displays posts organized by day in a monthly calendar format
 */
function SocialMediaCalendarView(_a) {
  var posts = _a.posts,
    currentMonth = _a.currentMonth,
    onEditPost = _a.onEditPost,
    onDeletePost = _a.onDeletePost,
    onSchedulePost = _a.onSchedulePost,
    onApprovePost = _a.onApprovePost;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobile = ["xs", "mobile"].includes(breakpoint);
  // Get all days in the current month
  var monthStart = (0, date_fns_1.startOfMonth)(currentMonth);
  var monthEnd = (0, date_fns_1.endOfMonth)(currentMonth);
  var days = (0, date_fns_1.eachDayOfInterval)({
    start: monthStart,
    end: monthEnd,
  });
  // Get the day of week for the first day (0 for Sunday, 1 for Monday, etc.)
  var startDay = monthStart.getDay();
  // Find posts for a specific day
  var getPostsForDay = function (day) {
    return posts.filter(function (post) {
      var postDate = post.scheduled_date
        ? (0, date_fns_1.parseISO)(post.scheduled_date)
        : null;
      return postDate && (0, date_fns_1.isSameDay)(postDate, day);
    });
  };
  // Get platform color
  var getPlatformColor = function (platform) {
    switch (platform) {
      case "Facebook":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-200";
      case "Instagram":
        return "bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-200";
      case "LinkedIn":
        return "bg-blue-900 text-white dark:bg-blue-700/50 dark:text-white";
      case "Twitter":
        return "bg-blue-400 text-white dark:bg-blue-500/50 dark:text-white";
      case "TikTok":
        return "bg-black text-white dark:bg-black/70 dark:text-white";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700/30 dark:text-gray-200";
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "bg-card rounded-lg border shadow",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "grid grid-cols-7 gap-px bg-muted text-center",
        children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
          function (day) {
            return (0, jsx_runtime_1.jsx)(
              "div",
              {
                className: "py-2 text-sm font-medium",
                children: isMobile ? day.charAt(0) : day,
              },
              day,
            );
          },
        ),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-7 gap-px bg-muted",
        children: [
          Array.from({ length: startDay }).map(function (_, index) {
            return (0, jsx_runtime_1.jsx)(
              "div",
              { className: "bg-card h-24 md:h-32" },
              "empty-start-".concat(index),
            );
          }),
          days.map(function (day) {
            var dayPosts = getPostsForDay(day);
            var isCurrentDay = (0, date_fns_1.isToday)(day);
            return (0, jsx_runtime_1.jsxs)(
              "div",
              {
                className: (0, utils_1.cn)(
                  "bg-card h-24 md:h-32 p-1 overflow-hidden relative",
                  isCurrentDay && "ring-2 ring-primary ring-inset",
                ),
                children: [
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-xs font-medium mb-1",
                    children: (0, date_fns_1.format)(day, "d"),
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-1",
                    children: [
                      dayPosts.slice(0, 3).map(function (post) {
                        return (0, jsx_runtime_1.jsx)(
                          tooltip_1.TooltipProvider,
                          {
                            children: (0, jsx_runtime_1.jsxs)(
                              tooltip_1.Tooltip,
                              {
                                children: [
                                  (0, jsx_runtime_1.jsx)(
                                    tooltip_1.TooltipTrigger,
                                    {
                                      asChild: true,
                                      children: (0, jsx_runtime_1.jsx)("div", {
                                        className: (0, utils_1.cn)(
                                          "text-xs px-1.5 py-0.5 rounded truncate cursor-pointer",
                                          getPlatformColor(post.platform),
                                        ),
                                        onClick: function () {
                                          return onEditPost(post);
                                        },
                                        children:
                                          post.title ||
                                          post.content.substring(0, 20),
                                      }),
                                    },
                                  ),
                                  (0, jsx_runtime_1.jsxs)(
                                    tooltip_1.TooltipContent,
                                    {
                                      children: [
                                        (0, jsx_runtime_1.jsx)("p", {
                                          className: "font-medium",
                                          children: post.title || "Untitled",
                                        }),
                                        (0, jsx_runtime_1.jsxs)("p", {
                                          className: "text-xs",
                                          children: [
                                            post.platform,
                                            " - ",
                                            post.status,
                                          ],
                                        }),
                                      ],
                                    },
                                  ),
                                ],
                              },
                            ),
                          },
                          post.id,
                        );
                      }),
                      dayPosts.length > 3 &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "text-xs text-muted-foreground text-center",
                          children: ["+", dayPosts.length - 3, " more"],
                        }),
                    ],
                  }),
                ],
              },
              day.toISOString(),
            );
          }),
        ],
      }),
    ],
  });
}
exports.default = SocialMediaCalendarView;
