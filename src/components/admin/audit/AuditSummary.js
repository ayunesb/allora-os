"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditSummary = AuditSummary;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function AuditSummary(_a) {
  var summary = _a.summary;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.Card, {
        className: "bg-muted/50",
        children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          className:
            "p-4 flex flex-col items-center justify-center text-center",
          children: [
            (0, jsx_runtime_1.jsx)("div", {
              className: "text-4xl font-bold mb-2",
              children: summary.total,
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "text-sm text-muted-foreground",
              children: "Total Checks",
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.Card, {
        className: "bg-green-50 dark:bg-green-950/20",
        children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          className:
            "p-4 flex flex-col items-center justify-center text-center",
          children: [
            (0, jsx_runtime_1.jsx)("div", {
              className:
                "text-4xl font-bold text-green-600 dark:text-green-500 mb-2",
              children: summary.passed,
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "text-sm text-green-600 dark:text-green-400",
              children: "Passed",
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.Card, {
        className:
          summary.failed > 0 ? "bg-red-50 dark:bg-red-950/20" : "bg-muted/50",
        children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          className:
            "p-4 flex flex-col items-center justify-center text-center",
          children: [
            (0, jsx_runtime_1.jsx)("div", {
              className: "text-4xl font-bold mb-2 ".concat(
                summary.failed > 0 ? "text-red-600 dark:text-red-500" : "",
              ),
              children: summary.failed,
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "text-sm ".concat(
                summary.failed > 0
                  ? "text-red-600 dark:text-red-400"
                  : "text-muted-foreground",
              ),
              children: "Failed",
            }),
          ],
        }),
      }),
    ],
  });
}
