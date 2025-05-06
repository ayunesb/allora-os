"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Strategies;
var jsx_runtime_1 = require("react/jsx-runtime");
var use_mobile_1 = require("@/hooks/use-mobile");
var PageErrorBoundary_1 = require("@/components/errorHandling/PageErrorBoundary");
var HelpButton_1 = require("@/components/help/HelpButton");
var StrategyBoard_1 = require("@/components/strategy-board/StrategyBoard");
function Strategies() {
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  return (0, jsx_runtime_1.jsx)(PageErrorBoundary_1.PageErrorBoundary, {
    pageName: "Strategies",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: isMobileView ? "px-0 -mx-4" : "",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className: "flex justify-between items-center mb-4",
          children: [
            (0, jsx_runtime_1.jsx)("h1", {
              className: "text-2xl font-bold",
              children: "Business Strategies",
            }),
            (0, jsx_runtime_1.jsx)(HelpButton_1.HelpButton, {
              contextId: "strategies",
              variant: "text",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)(StrategyBoard_1.default, {}),
      ],
    }),
  });
}
