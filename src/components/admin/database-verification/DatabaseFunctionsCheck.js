"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseFunctionsCheck = DatabaseFunctionsCheck;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
function DatabaseFunctionsCheck(_a) {
  var functions = _a.functions;
  if (!functions || functions.length === 0) return null;
  // Count function issues
  var functionIssues = functions.filter(function (f) {
    return !f.exists || !f.isSecure;
  }).length;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "rounded-md border border-border/60 overflow-hidden",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "bg-muted/30 px-4 py-3 font-medium border-b border-border/60 flex justify-between items-center",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Code, {
                className: "h-4 w-4 text-purple-500",
              }),
              (0, jsx_runtime_1.jsx)("span", {
                children: "Database Functions",
              }),
            ],
          }),
          functionIssues > 0
            ? (0, jsx_runtime_1.jsxs)("span", {
                className:
                  "text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full",
                children: [functionIssues, " issues"],
              })
            : (0, jsx_runtime_1.jsx)("span", {
                className:
                  "text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full",
                children: "All configured",
              }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "divide-y divide-border/60",
        children: functions.map(function (func) {
          return (0, jsx_runtime_1.jsxs)(
            "div",
            {
              className: "px-4 py-3",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center justify-between mb-1",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [
                        func.exists
                          ? (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              { className: "h-5 w-5 text-green-500" },
                            )
                          : (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
                              className: "h-5 w-5 text-red-500",
                            }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "font-medium",
                          children: func.name,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "text-sm ".concat(
                        func.exists ? "text-green-600" : "text-red-600",
                      ),
                      children: func.exists ? "Exists" : "Missing",
                    }),
                  ],
                }),
                func.exists &&
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "flex items-center pl-7 mt-1",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-2",
                      children: [
                        func.isSecure
                          ? (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              { className: "h-4 w-4 text-green-500" },
                            )
                          : (0, jsx_runtime_1.jsx)(
                              lucide_react_1.AlertTriangle,
                              { className: "h-4 w-4 text-amber-500" },
                            ),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-sm text-muted-foreground",
                          children: func.isSecure
                            ? "SECURITY DEFINER"
                            : "Not using SECURITY DEFINER",
                        }),
                      ],
                    }),
                  }),
              ],
            },
            func.name,
          );
        }),
      }),
    ],
  });
}
