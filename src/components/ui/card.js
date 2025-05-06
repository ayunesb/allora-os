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
exports.CardContent =
  exports.CardDescription =
  exports.CardTitle =
  exports.CardFooter =
  exports.CardHeader =
  exports.Card =
    void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = require("react");
var utils_1 = require("@/lib/utils"); // Removed unused 'someUtility'
var Card = function (_a) {
  var children = _a.children,
    className = _a.className,
    props = __rest(_a, ["children", "className"]);
  return (0, jsx_runtime_1.jsx)(
    "div",
    __assign(
      {
        className: (0, utils_1.cn)(
          "rounded-2xl border border-white/10 bg-card/70 text-card-foreground backdrop-blur-md shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:shadow-primary/5 group",
          className,
        ),
      },
      props,
      { children: children },
    ),
  );
};
exports.Card = Card;
Card.displayName = "Card";
// Removed empty object type and extended directly
var CardHeader = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "div",
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)("flex flex-col space-y-1.5 p-6", className),
      },
      props,
    ),
  );
});
exports.CardHeader = CardHeader;
CardHeader.displayName = "CardHeader";
// Added accessible content for headings
var CardTitle = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    children = _a.children,
    props = __rest(_a, ["className", "children"]);
  return (0, jsx_runtime_1.jsxs)(
    "h3",
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)(
          "text-2xl font-bold leading-none tracking-tight text-white font-heading group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary-light transition-all duration-500",
          className,
        ),
      },
      props,
      { children: [children || "Default Title", " "] },
    ),
  );
});
exports.CardTitle = CardTitle;
CardTitle.displayName = "CardTitle";
// Removed empty object type and extended directly
var CardDescription = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "p",
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)("text-sm text-gray-400", className),
      },
      props,
    ),
  );
});
exports.CardDescription = CardDescription;
CardDescription.displayName = "CardDescription";
// Removed empty object type and extended directly
var CardContent = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "div",
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)("p-6 pt-0 text-gray-300", className),
      },
      props,
    ),
  );
});
exports.CardContent = CardContent;
CardContent.displayName = "CardContent";
// Removed empty object type and extended directly
var CardFooter = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    "div",
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)(
          "flex items-center justify-end gap-4 p-6 pt-0",
          className,
        ),
      },
      props,
    ),
  );
});
exports.CardFooter = CardFooter;
CardFooter.displayName = "CardFooter";
