"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReportCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function ReportCard(_a) {
  var report = _a.report;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-3",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-start",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-lg",
                children: report.title,
              }),
              report.status === "completed"
                ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                    className: "h-5 w-5 text-green-500",
                  })
                : (0, jsx_runtime_1.jsx)(lucide_react_1.Calendar, {
                    className: "h-5 w-5 text-blue-500",
                  }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground",
            children: new Date(report.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("span", {
                  className: "text-sm font-medium",
                  children: "Status: ",
                }),
                (0, jsx_runtime_1.jsx)("span", {
                  className: "text-sm ".concat(
                    report.status === "completed"
                      ? "text-green-500"
                      : "text-blue-500",
                  ),
                  children:
                    report.status === "completed" ? "Completed" : "Scheduled",
                }),
              ],
            }),
            report.status === "completed"
              ? (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  size: "sm",
                  variant: "outline",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                      className: "mr-2 h-4 w-4",
                    }),
                    "Download",
                  ],
                })
              : (0, jsx_runtime_1.jsx)(button_1.Button, {
                  size: "sm",
                  variant: "outline",
                  disabled: true,
                  children: "Pending",
                }),
          ],
        }),
      }),
    ],
  });
}
