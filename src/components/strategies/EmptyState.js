"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var use_mobile_1 = require("@/hooks/use-mobile");
var alert_1 = require("@/components/ui/alert");
var EmptyState = function (_a) {
  var onCreateNew = _a.onCreateNew,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b,
    _c = _a.error,
    error = _c === void 0 ? null : _c,
    onRetry = _a.onRetry;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobile = breakpoint === "mobile";
  if (error) {
    return (0, jsx_runtime_1.jsxs)("div", {
      className:
        "bg-secondary/40 border border-border/50 rounded-lg p-4 sm:p-6 text-center mb-10",
      children: [
        (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
          className:
            "h-10 w-10 sm:h-12 sm:w-12 text-destructive mx-auto mb-3 sm:mb-4",
        }),
        (0, jsx_runtime_1.jsx)("h3", {
          className: "text-xl font-bold mb-2",
          children: "Error Loading Strategies",
        }),
        (0, jsx_runtime_1.jsx)(alert_1.Alert, {
          variant: "destructive",
          className: "mb-4 sm:mb-6",
          children: (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
            children: error,
          }),
        }),
        onRetry &&
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            onClick: onRetry,
            variant: "outline",
            size: isMobile ? "sm" : "default",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                className: "mr-2 h-4 w-4",
              }),
              "Retry",
            ],
          }),
      ],
    });
  }
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "bg-secondary/40 border border-border/50 rounded-lg p-4 sm:p-6 text-center mb-10",
    children: [
      (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
        className:
          "h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4",
      }),
      (0, jsx_runtime_1.jsx)("h3", {
        className: "text-xl font-bold mb-2",
        children: "No Strategies Yet",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-gray-300 mb-4 sm:mb-6",
        children: "Create your first business strategy with AI assistance.",
      }),
      (0, jsx_runtime_1.jsxs)(button_1.Button, {
        onClick: onCreateNew,
        className: "allora-button",
        size: isMobile ? "sm" : "default",
        disabled: isLoading,
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
            className: "mr-2 h-4 w-4",
          }),
          isLoading ? "Creating..." : "Create First Strategy",
        ],
      }),
    ],
  });
};
exports.default = EmptyState;
