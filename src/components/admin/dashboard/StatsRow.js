"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsRow = StatsRow;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var use_mobile_1 = require("@/hooks/use-mobile");
function StatsRow(_a) {
  var stats = _a.stats,
    isLoading = _a.isLoading;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  if (isLoading) return null; // Loading state is handled by the parent component
  return (0, jsx_runtime_1.jsx)("div", {
    className:
      "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 sm:mb-6",
    children: stats.map(function (stat, i) {
      return (0, jsx_runtime_1.jsx)(
        card_1.Card,
        {
          className: "border-primary/10 shadow-sm overflow-hidden",
          children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            className: "p-3 sm:p-4 ".concat(
              isMobileView ? "flex justify-between items-center" : "",
            ),
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "".concat(isMobileView ? "flex-1" : ""),
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm font-medium text-muted-foreground",
                    children: stat.name,
                  }),
                  (0, jsx_runtime_1.jsx)("h3", {
                    className: "".concat(
                      isMobileView ? "text-xl" : "text-2xl",
                      " font-bold mt-1",
                    ),
                    children: stat.value,
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("span", {
                className: "flex items-center px-2 py-1 rounded text-xs "
                  .concat(
                    stat.up
                      ? "bg-green-500/10 text-green-500"
                      : "bg-red-500/10 text-red-500",
                    " ",
                  )
                  .concat(isMobileView ? "self-end" : "mt-2"),
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, {
                    className: "h-3 w-3 mr-1",
                  }),
                  stat.change,
                ],
              }),
            ],
          }),
        },
        i,
      );
    }),
  });
}
