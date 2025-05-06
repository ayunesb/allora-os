"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageTitle = PageTitle;
var jsx_runtime_1 = require("react/jsx-runtime");
function PageTitle(_a) {
  var children = _a.children,
    title = _a.title,
    description = _a.description;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-1.5 mb-6",
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-2xl font-bold tracking-tight md:text-3xl",
        title: title,
        children: children,
      }),
      description &&
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground",
          children: description,
        }),
    ],
  });
}
