"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var FeatureBlock = function (_a) {
  var emoji = _a.emoji,
    title = _a.title,
    description = _a.description,
    icon = _a.icon,
    _b = _a.delay,
    delay = _b === void 0 ? 0 : _b;
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "bg-card hover:bg-card/80 p-6 sm:p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden relative h-full",
    style: { animationDelay: "".concat(delay, "s") },
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className:
          "absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8 z-0",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "relative z-10",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-col items-center mb-4",
            children: [
              (0, jsx_runtime_1.jsx)("div", {
                className: "text-2xl sm:text-3xl mb-2",
                children: emoji,
              }),
              icon &&
                (0, jsx_runtime_1.jsx)("div", {
                  className: "mt-2",
                  children: icon,
                }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("h3", {
            className: "text-lg sm:text-xl font-semibold mb-3 text-center",
            children: title,
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm sm:text-base text-muted-foreground text-center",
            children: description,
          }),
        ],
      }),
    ],
  });
};
exports.default = FeatureBlock;
