"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardSkeleton = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var CardSkeleton = function () {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "rounded-md bg-card p-4 shadow-md animate-pulse",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "h-4 bg-muted/20 rounded w-1/2 mb-2",
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "h-4 bg-muted/10 rounded w-1/3",
      }),
    ],
  });
};
exports.CardSkeleton = CardSkeleton;
