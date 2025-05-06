"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServerErrorPage;
var jsx_runtime_1 = require("react/jsx-runtime");
function ServerErrorPage() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex flex-col items-center justify-center h-screen text-white",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-5xl font-bold mb-4",
        children: "500",
      }),
      (0, jsx_runtime_1.jsxs)("p", {
        className: "text-lg",
        children: [
          "Something went wrong. Please try again later or return",
          " ",
          (0, jsx_runtime_1.jsx)("a", {
            href: "/",
            className: "underline",
            children: "home",
          }),
          ".",
        ],
      }),
    ],
  });
}
