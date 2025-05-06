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
exports.Progress = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = require("react");
var ProgressPrimitive = require("@radix-ui/react-progress");
var utils_1 = require("@/lib/utils");
var Progress = React.forwardRef(function (_a, ref) {
  var className = _a.className,
    value = _a.value,
    _b = _a.variant,
    variant = _b === void 0 ? "default" : _b,
    indicatorClassName = _a.indicatorClassName,
    props = __rest(_a, ["className", "value", "variant", "indicatorClassName"]);
  var getVariantClass = function (variant) {
    switch (variant) {
      case "success":
        return "bg-green-600";
      case "warning":
        return "bg-yellow-600";
      case "danger":
        return "bg-red-600";
      default:
        return "bg-primary";
    }
  };
  return (0, jsx_runtime_1.jsx)(
    ProgressPrimitive.Root,
    __assign(
      {
        ref: ref,
        className: (0, utils_1.cn)(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
          className,
        ),
      },
      props,
      {
        children: (0, jsx_runtime_1.jsx)(ProgressPrimitive.Indicator, {
          className: (0, utils_1.cn)(
            "h-full w-full flex-1 transition-all",
            getVariantClass(variant),
            indicatorClassName,
          ),
          style: { transform: "translateX(-".concat(100 - (value || 0), "%)") },
        }),
      },
    ),
  );
});
exports.Progress = Progress;
Progress.displayName = ProgressPrimitive.Root.displayName;
