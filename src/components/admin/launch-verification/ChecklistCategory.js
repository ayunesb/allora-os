"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistCategory = ChecklistCategory;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var ChecklistItem_1 = require("./ChecklistItem");
function ChecklistCategory(_a) {
  var category = _a.category;
  var _b = (0, react_1.useState)(true),
    isExpanded = _b[0],
    setIsExpanded = _b[1];
  var toggleExpanded = function () {
    setIsExpanded(!isExpanded);
  };
  // Calculate status counts
  var completedCount = category.items.filter(function (item) {
    return item.status === "completed";
  }).length;
  var warningCount = category.items.filter(function (item) {
    return item.status === "warning";
  }).length;
  var errorCount = category.items.filter(function (item) {
    return item.status === "error";
  }).length;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "border rounded-lg overflow-hidden",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex justify-between items-center p-4 bg-secondary/40 cursor-pointer",
        onClick: toggleExpanded,
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "font-medium text-lg",
                children: category.name,
              }),
              category.description &&
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground",
                  children: category.description,
                }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-2 text-sm",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-green-600 font-medium",
                    children: completedCount,
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "text-muted-foreground",
                    children: "/",
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "font-medium",
                    children: category.items.length,
                  }),
                  warningCount > 0 &&
                    (0, jsx_runtime_1.jsxs)("span", {
                      className:
                        "ml-2 px-1.5 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs",
                      children: [
                        warningCount,
                        " warning",
                        warningCount !== 1 ? "s" : "",
                      ],
                    }),
                  errorCount > 0 &&
                    (0, jsx_runtime_1.jsxs)("span", {
                      className:
                        "ml-2 px-1.5 py-0.5 bg-red-100 text-red-800 rounded text-xs",
                      children: [
                        errorCount,
                        " error",
                        errorCount !== 1 ? "s" : "",
                      ],
                    }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "ghost",
                size: "sm",
                className: "p-0 h-auto",
                children: isExpanded
                  ? (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronUp, {
                      className: "h-5 w-5",
                    })
                  : (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, {
                      className: "h-5 w-5",
                    }),
              }),
            ],
          }),
        ],
      }),
      isExpanded &&
        (0, jsx_runtime_1.jsx)("div", {
          className: "divide-y",
          children: category.items.map(function (item) {
            return (0, jsx_runtime_1.jsx)(
              ChecklistItem_1.ChecklistItem,
              { item: item },
              item.id,
            );
          }),
        }),
    ],
  });
}
