"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var use_mobile_1 = require("@/hooks/use-mobile");
var FAQSection = function (_a) {
  var title = _a.title,
    items = _a.items;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "mt-12 md:mt-20 text-center max-w-3xl mx-auto",
    children: [
      (0, jsx_runtime_1.jsx)("h2", {
        className: "".concat(
          isMobileView ? "text-xl" : "text-2xl",
          " font-bold mb-4",
        ),
        children: title,
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "space-y-6 text-left",
        children: items.map(function (item, index) {
          return (0, jsx_runtime_1.jsxs)(
            "div",
            {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "font-medium mb-2",
                  children: item.question,
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-muted-foreground ".concat(
                    isMobileView ? "text-sm" : "",
                  ),
                  children: item.answer,
                }),
              ],
            },
            index,
          );
        }),
      }),
    ],
  });
};
exports.default = FAQSection;
