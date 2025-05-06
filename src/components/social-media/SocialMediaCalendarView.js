"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaCalendarView = SocialMediaCalendarView;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var date_fns_1 = require("date-fns");
var button_1 = require("@/components/ui/button");
var calendar_1 = require("@/components/ui/calendar");
var lucide_react_1 = require("lucide-react");
var ViewToggle_1 = require("./calendar/ViewToggle");
function SocialMediaCalendarView(_a) {
  var posts = _a.posts,
    onCreatePost = _a.onCreatePost,
    onEditPost = _a.onEditPost,
    onDeletePost = _a.onDeletePost;
  var _b = (0, react_1.useState)(new Date()),
    selectedDate = _b[0],
    setSelectedDate = _b[1];
  var _c = (0, react_1.useState)("calendar"),
    view = _c[0],
    setView = _c[1];
  // Count posts for the month if in calendar view
  var postCount = posts.length;
  // Function to handle date selection
  var handleDateSelect = function (date) {
    setSelectedDate(date);
  };
  // Function to filter posts for the selected date
  var getPostsForSelectedDate = function () {
    if (!selectedDate) return [];
    return posts.filter(function (post) {
      // Safely handle potentially undefined scheduled_date
      if (!post.scheduled_date) return false;
      var postDate = new Date(post.scheduled_date);
      return (
        postDate.getDate() === selectedDate.getDate() &&
        postDate.getMonth() === selectedDate.getMonth() &&
        postDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  };
  // Get posts for the selected date
  var selectedDatePosts = getPostsForSelectedDate();
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col md:flex-row md:items-center gap-4 justify-between",
        children: [
          (0, jsx_runtime_1.jsx)(ViewToggle_1.ViewToggle, {
            view: view,
            onViewChange: setView,
            postCount: postCount,
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className: "gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                    className: "h-4 w-4",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    children: selectedDate
                      ? (0, date_fns_1.format)(selectedDate, "PPP")
                      : "Select date",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: onCreatePost,
                children: "Create Post",
              }),
            ],
          }),
        ],
      }),
      view === "calendar" &&
        (0, jsx_runtime_1.jsx)(card_1.Card, {
          children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "p-4",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex flex-col md:flex-row gap-6",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className: "md:w-1/2",
                  children: (0, jsx_runtime_1.jsx)(calendar_1.Calendar, {
                    mode: "single",
                    selected: selectedDate,
                    onSelect: handleDateSelect,
                    className: "rounded-md border",
                  }),
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "md:w-1/2",
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "font-medium text-lg mb-4",
                      children: selectedDate
                        ? (0, date_fns_1.format)(selectedDate, "MMMM d, yyyy")
                        : "Selected Date",
                    }),
                    selectedDatePosts.length > 0
                      ? (0, jsx_runtime_1.jsx)("div", {
                          className: "space-y-3",
                          children: selectedDatePosts.map(function (post) {
                            return (0, jsx_runtime_1.jsx)(
                              card_1.Card,
                              {
                                className: "p-3",
                                children: (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex justify-between items-start",
                                  children: [
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      children: [
                                        (0, jsx_runtime_1.jsx)("h4", {
                                          className: "font-medium",
                                          children:
                                            post.title || "Untitled Post",
                                        }),
                                        (0, jsx_runtime_1.jsxs)("p", {
                                          className:
                                            "text-sm text-muted-foreground",
                                          children: [
                                            post.platform || "All Platforms",
                                            " \u2022 ",
                                            post.status || "Draft",
                                          ],
                                        }),
                                      ],
                                    }),
                                    (0, jsx_runtime_1.jsxs)("div", {
                                      className: "flex gap-2",
                                      children: [
                                        (0, jsx_runtime_1.jsx)(
                                          button_1.Button,
                                          {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: function () {
                                              return onEditPost(post.id);
                                            },
                                            children: "Edit",
                                          },
                                        ),
                                        (0, jsx_runtime_1.jsx)(
                                          button_1.Button,
                                          {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: function () {
                                              return onDeletePost(post.id);
                                            },
                                            children: "Delete",
                                          },
                                        ),
                                      ],
                                    }),
                                  ],
                                }),
                              },
                              post.id,
                            );
                          }),
                        })
                      : (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: "No posts scheduled for this date.",
                        }),
                  ],
                }),
              ],
            }),
          }),
        }),
      view === "list" &&
        // List view implementation will go here
        (0, jsx_runtime_1.jsx)(card_1.Card, {
          children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "p-4",
            children: (0, jsx_runtime_1.jsx)("div", {
              className: "space-y-4",
              children:
                posts.length > 0
                  ? posts.map(function (post) {
                      return (0, jsx_runtime_1.jsx)(
                        card_1.Card,
                        {
                          className: "p-4",
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex justify-between items-start",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                children: [
                                  (0, jsx_runtime_1.jsx)("h4", {
                                    className: "font-medium",
                                    children: post.title || "Untitled Post",
                                  }),
                                  (0, jsx_runtime_1.jsxs)("p", {
                                    className: "text-sm text-muted-foreground",
                                    children: [
                                      post.platform || "All Platforms",
                                      " \u2022 ",
                                      post.status || "Draft",
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsx)("p", {
                                    className: "text-sm mt-1",
                                    children: post.scheduled_date
                                      ? (0, date_fns_1.format)(
                                          new Date(post.scheduled_date),
                                          "PPP",
                                        )
                                      : "Not scheduled",
                                  }),
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: function () {
                                      return onEditPost(post.id);
                                    },
                                    children: "Edit",
                                  }),
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: function () {
                                      return onDeletePost(post.id);
                                    },
                                    children: "Delete",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        },
                        post.id,
                      );
                    })
                  : (0, jsx_runtime_1.jsx)("p", {
                      className: "text-muted-foreground text-center py-8",
                      children: "No posts available.",
                    }),
            }),
          }),
        }),
    ],
  });
}
