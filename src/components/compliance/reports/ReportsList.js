"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReportsList;
var jsx_runtime_1 = require("react/jsx-runtime");
var badge_1 = require("@/components/ui/badge");
function ReportsList(_a) {
  var reports = _a.reports;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "rounded-md border",
    children: (0, jsx_runtime_1.jsx)("div", {
      className: "divide-y",
      children: reports.map(function (report) {
        return (0, jsx_runtime_1.jsxs)(
          "div",
          {
            className: "flex flex-col md:flex-row justify-between p-4 gap-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex items-center gap-2",
                    children: [
                      (0, jsx_runtime_1.jsx)("h3", {
                        className: "font-medium",
                        children: report.title,
                      }),
                      (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                        variant:
                          report.status === "completed" ? "default" : "outline",
                        children:
                          report.status === "completed"
                            ? "Completed"
                            : "Scheduled",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm text-muted-foreground",
                    children: report.type,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-4",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-sm",
                    children: report.date,
                  }),
                  (0, jsx_runtime_1.jsx)("button", {
                    className:
                      "text-sm font-medium text-primary hover:underline",
                    children:
                      report.status === "completed"
                        ? "Download"
                        : "View details",
                  }),
                ],
              }),
            ],
          },
          report.id,
        );
      }),
    }),
  });
}
