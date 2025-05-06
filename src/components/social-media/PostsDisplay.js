"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsDisplay = PostsDisplay;
var jsx_runtime_1 = require("react/jsx-runtime");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
var CalendarView_1 = require("./calendar/CalendarView");
var ListView_1 = require("./list/ListView");
var loading_1 = require("@/components/ui/loading");
function PostsDisplay(_a) {
  var view = _a.view,
    posts = _a.posts,
    currentMonth = _a.currentMonth,
    isLoading = _a.isLoading,
    error = _a.error,
    onEditPost = _a.onEditPost,
    onDeletePost = _a.onDeletePost,
    onSchedulePost = _a.onSchedulePost,
    onApprovePost = _a.onApprovePost,
    onCreatePost = _a.onCreatePost,
    onRefresh = _a.onRefresh;
  // Handle loading state
  if (isLoading) {
    return (0, jsx_runtime_1.jsx)("div", {
      className: "py-12",
      children: (0, jsx_runtime_1.jsx)(loading_1.Loading, {
        center: true,
        text: "Loading posts...",
        tooltip:
          "We're retrieving your social media posts. This should only take a moment.",
      }),
    });
  }
  // Handle error state
  if (error) {
    return (0, jsx_runtime_1.jsx)(alert_1.Alert, {
      variant: "destructive",
      className: "mb-4",
      children: (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, {
        children: [
          "Error loading posts: ",
          error.message,
          ". Please try again later.",
        ],
      }),
    });
  }
  // Handle empty state
  if (posts.length === 0) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className: "py-12 text-center",
      children: [
        (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
          className: "h-12 w-12 mx-auto mb-4 text-muted-foreground",
        }),
        (0, jsx_runtime_1.jsx)("h3", {
          className: "text-lg font-medium mb-2",
          children: "No posts found",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground mb-4",
          children:
            view === "calendar"
              ? "No posts scheduled for this month."
              : "You haven't created any posts yet.",
        }),
        (0, jsx_runtime_1.jsx)("button", {
          onClick: onCreatePost,
          className: "text-primary hover:underline",
          children: "Create your first post",
        }),
      ],
    });
  }
  // Render the appropriate view
  return view === "calendar"
    ? (0, jsx_runtime_1.jsx)(CalendarView_1.CalendarView, {
        posts: posts,
        currentMonth: currentMonth,
        onCreatePost: onCreatePost,
        onEditPost: onEditPost,
        onDeletePost: onDeletePost,
        onSchedulePost: onSchedulePost,
        onApprovePost: onApprovePost,
        onRefresh: onRefresh,
      })
    : (0, jsx_runtime_1.jsx)(ListView_1.ListView, {
        posts: posts,
        onEditPost: onEditPost,
        onDeletePost: onDeletePost,
        onSchedulePost: onSchedulePost,
        onApprovePost: onApprovePost,
      });
}
