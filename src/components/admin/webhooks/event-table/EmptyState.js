"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyState = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var EmptyState = function (_a) {
  var _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b,
    _c = _a.filtered,
    filtered = _c === void 0 ? false : _c;
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className:
        "flex flex-col items-center justify-center py-12 px-4 border rounded-md bg-muted/30",
      children: [
        (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
          className: "h-8 w-8 text-primary animate-spin mb-4",
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground",
          children: "Loading webhook events...",
        }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsx)("div", {
    className:
      "flex flex-col items-center justify-center py-12 px-4 border rounded-md bg-muted/30",
    children: filtered
      ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Search, {
              className: "h-8 w-8 text-muted-foreground mb-4",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "font-medium",
              children: "No matching webhook events found",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground text-center mt-1",
              children: "Try adjusting your search or filters",
            }),
          ],
        })
      : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
              className: "h-8 w-8 text-muted-foreground mb-4",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "font-medium",
              children: "No webhook events",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground text-center mt-1",
              children:
                "Webhook events will appear here once they are triggered",
            }),
          ],
        }),
  });
};
exports.EmptyState = EmptyState;
exports.default = exports.EmptyState;
