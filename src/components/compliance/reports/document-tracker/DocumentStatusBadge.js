"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentStatusBadge;
var jsx_runtime_1 = require("react/jsx-runtime");
var badge_1 = require("@/components/ui/badge");
function DocumentStatusBadge(_a) {
  var status = _a.status;
  switch (status) {
    case "current":
      return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
        className: "bg-green-500",
        children: "Current",
      });
    case "outdated":
      return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
        variant: "destructive",
        children: "Outdated",
      });
    case "update-available":
      return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
        variant: "outline",
        className: "border-amber-500 text-amber-500",
        children: "Update Available",
      });
    default:
      return null;
  }
}
