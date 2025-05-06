"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChecklistItem = ChecklistItem;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var tooltip_1 = require("@/components/ui/tooltip");
function ChecklistItem(_a) {
  var item = _a.item;
  // Determine status icon and color
  var renderStatusIcon = function () {
    switch (item.status) {
      case "completed":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
          className: "h-5 w-5 text-green-600",
        });
      case "warning":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
          className: "h-5 w-5 text-yellow-600",
        });
      case "error":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
          className: "h-5 w-5 text-red-600",
        });
      case "in-progress":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
          className: "h-5 w-5 text-blue-600",
        });
      case "pending":
      default:
        return (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
          className: "h-5 w-5 text-gray-400",
        });
    }
  };
  var getStatusText = function () {
    switch (item.status) {
      case "completed":
        return "Completed";
      case "warning":
        return "Warning";
      case "error":
        return "Error";
      case "in-progress":
        return "In Progress";
      case "pending":
      default:
        return "Pending";
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "p-3 flex items-center justify-between",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center gap-3",
        children: [
          renderStatusIcon(),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "font-medium",
                    children: item.name,
                  }),
                  item.isRequired &&
                    (0, jsx_runtime_1.jsx)("span", {
                      className:
                        "text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded",
                      children: "Required",
                    }),
                ],
              }),
              item.description &&
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm text-muted-foreground",
                  children: item.description,
                }),
              item.statusMessage &&
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm mt-1 ".concat(
                    item.status === "warning"
                      ? "text-yellow-600"
                      : item.status === "error"
                        ? "text-red-600"
                        : "text-muted-foreground",
                  ),
                  children: item.statusMessage,
                }),
            ],
          }),
        ],
      }),
      item.details &&
        (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
          children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
            children: [
              (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                asChild: true,
                children: (0, jsx_runtime_1.jsx)("button", {
                  className: "p-1.5 rounded-full hover:bg-secondary",
                  "aria-label": "View details",
                  children: (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
                    className: "h-4 w-4 text-muted-foreground",
                  }),
                }),
              }),
              (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                children: (0, jsx_runtime_1.jsx)("p", {
                  className: "max-w-xs",
                  children: item.details,
                }),
              }),
            ],
          }),
        }),
    ],
  });
}
