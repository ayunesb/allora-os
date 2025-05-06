"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var framer_motion_1 = require("framer-motion");
var avatar_1 = require("@/components/ui/avatar");
var ThoughtBubble = function (_a) {
  var reaction = _a.reaction,
    executives = _a.executives;
  var executive = executives.find(function (e) {
    return e.id === reaction.executiveId;
  });
  if (!executive) return null;
  // Position the thought bubble near the right edge
  var positionStyle = {
    right: "20px",
    top: "10px",
  };
  return (0, jsx_runtime_1.jsxs)(framer_motion_1.motion.div, {
    className: "absolute z-10 flex items-start gap-2",
    style: positionStyle,
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "relative",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "absolute -left-2 top-3 w-2 h-2 rotate-45 bg-gray-700",
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className:
              "bg-gray-700 rounded-lg py-1 px-2 text-xs text-white max-w-[150px]",
            children: reaction.thought,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
        className: "h-6 w-6 border border-gray-800",
        children: [
          (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
            src: executive.avatar,
            alt: executive.name,
          }),
          (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
            className: "bg-purple-900 text-white text-xs",
            children: executive.name
              .split(" ")
              .map(function (n) {
                return n[0];
              })
              .join(""),
          }),
        ],
      }),
    ],
  });
};
exports.default = ThoughtBubble;
