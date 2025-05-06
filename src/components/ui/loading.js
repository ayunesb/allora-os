"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loading = Loading;
exports.SkeletonLoader = SkeletonLoader;
exports.DataLoading = DataLoading;
exports.APILoading = APILoading;
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
var lucide_react_1 = require("lucide-react");
var HelpTooltip_1 = require("@/components/help/HelpTooltip");
/**
 * Loading component that displays a spinner and optional text
 */
function Loading(_a) {
  var _b = _a.size,
    size = _b === void 0 ? "md" : _b,
    text = _a.text,
    _c = _a.center,
    center = _c === void 0 ? false : _c,
    _d = _a.fullHeight,
    fullHeight = _d === void 0 ? false : _d,
    tooltip = _a.tooltip,
    className = _a.className;
  // Map sizes to Tailwind classes
  var sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };
  // Basic component
  var spinner = (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
    className: (0, utils_1.cn)(sizeClasses[size], "animate-spin", className),
  });
  // If just the spinner is needed without any positioning or text
  if (!center && !fullHeight && !text) {
    return tooltip
      ? (0, jsx_runtime_1.jsx)(HelpTooltip_1.HelpTooltip, {
          content: tooltip,
          children: spinner,
        })
      : spinner;
  }
  return (0, jsx_runtime_1.jsxs)("div", {
    className: (0, utils_1.cn)(
      "flex flex-col items-center justify-center",
      center && "w-full",
      fullHeight && "min-h-[200px]",
      center && fullHeight && "min-h-[50vh]",
    ),
    role: "status",
    "aria-live": "polite",
    children: [
      spinner,
      text &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "mt-2 flex items-center",
          children: [
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-sm text-muted-foreground",
              children: text,
            }),
            tooltip &&
              (0, jsx_runtime_1.jsx)(HelpTooltip_1.HelpTooltip, {
                content: tooltip,
                children: (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
                  className: "ml-1 h-4 w-4 text-muted-foreground cursor-help",
                }),
              }),
          ],
        }),
    ],
  });
}
/**
 * Skeleton loader for content that's still loading
 */
function SkeletonLoader(_a) {
  var _b = _a.rows,
    rows = _b === void 0 ? 3 : _b,
    className = _a.className,
    tooltip = _a.tooltip;
  var skeletonContent = (0, jsx_runtime_1.jsx)("div", {
    className: (0, utils_1.cn)("space-y-2", className),
    children: Array(rows)
      .fill(0)
      .map(function (_, i) {
        return (0, jsx_runtime_1.jsx)(
          "div",
          {
            className: "h-4 bg-muted animate-pulse rounded",
            style: {
              width: "".concat(Math.floor(Math.random() * 50) + 50, "%"),
            },
          },
          i,
        );
      }),
  });
  return tooltip
    ? (0, jsx_runtime_1.jsxs)("div", {
        className: "relative",
        children: [
          skeletonContent,
          (0, jsx_runtime_1.jsx)(HelpTooltip_1.HelpTooltip, {
            content: tooltip,
            className: "absolute top-0 right-0",
            children: (0, jsx_runtime_1.jsx)("span", {
              className: "sr-only",
              children: "Loading information",
            }),
          }),
        ],
      })
    : skeletonContent;
}
/**
 * Component to use when data is still being fetched
 */
function DataLoading(_a) {
  var tooltipMessage = _a.tooltipMessage;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "flex flex-col items-center justify-center py-12",
    role: "status",
    "aria-live": "polite",
    children: (0, jsx_runtime_1.jsx)(Loading, {
      size: "lg",
      text: "Loading data...",
      tooltip:
        tooltipMessage ||
        "We're fetching the latest data for you. This should only take a moment.",
    }),
  });
}
/**
 * Component to use specifically for API calls
 */
function APILoading(_a) {
  var _b = _a.text,
    text = _b === void 0 ? "Connecting to server..." : _b,
    tooltipMessage = _a.tooltipMessage;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "rounded-lg border p-8 text-center",
    role: "status",
    "aria-live": "polite",
    children: (0, jsx_runtime_1.jsx)(Loading, {
      center: true,
      text: text,
      tooltip:
        tooltipMessage ||
        "We're establishing a secure connection to our servers. This may take a few seconds.",
    }),
  });
}
exports.default = Loading;
