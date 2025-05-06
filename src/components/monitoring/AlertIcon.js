"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertStatusIcon = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var AlertStatusIcon = function (_a) {
  var severity = _a.severity;
  switch (severity) {
    case "critical":
      return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
        className: "h-5 w-5 text-red-600",
      });
    case "error":
      return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
        className: "h-5 w-5 text-red-500",
      });
    case "warning":
      return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
        className: "h-5 w-5 text-amber-500",
      });
    case "info":
    default:
      return (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
        className: "h-5 w-5 text-blue-500",
      });
  }
};
exports.AlertStatusIcon = AlertStatusIcon;
