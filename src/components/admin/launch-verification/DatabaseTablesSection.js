"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseTablesSection = DatabaseTablesSection;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
function DatabaseTablesSection(_a) {
  var tables = _a.tables;
  if (!tables) return null;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "p-3 rounded-md bg-[#1E293B]/80 border border-white/10",
    children: [
      (0, jsx_runtime_1.jsxs)("h3", {
        className: "font-medium mb-2 text-white flex items-center gap-1.5",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
            className: "h-4 w-4 text-blue-400",
          }),
          "Database Tables Check",
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "space-y-1.5",
        children: Object.entries(tables).map(function (_a) {
          var table = _a[0],
            result = _a[1];
          return (0, jsx_runtime_1.jsxs)(
            "div",
            {
              className: "flex items-center justify-between text-sm",
              children: [
                (0, jsx_runtime_1.jsxs)("span", {
                  className:
                    "font-medium text-gray-300 flex items-center gap-1",
                  children: [
                    table,
                    result.exists &&
                      result.rls &&
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Lock, {
                        className: "h-3 w-3 text-green-400",
                      }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center gap-1",
                  children: [
                    result.exists
                      ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                          className: "h-3.5 w-3.5 text-green-500",
                        })
                      : (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
                          className: "h-3.5 w-3.5 text-red-500",
                        }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "px-2 py-0.5 rounded-full text-xs ".concat(
                        result.exists
                          ? "bg-green-900/50 text-green-300"
                          : "bg-red-900/50 text-red-300",
                      ),
                      children: result.exists ? "Exists" : "Missing",
                    }),
                  ],
                }),
              ],
            },
            table,
          );
        }),
      }),
    ],
  });
}
