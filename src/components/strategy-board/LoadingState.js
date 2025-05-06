"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoadingState;
var jsx_runtime_1 = require("react/jsx-runtime");
var skeleton_1 = require("@/components/ui/skeleton");
var use_mobile_1 = require("@/hooks/use-mobile");
function LoadingState() {
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  // Determine number of skeleton cards to show based on breakpoint
  var getCardCount = function () {
    switch (breakpoint) {
      case "xs":
      case "mobile":
        return 2;
      case "tablet":
        return 4;
      default:
        return 6;
    }
  };
  // Determine grid columns based on breakpoint
  var getGridClass = function () {
    switch (breakpoint) {
      case "xs":
      case "mobile":
        return "grid-cols-1";
      case "tablet":
        return "grid-cols-2";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
    }
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid ".concat(getGridClass(), " gap-4 sm:gap-6"),
    children: Array.from({ length: getCardCount() }).map(function (_, index) {
      return (0, jsx_runtime_1.jsxs)(
        "div",
        {
          className:
            "border border-white/10 bg-black/40 backdrop-blur-md rounded-lg p-4 sm:p-6 space-y-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex flex-wrap justify-between gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-6 w-20",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-6 w-24",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-7 w-4/5",
            }),
            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-4 w-1/3",
            }),
            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-16 w-full",
            }),
            (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
              className: "h-2 w-full",
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex justify-between pt-2",
              children: [
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-4 w-24",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-4 w-20",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex gap-2 pt-2",
              children: [
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-9 flex-1",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-9 w-9",
                }),
                (0, jsx_runtime_1.jsx)(skeleton_1.Skeleton, {
                  className: "h-9 w-9",
                }),
              ],
            }),
          ],
        },
        index,
      );
    }),
  });
}
