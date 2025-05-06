"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusBadge = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var StatusBadge = function (_a) {
  var status = _a.status;
  switch (status) {
    case "success":
      return (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
        variant: "outline",
        className:
          "bg-green-500/10 text-green-500 border-green-500/20 flex items-center gap-1",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
            className: "h-3 w-3",
          }),
          "Success",
        ],
      });
    case "failed":
      return (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
        variant: "outline",
        className:
          "bg-destructive/10 text-destructive border-destructive/20 flex items-center gap-1",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
            className: "h-3 w-3",
          }),
          "Failed",
        ],
      });
    case "pending":
      return (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
        variant: "outline",
        className:
          "bg-yellow-500/10 text-yellow-500 border-yellow-500/20 flex items-center gap-1",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
            className: "h-3 w-3",
          }),
          "Pending",
        ],
      });
    default:
      return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
        variant: "outline",
        children: status,
      });
  }
};
exports.StatusBadge = StatusBadge;
exports.default = exports.StatusBadge;
