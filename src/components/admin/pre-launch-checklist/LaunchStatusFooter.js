"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchStatusFooter = LaunchStatusFooter;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function LaunchStatusFooter(_a) {
  var allItemsCompleted = _a.allItemsCompleted,
    criticalItemsCompleted = _a.criticalItemsCompleted;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "pt-4 border-t border-border",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "flex justify-between items-center",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          children: [
            (0, jsx_runtime_1.jsx)("div", {
              className: "text-lg font-medium",
              children: "Launch Status",
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "text-sm text-muted-foreground",
              children: allItemsCompleted
                ? "All items completed! You're ready to launch."
                : criticalItemsCompleted
                  ? "All critical items completed. Ready for launch, but consider completing remaining items."
                  : "Complete all critical items before launching.",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)(button_1.Button, {
          className: "gap-2",
          disabled: !criticalItemsCompleted,
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, {
              className: "h-4 w-4",
            }),
            criticalItemsCompleted
              ? "Launch Project"
              : "Complete Critical Items",
          ],
        }),
      ],
    }),
  });
}
