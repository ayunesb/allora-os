"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistProgress = ChecklistProgress;
var jsx_runtime_1 = require("react/jsx-runtime");
var progress_1 = require("@/components/ui/progress");
function ChecklistProgress(_a) {
  var completed = _a.completed,
    total = _a.total,
    categories = _a.categories;
  // Calculate percentage
  var percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  // Determine status color based on percentage
  var getStatusColor = function () {
    if (percentage >= 90) return "text-green-500";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };
  // Determine progress bar color based on percentage
  var getProgressColor = function () {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-400";
    return "bg-red-400";
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-2",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "text-sm text-gray-300",
            children: "Completion Status",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "font-medium ".concat(getStatusColor()),
            children: [percentage, "%"],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(progress_1.Progress, {
        value: percentage,
        className: "h-2 bg-secondary/20",
        indicatorClassName: getProgressColor(),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between text-sm",
        children: [
          (0, jsx_runtime_1.jsxs)("span", {
            className: "text-gray-300",
            children: [
              (0, jsx_runtime_1.jsx)("span", {
                className: "font-medium text-white",
                children: completed,
              }),
              " of ",
              (0, jsx_runtime_1.jsx)("span", {
                className: "font-medium text-white",
                children: total,
              }),
              " checks completed",
            ],
          }),
          (0, jsx_runtime_1.jsx)("span", {
            className:
              percentage === 100
                ? "text-green-500 font-medium"
                : "text-gray-300",
            children:
              percentage === 100 ? "All checks passed" : "Checks in progress",
          }),
        ],
      }),
    ],
  });
}
