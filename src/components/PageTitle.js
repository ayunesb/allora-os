"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageTitle = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var PageTitle = function (_a) {
  var title = _a.title,
    description = _a.description,
    children = _a.children;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "mb-6",
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "flex flex-col md:flex-row md:justify-between md:items-center",
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          children: [
            (0, jsx_runtime_1.jsx)("h1", {
              className: "text-2xl sm:text-3xl font-bold tracking-tight",
              children: title,
            }),
            description &&
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground mt-1",
                children: description,
              }),
          ],
        }),
        (0, jsx_runtime_1.jsx)("div", {
          className: "mt-4 md:mt-0 flex items-center space-x-2",
          children: children,
        }),
      ],
    }),
  });
};
exports.PageTitle = PageTitle;
exports.default = exports.PageTitle;
