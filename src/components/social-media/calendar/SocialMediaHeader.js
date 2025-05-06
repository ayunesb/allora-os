"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialMediaHeader = SocialMediaHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function SocialMediaHeader(_a) {
  var onCreatePost = _a.onCreatePost;
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-2xl font-bold",
            children: "Social Media Calendar",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground mt-1",
            children: "Plan, schedule, and manage your social media content",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(button_1.Button, {
        onClick: onCreatePost,
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
            className: "mr-2 h-4 w-4",
          }),
          "Create Post",
        ],
      }),
    ],
  });
}
