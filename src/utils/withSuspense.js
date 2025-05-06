"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = withSuspense;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
function withSuspense(element) {
  return (0, jsx_runtime_1.jsx)(react_1.Suspense, {
    fallback: (0, jsx_runtime_1.jsx)("div", {
      className: "p-4",
      children: "Loading...",
    }),
    children: element,
  });
}
