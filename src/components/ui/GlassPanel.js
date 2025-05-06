"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlassPanel = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var GlassPanel = function (_a) {
  var children = _a.children;
  return (0, jsx_runtime_1.jsx)("div", {
    className:
      "bg-card/60 backdrop-blur-md border border-border rounded-xl shadow-md p-6",
    children: children,
  });
};
exports.GlassPanel = GlassPanel;
