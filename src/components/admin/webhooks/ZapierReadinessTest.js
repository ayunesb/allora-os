"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ZapierReadinessTest;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
/**
 * Component to test and display Zapier webhook readiness
 */
function ZapierReadinessTest(_a) {
  var webhookUrl = _a.webhookUrl,
    isValid = _a.isValid;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex flex-col space-y-2",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "bg-muted p-4 rounded-md",
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-sm font-medium mb-2",
            children: "Webhook Status",
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex items-center space-x-2",
            children: isValid
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                      className: "h-4 w-4 text-green-500",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm",
                      children: "Zapier webhook is properly configured",
                    }),
                  ],
                })
              : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                      className: "h-4 w-4 text-amber-500",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm",
                      children: "Zapier webhook needs configuration",
                    }),
                  ],
                }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "bg-muted/50 p-4 rounded-md",
        children: [
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-sm font-medium mb-2",
            children: "Webhook URL",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-xs font-mono break-all",
            children: webhookUrl || "Not configured",
          }),
        ],
      }),
    ],
  });
}
