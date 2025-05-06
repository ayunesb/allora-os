"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertBadge = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var badge_1 = require("@/components/ui/badge");
var AlertBadge = function (_a) {
  var severity = _a.severity;
  var getSeverityColor = function (severity) {
    switch (severity) {
      case "critical":
        return "bg-red-500 text-white";
      case "error":
        return "bg-red-400 text-white";
      case "warning":
        return "bg-amber-500 text-white";
      case "info":
      default:
        return "bg-blue-500 text-white";
    }
  };
  return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
    className: getSeverityColor(severity),
    children: severity,
  });
};
exports.AlertBadge = AlertBadge;
