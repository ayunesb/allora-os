"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchProgress = LaunchProgress;
var jsx_runtime_1 = require("react/jsx-runtime");
var progress_1 = require("@/components/ui/progress");
var lucide_react_1 = require("lucide-react");
function LaunchProgress(_a) {
  var totalItems = _a.totalItems,
    completedItems = _a.completedItems,
    status = _a.status,
    isComplete = _a.isComplete,
    launchStep = _a.launchStep;
  return (0, jsx_runtime_1.jsx)("div", {
    className:
      "animate-in fade-in space-y-4 bg-primary-foreground border border-border/70 rounded-lg p-4",
    children: isComplete
      ? (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-center gap-2 text-green-600",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
              className: "h-5 w-5",
            }),
            (0, jsx_runtime_1.jsx)("span", {
              className: "font-medium",
              children: "Launch completed successfully!",
            }),
          ],
        })
      : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
          children: [
            (0, jsx_runtime_1.jsx)("div", {
              className: "text-sm font-medium",
              children: "Launching Allora AI...",
            }),
            (0, jsx_runtime_1.jsx)(progress_1.Progress, {
              value: undefined,
              className: "h-2",
            }),
            launchStep &&
              (0, jsx_runtime_1.jsx)("div", {
                className: "text-sm text-muted-foreground",
                children: launchStep,
              }),
          ],
        }),
  });
}
