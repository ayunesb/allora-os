"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var avatar_1 = require("@/components/ui/avatar");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var ProfileAvatar = function (_a) {
  var avatarUrl = _a.avatarUrl,
    setAvatarUrl = _a.setAvatarUrl,
    avatarFile = _a.avatarFile,
    setAvatarFile = _a.setAvatarFile,
    profileName = _a.profileName,
    userEmail = _a.userEmail;
  var handleAvatarChange = function (e) {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    var file = e.target.files[0];
    setAvatarFile(file);
    // Create a preview
    var reader = new FileReader();
    reader.onloadend = function () {
      setAvatarUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex flex-col sm:flex-row items-center gap-4",
    children: [
      (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
        className: "h-24 w-24",
        children: [
          (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
            src: avatarUrl || "",
          }),
          (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
            className: "text-2xl",
            children:
              (profileName === null || profileName === void 0
                ? void 0
                : profileName.charAt(0)) ||
              (userEmail === null || userEmail === void 0
                ? void 0
                : userEmail.charAt(0)) ||
              "U",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex-1 space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg font-medium",
            children: "Profile Picture",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground",
            children: "Upload a profile picture to personalize your account",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsxs)(label_1.Label, {
                htmlFor: "avatar",
                className:
                  "flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-muted transition-colors",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Upload, {
                    className: "h-4 w-4",
                  }),
                  (0, jsx_runtime_1.jsx)("span", { children: "Upload" }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(input_1.Input, {
                id: "avatar",
                type: "file",
                accept: "image/*",
                onChange: handleAvatarChange,
                className: "hidden",
              }),
              avatarUrl &&
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  type: "button",
                  variant: "outline",
                  onClick: function () {
                    setAvatarUrl(null);
                    setAvatarFile(null);
                  },
                  children: "Remove",
                }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = ProfileAvatar;
