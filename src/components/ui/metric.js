"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metric = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var Metric = function (_a) {
  var children = _a.children,
    _b = _a.className,
    className = _b === void 0 ? "" : _b;
  return (0, jsx_runtime_1.jsx)("span", {
    className: "text-3xl font-bold tabular-nums tracking-tight ".concat(
      className,
    ),
    children: children,
  });
};
exports.Metric = Metric;
