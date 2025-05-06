"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarView = CalendarView;
var jsx_runtime_1 = require("react/jsx-runtime");
var date_fns_1 = require("date-fns");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
function CalendarView(_a) {
  var posts = _a.posts,
    currentMonth = _a.currentMonth,
    onCreatePost = _a.onCreatePost,
    onEditPost = _a.onEditPost,
    onDeletePost = _a.onDeletePost,
    onSchedulePost = _a.onSchedulePost,
    onApprovePost = _a.onApprovePost;
  // Get all days in the current month
  var monthStart = (0, date_fns_1.startOfMonth)(currentMonth);
  var monthEnd = (0, date_fns_1.endOfMonth)(currentMonth);
  var days = (0, date_fns_1.eachDayOfInterval)({
    start: monthStart,
    end: monthEnd,
  });
  // Get the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
  var startDay = (0, date_fns_1.getDay)(monthStart);
  // Create placeholder days to offset the calendar grid
  var placeholders = Array.from({ length: startDay }, function (_, i) {
    return (0, date_fns_1.addDays)(monthStart, -(startDay - i));
  });
  // Fix the getPostsForDay function:
  var getPostsForDay = function (day) {
    return posts.filter(function (post) {
      var postDate = post.scheduled_date
        ? new Date(
            ""
              .concat(post.scheduled_date, "T")
              .concat(post.publish_time || "00:00", ":00"),
          )
        : null;
      return postDate && (0, date_fns_1.isSameDay)(postDate, day);
    });
  };
  // Get platform badge color
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
  // Get status badge color
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
  // Calendar day cell component
  var DayCell = function (_a) {
    var day = _a.day,
      _b = _a.isPlaceholder,
      isPlaceholder = _b === void 0 ? false : _b;
    var dayPosts = isPlaceholder ? [] : getPostsForDay(day);
    var isWeekendDay = (0, date_fns_1.isWeekend)(day);
    return (0, jsx_runtime_1.jsxs)("div", {
      className: (0, utils_1.cn)(
        "border rounded-md p-2 min-h-[120px] flex flex-col",
        (0, date_fns_1.isToday)(day) ? "border-primary" : "",
        isPlaceholder ? "bg-muted/50 opacity-50" : "",
        isWeekendDay ? "bg-gray-50" : "",
      ),
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center mb-1",
          children: [
            (0, jsx_runtime_1.jsx)("span", {
              className: (0, utils_1.cn)(
                "text-sm font-medium",
                (0, date_fns_1.isToday)(day) ? "text-primary" : "",
                isPlaceholder ? "text-muted-foreground/50" : "",
              ),
              children: (0, date_fns_1.format)(day, "d"),
            }),
            !isPlaceholder &&
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "ghost",
                size: "icon",
                className: "h-6 w-6",
                onClick: onCreatePost,
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
                    className: "h-3 w-3",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "sr-only",
                    children: "Add post",
                  }),
                ],
              }),
          ],
        }),
        dayPosts.length > 0
          ? (0, jsx_runtime_1.jsx)("div", {
              className: "space-y-1 mt-1",
              children: dayPosts.map(function (post) {
                return (0, jsx_runtime_1.jsxs)(
                  "div",
                  {
                    onClick: function () {
                      return onEditPost && onEditPost(post);
                    },
                    className:
                      "text-xs p-1 rounded cursor-pointer hover:bg-muted flex flex-col",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex justify-between items-center",
                        children: [
                          (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                            variant: "outline",
                            className: (0, utils_1.cn)(
                              "text-[10px] px-1 py-0",
                              getPlatformColor(post.platform),
                            ),
                            children: post.platform,
                          }),
                          (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                            variant: "outline",
                            className: (0, utils_1.cn)(
                              "text-[10px] px-1 py-0",
                              getStatusColor(post.status),
                            ),
                            children: post.status,
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "mt-1 line-clamp-1",
                        children: post.title || post.content,
                      }),
                    ],
                  },
                  post.id,
                );
              }),
            })
          : !isPlaceholder &&
            (0, jsx_runtime_1.jsx)("div", {
              className: "flex-1 flex items-center justify-center",
              children: (0, jsx_runtime_1.jsx)("span", {
                className: "text-xs text-muted-foreground",
                children: "No posts",
              }),
            }),
      ],
    });
  };
  // Weekday header
  var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
      className: "p-4",
      children: [
        (0, jsx_runtime_1.jsx)("div", {
          className: "mb-4 flex items-center justify-between",
          children: (0, jsx_runtime_1.jsxs)("h3", {
            className: "text-lg font-medium flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                className: "mr-2 h-5 w-5",
              }),
              (0, date_fns_1.format)(currentMonth, "MMMM yyyy"),
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "grid grid-cols-7 gap-2 mb-2",
          children: weekdays.map(function (day) {
            return (0, jsx_runtime_1.jsx)(
              "div",
              {
                className:
                  "text-center text-sm font-medium text-muted-foreground",
                children: day,
              },
              day,
            );
          }),
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "grid grid-cols-7 gap-2",
          children: [
            placeholders.map(function (day, index) {
              return (0, jsx_runtime_1.jsx)(
                DayCell,
                { day: day, isPlaceholder: true },
                "placeholder-".concat(index),
              );
            }),
            days.map(function (day) {
              return (0, jsx_runtime_1.jsx)(
                DayCell,
                { day: day },
                day.toISOString(),
              );
            }),
          ],
        }),
      ],
    }),
  });
}
