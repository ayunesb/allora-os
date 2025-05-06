"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypographySmall =
  exports.TypographyP =
  exports.TypographyH1 =
  exports.PageTitle =
    void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("@/lib/utils");
var PageTitle = function (_a) {
  var title = _a.title,
    description = _a.description,
    children = _a.children,
    className = _a.className;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: (0, utils_1.cn)("mb-6", className),
    children: [
      (0, jsx_runtime_1.jsx)("h1", {
        className: "text-2xl font-bold tracking-tight",
        children: title,
      }),
      description &&
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-muted-foreground mt-1",
          children: description,
        }),
      children,
    ],
  });
};
exports.PageTitle = PageTitle;
// Add the missing typography components
var TypographyH1 = function (_a) {
  var children = _a.children,
    className = _a.className;
  return (0, jsx_runtime_1.jsx)("h1", {
    className: (0, utils_1.cn)(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      className,
    ),
    children: children,
  });
};
exports.TypographyH1 = TypographyH1;
var TypographyP = function (_a) {
  var children = _a.children,
    className = _a.className;
  return (0, jsx_runtime_1.jsx)("p", {
    className: (0, utils_1.cn)(
      "leading-7 [&:not(:first-child)]:mt-6",
      className,
    ),
    children: children,
  });
};
exports.TypographyP = TypographyP;
var TypographySmall = function (_a) {
  var children = _a.children,
    className = _a.className;
  return (0, jsx_runtime_1.jsx)("small", {
    className: (0, utils_1.cn)("text-sm font-medium leading-none", className),
    children: children,
  });
};
exports.TypographySmall = TypographySmall;
