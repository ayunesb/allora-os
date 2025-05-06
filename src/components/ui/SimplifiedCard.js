"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimplifiedCard = SimplifiedCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("./card");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
function SimplifiedCard(_a) {
  var title = _a.title,
    description = _a.description,
    children = _a.children,
    footer = _a.footer,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b,
    _c = _a.error,
    error = _c === void 0 ? null : _c,
    onRetry = _a.onRetry,
    _d = _a.variant,
    variant = _d === void 0 ? "default" : _d,
    contentClassName = _a.contentClassName,
    className = _a.className,
    icon = _a.icon,
    headerAction = _a.headerAction;
  // Variant-specific styles
  var variantStyles = {
    default: "",
    info: "border-blue-200 bg-blue-50/50 dark:bg-blue-950/10 dark:border-blue-900/50",
    success:
      "border-green-200 bg-green-50/50 dark:bg-green-950/10 dark:border-green-900/50",
    warning:
      "border-amber-200 bg-amber-50/50 dark:bg-amber-950/10 dark:border-amber-900/50",
    error:
      "border-red-200 bg-red-50/50 dark:bg-red-950/10 dark:border-red-900/50",
    ai: "border-purple-200 bg-purple-50/50 dark:bg-purple-950/10 dark:border-purple-900/50",
  };
  // Default icon based on variant
  var defaultIcon =
    variant === "ai"
      ? (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
          className: "h-5 w-5 text-purple-500",
        })
      : null;
  var displayIcon = icon || defaultIcon;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: (0, utils_1.cn)(variantStyles[variant], className),
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center justify-between",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center space-x-2",
                children: [
                  displayIcon &&
                    (0, jsx_runtime_1.jsx)("div", { children: displayIcon }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, { children: title }),
                ],
              }),
              headerAction &&
                (0, jsx_runtime_1.jsx)("div", { children: headerAction }),
            ],
          }),
          description &&
            (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
              children: description,
            }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: (0, utils_1.cn)(contentClassName),
        children: isLoading
          ? (0, jsx_runtime_1.jsx)("div", {
              className: "w-full flex items-center justify-center py-8",
              children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                className: "h-6 w-6 animate-spin text-muted-foreground",
              }),
            })
          : error
            ? (0, jsx_runtime_1.jsxs)("div", {
                className: "text-center py-4",
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-destructive mb-2",
                    children: error,
                  }),
                  onRetry &&
                    (0, jsx_runtime_1.jsx)("button", {
                      onClick: onRetry,
                      className:
                        "text-sm text-muted-foreground hover:text-foreground underline",
                      children: "Try again",
                    }),
                ],
              })
            : children,
      }),
      footer && (0, jsx_runtime_1.jsx)(card_1.CardFooter, { children: footer }),
    ],
  });
}
