"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogSecurityAlert = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var LogSecurityAlert = function (_a) {
  var message = _a.message,
    severity = _a.severity;
  var getAlertColor = function () {
    switch (severity) {
      case "low":
        return "green";
      case "medium":
        return "orange";
      case "high":
        return "red";
      default:
        return "gray";
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    style: {
      border: "1px solid ".concat(getAlertColor()),
      padding: "10px",
      borderRadius: "5px",
    },
    children: [
      (0, jsx_runtime_1.jsx)("strong", { children: "Security Alert:" }),
      " ",
      message,
    ],
  });
};
exports.LogSecurityAlert = LogSecurityAlert;
