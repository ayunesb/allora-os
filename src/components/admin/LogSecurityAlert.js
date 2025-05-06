"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLogSecurityAlert = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var LogSecurityAlert = function (_a) {
  var alertMessage = _a.alertMessage,
    timestamp = _a.timestamp;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "security-alert",
    children: [
      (0, jsx_runtime_1.jsxs)("p", {
        children: [
          (0, jsx_runtime_1.jsx)("strong", { children: "Alert:" }),
          " ",
          alertMessage,
        ],
      }),
      (0, jsx_runtime_1.jsx)("p", {
        children: (0, jsx_runtime_1.jsx)("small", {
          children: new Date(timestamp).toLocaleString(),
        }),
      }),
    ],
  });
};
// Auto-registration block (example)
var registerLogSecurityAlert = function () {
  // Logic to register this component in admin/system views
  console.log("LogSecurityAlert component registered.");
};
exports.registerLogSecurityAlert = registerLogSecurityAlert;
exports.default = LogSecurityAlert;
