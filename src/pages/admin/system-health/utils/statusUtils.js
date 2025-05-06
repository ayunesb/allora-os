"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusDescription =
  exports.getStatusColorClass =
  exports.getStatusIcon =
    void 0;
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
/**
 * Returns the appropriate icon component for the given status
 */
var getStatusIcon = function (status) {
  switch (status) {
    case "healthy":
      return react_1.default.createElement(lucide_react_1.CheckCircle, {
        className: "h-4 w-4 text-green-500",
      });
    case "degraded":
      return react_1.default.createElement(lucide_react_1.AlertTriangle, {
        className: "h-4 w-4 text-amber-500",
      });
    case "down":
      return react_1.default.createElement(lucide_react_1.XCircle, {
        className: "h-4 w-4 text-red-500",
      });
    default:
      return null;
  }
};
exports.getStatusIcon = getStatusIcon;
/**
 * Returns the appropriate CSS color class for the given status
 */
var getStatusColorClass = function (status) {
  switch (status) {
    case "healthy":
      return "text-green-700 bg-green-50";
    case "degraded":
      return "text-amber-700 bg-amber-50";
    case "down":
      return "text-red-700 bg-red-50";
    default:
      return "";
  }
};
exports.getStatusColorClass = getStatusColorClass;
/**
 * Returns a descriptive text for the given status
 */
var getStatusDescription = function (status) {
  switch (status) {
    case "healthy":
      return "System is operating normally";
    case "degraded":
      return "System is experiencing some issues but is still functional";
    case "down":
      return "System is currently unavailable";
    default:
      return "Unknown status";
  }
};
exports.getStatusDescription = getStatusDescription;
