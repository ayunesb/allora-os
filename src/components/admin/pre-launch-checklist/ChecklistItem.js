"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistItem = ChecklistItem;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function ChecklistItem(_a) {
  var item = _a.item,
    onToggle = _a.onToggle;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex items-center justify-between p-2 rounded-md ".concat(
      item.completed
        ? "bg-green-500/5"
        : item.critical
          ? "bg-yellow-500/5"
          : "bg-secondary/40",
    ),
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center gap-2",
        children: [
          item.completed
            ? (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
                className: "h-5 w-5 text-green-500",
              })
            : item.critical
              ? (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                  className: "h-5 w-5 text-yellow-500",
                })
              : (0, jsx_runtime_1.jsx)("div", {
                  className: "h-5 w-5 border border-gray-300 rounded-md",
                }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className: "text-sm font-medium",
                children: item.task,
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "text-xs text-muted-foreground",
                children: item.category,
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        variant: item.completed ? "outline" : "default",
        size: "sm",
        onClick: function () {
          return onToggle(item.id);
        },
        children: item.completed ? "Mark Incomplete" : "Mark Complete",
      }),
    ],
  });
}
