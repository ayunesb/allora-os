"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadStatusBadge = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var badge_1 = require("@/components/ui/badge");
var LeadStatusBadge = function (_a) {
  var status = _a.status;
  var getStatusColor = function (status) {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-500";
      case "contacted":
        return "bg-yellow-500/10 text-yellow-500";
      case "qualified":
        return "bg-green-500/10 text-green-500";
      case "client":
        return "bg-purple-500/10 text-purple-500";
      case "closed":
        return "bg-gray-500/10 text-gray-500";
      default:
        return "bg-blue-500/10 text-blue-500";
    }
  };
  return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
    variant: "outline",
    className: "".concat(getStatusColor(status)),
    children: status.charAt(0).toUpperCase() + status.slice(1),
  });
};
exports.LeadStatusBadge = LeadStatusBadge;
