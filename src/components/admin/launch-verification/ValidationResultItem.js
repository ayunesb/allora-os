"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationResultItem = ValidationResultItem;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
function ValidationResultItem(_a) {
  var id = _a.id,
    title = _a.title,
    result = _a.result;
  var getStatusIcon = function () {
    if (result.valid) {
      return (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
        className: "h-4 w-4 text-green-500",
      });
    } else {
      return (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
        className: "h-4 w-4 text-red-500",
      });
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex items-start gap-4 px-4 py-3 border rounded-md bg-muted/20",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "mt-0.5",
        children: getStatusIcon(),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex-1",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "font-medium",
            children: title,
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground",
            children: result.message,
          }),
        ],
      }),
    ],
  });
}
