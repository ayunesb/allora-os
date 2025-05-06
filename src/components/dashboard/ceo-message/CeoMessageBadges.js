"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CeoMessageBadges = CeoMessageBadges;
var jsx_runtime_1 = require("react/jsx-runtime");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
function CeoMessageBadges() {
  // Production-ready time display
  var currentDate = new Date();
  var formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  }).format(currentDate);
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex items-center space-x-2",
    children: [
      (0, jsx_runtime_1.jsx)(badge_1.Badge, {
        variant: "outline",
        className: "bg-primary/10 text-primary border-primary/20",
        children: "Priority",
      }),
      (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
        variant: "outline",
        className: "bg-secondary/10 text-secondary border-secondary/20",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
            className: "mr-1 h-3 w-3",
          }),
          " ",
          formattedDate,
        ],
      }),
    ],
  });
}
