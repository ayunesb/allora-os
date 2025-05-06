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
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeStrategy = normalizeStrategy;
var strategyAnalysis_1 = require("@/utils/strategyAnalysis");
function normalizeStrategy(strategy) {
  var normalizedRisk = ["Low", "Medium", "High"].includes(strategy.riskLevel)
    ? strategy.riskLevel
    : "Medium";
  return (0, strategyAnalysis_1.analyzeStrategy)(
    __assign(__assign({}, strategy), { riskLevel: normalizedRisk }),
  );
}
