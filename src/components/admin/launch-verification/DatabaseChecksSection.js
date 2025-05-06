"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseChecksSection = DatabaseChecksSection;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
function DatabaseChecksSection(_a) {
  var title = _a.title,
    items = _a.items;
  // If items is null, undefined, or not an array, render nothing
  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }
  // Choose the appropriate icon based on the title
  var getIcon = function () {
    if (title.includes("RLS") || title.includes("Security")) {
      return (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
        className: "h-3.5 w-3.5 text-blue-400",
      });
    } else if (title.includes("Index") || title.includes("Performance")) {
      return (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
        className: "h-3.5 w-3.5 text-amber-400",
      });
    } else if (title.includes("Function")) {
      return (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
        className: "h-3.5 w-3.5 text-blue-400",
      });
    }
    return null;
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "mt-4",
    children: [
      (0, jsx_runtime_1.jsx)("h3", {
        className: "text-sm font-medium mb-2 text-white",
        children: title,
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "space-y-2",
        children: items.map(function (item, index) {
          return (0, jsx_runtime_1.jsxs)(
            "div",
            {
              className:
                "bg-[#1E293B]/80 rounded-md border border-white/10 p-3 text-sm",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex justify-between items-center",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "font-medium text-white flex items-center gap-1.5",
                      children: [
                        getIcon(),
                        item.name || item.table || "Item ".concat(index + 1),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-1",
                      children: [
                        item.status === "verified" || item.status === "ready"
                          ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                              className: "h-4 w-4 text-green-500",
                            })
                          : (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                              className: "h-4 w-4 text-amber-500",
                            }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-xs capitalize text-gray-300",
                          children: item.status,
                        }),
                      ],
                    }),
                  ],
                }),
                item.message &&
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "text-xs text-gray-400 mt-1",
                    children: item.message,
                  }),
              ],
            },
            index,
          );
        }),
      }),
    ],
  });
}
