"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchInfoBox = LaunchInfoBox;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
function LaunchInfoBox(_a) {
  var title = _a.title,
    description = _a.description,
    _b = _a.status,
    status = _b === void 0 ? "info" : _b,
    children = _a.children;
  var getStatusColor = function () {
    switch (status) {
      case "success":
        return "border-green-500";
      case "warning":
        return "border-yellow-500";
      case "error":
        return "border-red-500";
      default:
        return "border-blue-500";
    }
  };
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    className: "border-l-4 ".concat(getStatusColor()),
    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
      className: "p-4",
      children: [
        (0, jsx_runtime_1.jsx)("h3", {
          className: "font-medium text-lg",
          children: title,
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground text-sm mt-1",
          children: description,
        }),
        children &&
          (0, jsx_runtime_1.jsx)("div", {
            className: "mt-4",
            children: children,
          }),
      ],
    }),
  });
}
