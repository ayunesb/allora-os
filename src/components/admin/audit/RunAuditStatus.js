"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunAuditStatus = RunAuditStatus;
var jsx_runtime_1 = require("react/jsx-runtime");
var progress_1 = require("@/components/ui/progress");
var lucide_react_1 = require("lucide-react");
function RunAuditStatus(_a) {
  var isRunning = _a.isRunning,
    progress = _a.progress,
    auditComplete = _a.auditComplete,
    _b = _a.criticalIssues,
    criticalIssues = _b === void 0 ? 0 : _b;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-2",
        children: [
          (0, jsx_runtime_1.jsx)(progress_1.Progress, {
            value: progress,
            className: "h-2 w-full",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between text-xs text-muted-foreground",
            children: [
              (0, jsx_runtime_1.jsx)("span", { children: "0%" }),
              (0, jsx_runtime_1.jsx)("span", { children: "50%" }),
              (0, jsx_runtime_1.jsx)("span", { children: "100%" }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex flex-col items-center justify-center py-8 text-center",
        children: [
          isRunning &&
            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                  className: "h-12 w-12 text-primary animate-spin mb-4",
                }),
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-xl font-medium mb-2",
                  children: "Running System Audit",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground",
                  children: "Checking security, performance, and compliance...",
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "mt-4 text-sm font-medium",
                  children: [progress, "% Complete"],
                }),
              ],
            }),
          auditComplete &&
            criticalIssues === 0 &&
            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                  className: "h-12 w-12 text-green-500 mb-4",
                }),
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-xl font-medium mb-2",
                  children: "Audit Complete",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-green-600 dark:text-green-400",
                  children: "All systems are ready!",
                }),
              ],
            }),
          auditComplete &&
            criticalIssues > 0 &&
            (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                  className: "h-12 w-12 text-amber-500 mb-4",
                }),
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-xl font-medium mb-2",
                  children: "Audit Complete",
                }),
                (0, jsx_runtime_1.jsxs)("p", {
                  className: "text-amber-600 dark:text-amber-400",
                  children: [
                    "Found ",
                    criticalIssues,
                    " critical ",
                    criticalIssues === 1 ? "issue" : "issues",
                    " that need attention",
                  ],
                }),
              ],
            }),
        ],
      }),
    ],
  });
}
