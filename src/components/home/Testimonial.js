"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var Testimonial = function (_a) {
  var quote = _a.quote,
    author = _a.author,
    role = _a.role,
    avatar = _a.avatar,
    _b = _a.delay,
    delay = _b === void 0 ? 0 : _b;
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300",
    style: { animationDelay: "".concat(delay, "s") },
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex justify-between items-start mb-4",
        children: (0, jsx_runtime_1.jsx)(lucide_react_1.QuoteIcon, {
          className: "h-8 w-8 text-primary/30",
        }),
      }),
      (0, jsx_runtime_1.jsxs)("p", {
        className: "text-lg mb-6 italic",
        children: ['"', quote, '"'],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center",
        children: [
          (0, jsx_runtime_1.jsx)("img", {
            src: avatar,
            alt: author,
            className: "h-12 w-12 rounded-full mr-4 border-2 border-primary/20",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("p", {
                className: "font-medium",
                children: author,
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-sm text-muted-foreground",
                children: role,
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = Testimonial;
