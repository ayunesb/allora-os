"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var use_mobile_1 = require("@/hooks/use-mobile");
var PricingHeader = function (_a) {
  var title = _a.title,
    description = _a.description;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "text-center mb-8 md:mb-16",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "".concat(
          isMobileView ? "text-2xl" : "text-4xl",
          " font-bold mb-4",
        ),
        children: title,
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "".concat(
          isMobileView ? "text-base" : "text-xl",
          " text-muted-foreground max-w-2xl mx-auto",
        ),
        children: description,
      }),
    ],
  });
};
exports.default = PricingHeader;
