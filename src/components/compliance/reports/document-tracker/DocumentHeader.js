"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function DocumentHeader(_a) {
  var onCheckForUpdates = _a.onCheckForUpdates,
    isCheckingUpdates = _a.isCheckingUpdates,
    lastChecked = _a.lastChecked;
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 mb-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsx)("h2", {
            className: "text-xl font-semibold",
            children: "Legal Document Tracker",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground",
            children: "Monitor and update your compliance documents",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center text-xs text-muted-foreground",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                className: "h-3 w-3 mr-1",
              }),
              lastChecked
                ? (0, jsx_runtime_1.jsxs)("span", {
                    children: ["Last checked: ", lastChecked.toLocaleString()],
                  })
                : (0, jsx_runtime_1.jsx)("span", {
                    children: "Not checked yet",
                  }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            onClick: onCheckForUpdates,
            disabled: isCheckingUpdates,
            size: "sm",
            children: isCheckingUpdates
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                      className: "mr-2 h-4 w-4 animate-spin",
                    }),
                    "Checking for updates...",
                  ],
                })
              : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                      className: "mr-2 h-4 w-4",
                    }),
                    "Check for updates",
                  ],
                }),
          }),
        ],
      }),
    ],
  });
}
