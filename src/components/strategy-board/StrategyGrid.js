"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StrategyGrid;
var jsx_runtime_1 = require("react/jsx-runtime");
var StrategyCard_1 = require("./StrategyCard");
var use_mobile_1 = require("@/hooks/use-mobile");
function StrategyGrid(_a) {
  var strategies = _a.strategies,
    onDebate = _a.onDebate,
    onExport = _a.onExport,
    onViewStrategy = _a.onViewStrategy;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  // Determine grid columns based on breakpoint
  var getGridClass = function () {
    switch (breakpoint) {
      case "xs":
      case "mobile":
        return "grid-cols-1";
      case "tablet":
        return "grid-cols-2";
      case "laptop":
        return "grid-cols-2 lg:grid-cols-3";
      case "desktop":
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3";
    }
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid ".concat(getGridClass(), " gap-4 sm:gap-6"),
    children: strategies.map(function (strategy) {
      return (0, jsx_runtime_1.jsx)(
        StrategyCard_1.default,
        {
          strategy: strategy,
          onDebate: function () {
            return onDebate(strategy);
          },
          onExport: function () {
            return onExport(strategy);
          },
          onClick: function () {
            return onViewStrategy(strategy);
          },
        },
        strategy.id,
      );
    }),
  });
}
