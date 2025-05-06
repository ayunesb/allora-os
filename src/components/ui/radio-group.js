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
exports.RadioGroupItem = exports.RadioGroup = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = require("react");
var RadioGroupPrimitive = require("@radix-ui/react-radio-group");
var utils_1 = require("@/lib/utils");
var RadioGroup = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    RadioGroupPrimitive.Root,
    __assign({ className: (0, utils_1.cn)("grid gap-2", className) }, props, {
      ref: ref,
    }),
  );
});
exports.RadioGroup = RadioGroup;
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
var RadioGroupItem = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    props = __rest(_a, ["className"]);
  return (0, jsx_runtime_1.jsx)(
    RadioGroupPrimitive.Item,
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)(
          "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        ),
      },
      props,
      {
        children: (0, jsx_runtime_1.jsx)(RadioGroupPrimitive.Indicator, {
          className: "flex items-center justify-center",
          children: (0, jsx_runtime_1.jsx)("div", {
            className: "h-2 w-2 rounded-full bg-current",
          }),
        }),
      },
    ),
  );
});
exports.RadioGroupItem = RadioGroupItem;
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;
