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
exports.useRiskAnalysis = useRiskAnalysis;
var react_1 = require("react");
function useRiskAnalysis() {
  var _a = (0, react_1.useState)([
      { name: "market_volatility", weight: 0.3, score: 0 },
      { name: "competition", weight: 0.2, score: 0 },
      { name: "regulatory", weight: 0.2, score: 0 },
      { name: "technological", weight: 0.15, score: 0 },
      { name: "financial", weight: 0.15, score: 0 },
    ]),
    riskFactors = _a[0],
    setRiskFactors = _a[1];
  /**
   * Calculate a risk score based on input factors
   */
  var calculateRiskScore = (0, react_1.useCallback)(
    function (factors) {
      var totalScore = 0;
      var totalWeight = 0;
      riskFactors.forEach(function (factor) {
        if (factors[factor.name] !== undefined) {
          totalScore += factor.weight * factors[factor.name];
          totalWeight += factor.weight;
        }
      });
      if (totalWeight === 0) return 0;
      // Return a score between 0-100
      return Math.round((totalScore / totalWeight) * 100);
    },
    [riskFactors],
  );
  /**
   * Update risk factor scores
   */
  var updateRiskFactors = (0, react_1.useCallback)(function (factors) {
    setRiskFactors(function (prev) {
      return prev.map(function (factor) {
        return __assign(__assign({}, factor), {
          score:
            factors[factor.name] !== undefined
              ? factors[factor.name]
              : factor.score,
        });
      });
    });
  }, []);
  /**
   * Determine a risk appetite level based on score
   */
  var getRiskAppetiteFromScore = (0, react_1.useCallback)(function (score) {
    if (score < 30) return "low";
    if (score < 70) return "medium";
    return "high";
  }, []);
  /**
   * Get a risk-appropriate strategy recommendation
   */
  var getStrategyRecommendation = (0, react_1.useCallback)(function (
    riskAppetite,
  ) {
    switch (riskAppetite) {
      case "low":
        return "Focus on preserving capital and stable growth. Prioritize well-established markets and proven products.";
      case "medium":
        return "Balance growth with calculated risks. Explore adjacent markets and invest moderately in innovation.";
      case "high":
        return "Pursue aggressive growth and disruption opportunities. Consider first-mover advantages and revolutionary products.";
      default:
        return "Balanced approach recommended based on current market conditions.";
    }
  }, []);
  return {
    riskFactors: riskFactors,
    calculateRiskScore: calculateRiskScore,
    updateRiskFactors: updateRiskFactors,
    getRiskAppetiteFromScore: getRiskAppetiteFromScore,
    getStrategyRecommendation: getStrategyRecommendation,
  };
}
