"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var SocialMediaPostForm = function (_a) {
  var post = _a.post,
    onSubmit = _a.onSubmit,
    isSubmitting = _a.isSubmitting,
    onClose = _a.onClose;
  var handleSubmit = function (e) {
    e.preventDefault();
    // Implementation here
    onSubmit({
      title: "Test post",
      content: "Test content",
      platform: "LinkedIn",
      scheduled_date: "2025-05-01",
      publish_time: "09:00",
    });
  };
  return (0, jsx_runtime_1.jsxs)("form", {
    onSubmit: handleSubmit,
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsx)("h3", {
        className: "text-lg font-medium",
        children: post ? "Edit Post" : "Create New Post",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("label", {
                htmlFor: "title",
                className: "block text-sm font-medium",
                children: "Title",
              }),
              (0, jsx_runtime_1.jsx)("input", {
                id: "title",
                className:
                  "mt-1 block w-full rounded-md border border-gray-300 p-2",
                defaultValue:
                  (post === null || post === void 0 ? void 0 : post.title) ||
                  "",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-end gap-2",
            children: [
              onClose &&
                (0, jsx_runtime_1.jsx)("button", {
                  type: "button",
                  onClick: onClose,
                  className: "px-4 py-2 border rounded-md",
                  children: "Cancel",
                }),
              (0, jsx_runtime_1.jsx)("button", {
                type: "submit",
                disabled: isSubmitting,
                className:
                  "px-4 py-2 bg-primary text-primary-foreground rounded-md",
                children: isSubmitting
                  ? "Saving..."
                  : post
                    ? "Update"
                    : "Create",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = SocialMediaPostForm;
