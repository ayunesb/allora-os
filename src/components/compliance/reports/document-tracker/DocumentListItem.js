"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DocumentListItem;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var DocumentStatusBadge_1 = require("./DocumentStatusBadge");
function DocumentListItem(_a) {
  var id = _a.id,
    name = _a.name,
    currentVersion = _a.currentVersion,
    lastUpdated = _a.lastUpdated,
    status = _a.status,
    nextUpdateDue = _a.nextUpdateDue,
    autoUpdatesEnabled = _a.autoUpdatesEnabled,
    onUpdate = _a.onUpdate,
    onToggleAutoUpdate = _a.onToggleAutoUpdate;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "p-4 border rounded-lg transition-colors ".concat(
      status === "outdated"
        ? "border-red-300 bg-red-50/10"
        : status === "update-available"
          ? "border-amber-300 bg-amber-50/10"
          : "border-gray-200",
    ),
    children: (0, jsx_runtime_1.jsxs)("div", {
      className:
        "flex flex-col md:flex-row md:items-center justify-between gap-4",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)("h4", {
                  className: "font-medium",
                  children: name,
                }),
                (0, jsx_runtime_1.jsx)(DocumentStatusBadge_1.default, {
                  status: status,
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className:
                "flex flex-col text-sm text-muted-foreground mt-1 gap-1",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "inline-block w-24",
                      children: "Version:",
                    }),
                    currentVersion,
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "inline-block w-24",
                      children: "Last updated:",
                    }),
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                      className: "h-3 w-3 mr-1",
                    }),
                    lastUpdated,
                  ],
                }),
                nextUpdateDue &&
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "inline-block w-24",
                        children: "Next review:",
                      }),
                      nextUpdateDue,
                    ],
                  }),
              ],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex flex-wrap gap-2 ml-auto",
          children: [
            status === "update-available" &&
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                size: "sm",
                onClick: function () {
                  return onUpdate(id);
                },
                className: "bg-amber-500 hover:bg-amber-600",
                children: "Update Now",
              }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "outline",
              size: "sm",
              onClick: function () {
                return onToggleAutoUpdate(id);
              },
              children: autoUpdatesEnabled
                ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                        className: "h-4 w-4 mr-1 text-green-500",
                      }),
                      "Auto-updates On",
                    ],
                  })
                : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                        className: "h-4 w-4 mr-1 text-amber-500",
                      }),
                      "Auto-updates Off",
                    ],
                  }),
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "ghost",
              size: "sm",
              children: (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                className: "h-4 w-4",
              }),
            }),
          ],
        }),
      ],
    }),
  });
}
