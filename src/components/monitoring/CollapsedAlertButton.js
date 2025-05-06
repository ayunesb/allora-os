"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollapsedAlertButton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var AlertIcon_1 = require("./AlertIcon");
var CollapsedAlertButton = function (_a) {
  var alerts = _a.alerts,
    onClick = _a.onClick;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "fixed bottom-4 right-4 z-50",
    children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
      size: "sm",
      variant: "outline",
      className: "rounded-full p-2",
      onClick: onClick,
      children: [
        (0, jsx_runtime_1.jsx)(AlertIcon_1.AlertStatusIcon, {
          severity: alerts[0].severity,
        }),
        (0, jsx_runtime_1.jsxs)("span", {
          className: "ml-2",
          children: [alerts.length, " Alert", alerts.length !== 1 ? "s" : ""],
        }),
      ],
    }),
  });
};
exports.CollapsedAlertButton = CollapsedAlertButton;
