"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StrategyGeneratorPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_helmet_async_1 = require("react-helmet-async");
var StrategyGenerator_1 = require("@/components/strategy/StrategyGenerator");
function StrategyGeneratorPage() {
  return (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
    children: [
      (0, jsx_runtime_1.jsx)(react_helmet_async_1.Helmet, {
        children: (0, jsx_runtime_1.jsx)("title", {
          children: "Executive Strategy Generator | Allora AI",
        }),
      }),
      (0, jsx_runtime_1.jsx)(StrategyGenerator_1.StrategyGenerator, {}),
    ],
  });
}
