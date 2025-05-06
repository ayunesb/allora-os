"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertItem = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var AlertIcon_1 = require("./AlertIcon");
var AlertBadge_1 = require("./AlertBadge");
var AlertItem = function (_a) {
  var alert = _a.alert,
    onAcknowledge = _a.onAcknowledge;
  return (0, jsx_runtime_1.jsxs)(
    "div",
    {
      className: "rounded-md p-3 border ".concat(
        alert.acknowledged
          ? "bg-gray-50 border-gray-200"
          : "bg-"
              .concat(
                alert.severity === "critical" ? "red" : "amber",
                "-50 border-",
              )
              .concat(alert.severity === "critical" ? "red" : "amber", "-200"),
      ),
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-start",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-start gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(AlertIcon_1.AlertStatusIcon, {
                  severity: alert.severity,
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("h4", {
                      className: "font-medium ".concat(
                        alert.acknowledged ? "text-gray-700" : "text-gray-900",
                      ),
                      children: alert.title,
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm mt-0.5 ".concat(
                        alert.acknowledged ? "text-gray-500" : "text-gray-700",
                      ),
                      children: alert.message,
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(AlertBadge_1.AlertBadge, {
              severity: alert.severity,
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className:
            "mt-2 flex justify-between items-center text-xs text-gray-500",
          children: [
            (0, jsx_runtime_1.jsx)("span", {
              children: new Date(alert.timestamp).toLocaleTimeString(),
            }),
            !alert.acknowledged &&
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "ghost",
                size: "sm",
                className: "h-6 text-xs",
                onClick: function () {
                  return onAcknowledge(alert.id);
                },
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                    className: "h-3 w-3 mr-1",
                  }),
                  "Acknowledge",
                ],
              }),
          ],
        }),
      ],
    },
    alert.id,
  );
};
exports.AlertItem = AlertItem;
