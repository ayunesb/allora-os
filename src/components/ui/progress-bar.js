"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = ProgressBar;
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
function ProgressBar(_a) {
  var value = _a.value,
    max = _a.max,
    className = _a.className,
    _b = _a.variant,
    variant = _b === void 0 ? "default" : _b,
    _c = _a.showValue,
    showValue = _c === void 0 ? false : _c,
    _d = _a.size,
    size = _d === void 0 ? "md" : _d,
    _e = _a.animated,
    animated = _e === void 0 ? false : _e;
  var percent = Math.min(100, Math.max(0, (value / max) * 100));
  var sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };
  var variantClasses = {
    default: "bg-primary",
    success: "bg-green-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    primary: "bg-blue-500",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-600",
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: (0, utils_1.cn)(
          "w-full bg-muted/30 rounded-full overflow-hidden",
          sizeClasses[size],
          className,
        ),
        children: (0, jsx_runtime_1.jsx)("div", {
          className: (0, utils_1.cn)(
            variantClasses[variant],
            "h-full transition-all duration-500 ease-in-out",
            animated && "animate-pulse-slow",
          ),
          style: { width: "".concat(percent, "%") },
          role: "progressbar",
          "aria-valuenow": value,
          "aria-valuemin": 0,
          "aria-valuemax": max,
        }),
      }),
      showValue &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "mt-1 text-xs text-muted-foreground",
          children: [value, "/", max, " (", percent.toFixed(0), "%)"],
        }),
    ],
  });
}
