"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditStatusList = AuditStatusList;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
function AuditStatusList(_a) {
  var items = _a.items;
  var getStatusIcon = function (status, size) {
    if (size === void 0) {
      size = "sm";
    }
    var className = size === "lg" ? "h-6 w-6" : "h-4 w-4";
    switch (status) {
      case "passed":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
          className: "".concat(className, " text-green-500"),
        });
      case "failed":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
          className: "".concat(className, " text-red-500"),
        });
      case "in-progress":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
          className: "".concat(className, " animate-spin text-blue-500"),
        });
      default:
        return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
          className: "".concat(className, " text-muted-foreground"),
        });
    }
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid grid-cols-1 gap-2 mb-6",
    children: items.map(function (item) {
      return (0, jsx_runtime_1.jsxs)(
        "div",
        {
          className: "flex justify-between items-center p-3 border rounded-md",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                getStatusIcon(item.status),
                (0, jsx_runtime_1.jsx)("span", {
                  className: "font-medium",
                  children: item.label,
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "text-sm text-muted-foreground",
              children:
                item.status === "passed"
                  ? item.passedMessage
                  : item.status === "failed"
                    ? item.failedMessage
                    : item.status === "in-progress"
                      ? "Checking..."
                      : item.pendingMessage,
            }),
          ],
        },
        item.id,
      );
    }),
  });
}
