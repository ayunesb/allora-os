"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseTablesCheck = DatabaseTablesCheck;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
function DatabaseTablesCheck(_a) {
  var tables = _a.tables;
  if (!tables || tables.length === 0) return null;
  // Count missing tables
  var missingTables = tables.filter(function (table) {
    return !table.exists;
  }).length;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "rounded-md border border-border/60 overflow-hidden",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "bg-muted/30 px-4 py-3 font-medium border-b border-border/60 flex justify-between items-center",
        children: [
          (0, jsx_runtime_1.jsx)("span", { children: "Database Tables" }),
          missingTables > 0
            ? (0, jsx_runtime_1.jsxs)("span", {
                className:
                  "text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full",
                children: [missingTables, " missing"],
              })
            : (0, jsx_runtime_1.jsx)("span", {
                className:
                  "text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full",
                children: "All present",
              }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "divide-y divide-border/60",
        children: tables.map(function (table) {
          return (0, jsx_runtime_1.jsxs)(
            "div",
            {
              className: "px-4 py-3 flex items-center justify-between",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center gap-2",
                  children: [
                    table.exists
                      ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                          className: "h-5 w-5 text-green-500",
                        })
                      : (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
                          className: "h-5 w-5 text-red-500",
                        }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "font-medium",
                      children: table.name,
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("span", {
                  className: "text-sm ".concat(
                    table.exists ? "text-green-600" : "text-red-600",
                  ),
                  children: table.exists ? "Exists" : "Missing",
                }),
              ],
            },
            table.name,
          );
        }),
      }),
    ],
  });
}
