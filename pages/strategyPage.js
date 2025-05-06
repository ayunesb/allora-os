"use strict";
var __spreadArray =
  (this && this.__spreadArray) ||
  function (to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var StrategyForm_1 = require("@/components/strategies/StrategyForm");
var IndexPage = function () {
  var _a = (0, react_1.useState)([]),
    strategies = _a[0],
    setStrategies = _a[1];
  var handleAddStrategy = function (newStrategy) {
    setStrategies(
      __spreadArray(__spreadArray([], strategies, true), [newStrategy], false),
    );
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    children: [
      (0, jsx_runtime_1.jsx)("h1", { children: "Strategies" }),
      (0, jsx_runtime_1.jsx)(StrategyForm_1.default, {
        onAddStrategy: handleAddStrategy,
      }),
      (0, jsx_runtime_1.jsx)("ul", {
        children: strategies.map(function (strategy, index) {
          return (0, jsx_runtime_1.jsx)(
            "li",
            { children: strategy.name },
            index,
          );
        }),
      }),
    ],
  });
};
exports.default = IndexPage;
