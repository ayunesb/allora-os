"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var RiskHeatmapChart = function (_a) {
  var _b = _a.data,
    data = _b === void 0 ? [] : _b,
    _c = _a.width,
    width = _c === void 0 ? 500 : _c,
    _d = _a.height,
    height = _d === void 0 ? 300 : _d;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          children: "Risk Heatmap",
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("div", {
          className: "flex items-center justify-center bg-muted rounded-md",
          style: { width: "100%", height: "".concat(height, "px") },
          children: (0, jsx_runtime_1.jsx)("p", {
            className: "text-muted-foreground text-sm",
            children: "Risk heatmap visualization will appear here",
          }),
        }),
      }),
    ],
  });
};
exports.default = RiskHeatmapChart;
