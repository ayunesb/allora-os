"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationPrevious =
  exports.PaginationNext =
  exports.PaginationLink =
  exports.PaginationItem =
  exports.PaginationEllipsis =
  exports.PaginationContent =
  exports.Pagination =
    void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
// Creating/fixing the pagination component exports
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
var Pagination = react_1.default.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "nav",
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)(
          "mx-auto flex w-full justify-center",
          className,
        ),
        role: "navigation",
        "aria-label": "pagination",
      },
      props,
    ),
  );
});
exports.Pagination = Pagination;
Pagination.displayName = "Pagination";
var PaginationContent = react_1.default.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "ul",
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)(
          "flex flex-wrap items-center gap-1",
          className,
        ),
      },
      props,
    ),
  );
});
exports.PaginationContent = PaginationContent;
PaginationContent.displayName = "PaginationContent";
var PaginationItem = react_1.default.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "li",
    __assign({ ref: ref, className: (0, utils_1.cn)("", className) }, props),
  );
});
exports.PaginationItem = PaginationItem;
PaginationItem.displayName = "PaginationItem";
var PaginationLink = react_1.default.forwardRef(function (_a, ref) {
  var className = _a.className,
    isActive = _a.isActive,
    _b = _a.size,
    size = _b === void 0 ? "icon" : _b,
    props = __rest(_a, ["className", "isActive", "size"]);
  return (0, jsx_runtime_1.jsx)(
    "a",
    __assign(
      {
        ref: ref,
        "aria-current": isActive ? "page" : undefined,
        className: (0, utils_1.cn)(
          "flex h-9 w-9 items-center justify-center rounded-md border text-center text-sm transition-colors hover:bg-accent",
          isActive && "bg-primary text-primary-foreground hover:bg-primary/90",
          className,
        ),
      },
      props,
    ),
  );
});
exports.PaginationLink = PaginationLink;
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = react_1.default.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsxs)(
    PaginationLink,
    __assign(
      {
        ref: ref,
        "aria-label": "Go to previous page",
        size: "default",
        className: (0, utils_1.cn)("gap-1", className),
      },
      props,
      {
        children: [
          (0, jsx_runtime_1.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "h-4 w-4",
            children: (0, jsx_runtime_1.jsx)("path", { d: "M15 18l-6-6 6-6" }),
          }),
          (0, jsx_runtime_1.jsx)("span", { children: "Previous" }),
        ],
      },
    ),
  );
});
exports.PaginationPrevious = PaginationPrevious;
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = react_1.default.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsxs)(
    PaginationLink,
    __assign(
      {
        ref: ref,
        "aria-label": "Go to next page",
        size: "default",
        className: (0, utils_1.cn)("gap-1", className),
      },
      props,
      {
        children: [
          (0, jsx_runtime_1.jsx)("span", { children: "Next" }),
          (0, jsx_runtime_1.jsx)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "h-4 w-4",
            children: (0, jsx_runtime_1.jsx)("path", { d: "m9 18 6-6-6-6" }),
          }),
        ],
      },
    ),
  );
});
exports.PaginationNext = PaginationNext;
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = react_1.default.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsxs)(
    "span",
    __assign(
      {
        ref: ref,
        "aria-hidden": true,
        className: (0, utils_1.cn)(
          "flex h-9 w-9 items-center justify-center",
          className,
        ),
      },
      props,
      {
        children: [
          (0, jsx_runtime_1.jsxs)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "h-4 w-4",
            children: [
              (0, jsx_runtime_1.jsx)("circle", { cx: "12", cy: "12", r: "1" }),
              (0, jsx_runtime_1.jsx)("circle", { cx: "19", cy: "12", r: "1" }),
              (0, jsx_runtime_1.jsx)("circle", { cx: "5", cy: "12", r: "1" }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("span", {
            className: "sr-only",
            children: "More pages",
          }),
        ],
      },
    ),
  );
});
exports.PaginationEllipsis = PaginationEllipsis;
PaginationEllipsis.displayName = "PaginationEllipsis";
