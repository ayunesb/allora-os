"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageLoader = PageLoader;
var jsx_runtime_1 = require("react/jsx-runtime");
function PageLoader(_a) {
  var _b = _a.message,
    message = _b === void 0 ? "Loading..." : _b;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex flex-col items-center justify-center min-h-[50vh]",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className:
          "h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "mt-4 text-muted-foreground",
        children: message,
      }),
    ],
  });
}
