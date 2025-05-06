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
exports.analyzeStrategy =
  exports.analyzeStrategyFactors =
  exports.calculateCompetitiveAdvantage =
  exports.calculateImplementationComplexity =
  exports.estimateTimeToResults =
    void 0;
exports.getStrategyInsights = getStrategyInsights;
exports.getAnalyzedStrategy = getAnalyzedStrategy;
// Import from strategy with individual imports to avoid naming conflicts
var strategyAnalyzer_1 = require("@/utils/strategyAnalyzer"); // ✅ Adjust to the correct path
Object.defineProperty(exports, "analyzeStrategy", {
  enumerable: true,
  get: function () {
    return strategyAnalyzer_1.analyzeStrategy;
  },
});
// Define the missing analysis functions that were referenced
var estimateTimeToResults = function (strategy) {
  // We need to handle both Strategy and GeneratedStrategy types
  if ("riskLevel" in strategy && !("risk_level" in strategy)) {
    // This is a GeneratedStrategy
    return "3-6 months";
  } else {
    // This is a Strategy
    var riskLevel = strategy.riskLevel || strategy.risk_level;
    return riskLevel === "High"
      ? "6-9 months"
      : riskLevel === "Medium"
        ? "4-8 months"
        : "3-6 months";
  }
};
exports.estimateTimeToResults = estimateTimeToResults;
var calculateImplementationComplexity = function (strategy) {
  // Handle both Strategy and GeneratedStrategy types
  if ("riskLevel" in strategy && !("risk_level" in strategy)) {
    // This is a GeneratedStrategy
    return 3; // Medium complexity
  } else {
    // This is a Strategy
    var riskLevel = strategy.riskLevel || strategy.risk_level;
    return riskLevel === "High" ? 4 : riskLevel === "Medium" ? 3 : 2;
  }
};
exports.calculateImplementationComplexity = calculateImplementationComplexity;
var calculateCompetitiveAdvantage = function (strategy) {
  // Handle both Strategy and GeneratedStrategy types
  if ("riskLevel" in strategy && !("risk_level" in strategy)) {
    // This is a GeneratedStrategy
    return 4; // Good advantage
  } else {
    // This is a Strategy
    var riskLevel = strategy.riskLevel || strategy.risk_level;
    return riskLevel === "High" ? 5 : riskLevel === "Medium" ? 4 : 3;
  }
};
exports.calculateCompetitiveAdvantage = calculateCompetitiveAdvantage;
var analyzeStrategyFactors = function (strategy) {
  // For Strategy objects, we need to convert to a format compatible with analyzeStrategy function
  if (!("riskLevel" in strategy) || "risk_level" in strategy) {
    // Get the risk level, prioritizing riskLevel over risk_level
    var riskLevel = strategy.riskLevel || strategy.risk_level || "Medium";
    // Convert Strategy to a simplified form that works with analyzeStrategy
    return {
      strengths: [
        "Aligned with business objectives",
        "Clear implementation path",
        riskLevel === "Low"
          ? "Low resource requirements"
          : "High potential impact",
      ],
      weaknesses: [
        riskLevel === "High"
          ? "Higher implementation risk"
          : "Limited growth potential",
        "Requires ongoing monitoring",
      ],
      keySuccessFactors: [
        "Clear strategic alignment",
        "Effective resource allocation",
        "Strong leadership commitment",
      ],
    };
  }
  return (0, strategyAnalyzer_1.analyzeStrategy)(strategy);
};
exports.analyzeStrategyFactors = analyzeStrategyFactors;
// Export insight functions with structured return data
function getStrategyInsights(strategy) {
  var implementationComplexity = (0, exports.calculateImplementationComplexity)(
    strategy,
  );
  var competitiveAdvantage = (0, exports.calculateCompetitiveAdvantage)(
    strategy,
  );
  var timeToResults = (0, exports.estimateTimeToResults)(strategy);
  var analysisFactors = (0, exports.analyzeStrategyFactors)(strategy);
  return {
    steps: [],
    strengths: [],
    weaknesses: [],
    implementationComplexity: implementationComplexity,
    competitiveAdvantage: competitiveAdvantage,
    timeToResults: timeToResults,
    analysisFactors: analysisFactors,
  };
}
var getStrategyDetails = function (strategy) {
  return {
    id: strategy.id,
    name: strategy.name,
  };
};
function getAnalyzedStrategy(strategy) {
  var normalizedRisk = ["Low", "Medium", "High"].includes(
    strategy.riskLevel || "",
  )
    ? strategy.riskLevel
    : "Medium";
  return (0, strategyAnalyzer_1.analyzeStrategy)(
    __assign(__assign({}, strategy), { riskLevel: normalizedRisk }),
  );
}
