"use strict";
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __exportStar =
  (this && this.__exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
        __createBinding(exports, m, p);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeStrategyInsights =
  exports.getStrategyInsights =
  exports.analyzeStrategy =
  exports.analyzeStrategyFactors =
  exports.calculateCompetitiveAdvantage =
  exports.calculateImplementationComplexity =
  exports.estimateTimeToResults =
  exports.customizeMetrics =
  exports.customizeROI =
  exports.customizeDescription =
  exports.customizeTitle =
  exports.highRiskStrategies =
  exports.mediumRiskStrategies =
  exports.lowRiskStrategies =
    void 0;
// Re-export everything from the consultation module
__exportStar(require("./consultation"), exports);
// Export our enhanced risk-adjusted strategy tools
__exportStar(require("./riskEngine"), exports);
// Import the strategy templates from the correct location
var strategyTemplates_1 = require("./strategy/strategyTemplates");
Object.defineProperty(exports, "lowRiskStrategies", {
  enumerable: true,
  get: function () {
    return strategyTemplates_1.lowRiskStrategies;
  },
});
Object.defineProperty(exports, "mediumRiskStrategies", {
  enumerable: true,
  get: function () {
    return strategyTemplates_1.mediumRiskStrategies;
  },
});
Object.defineProperty(exports, "highRiskStrategies", {
  enumerable: true,
  get: function () {
    return strategyTemplates_1.highRiskStrategies;
  },
});
// Re-export from strategy module excluding functions we want to rename
var strategy_1 = require("./strategy");
// Fix: Import the correct functions or create them if they don't exist
// generateCustomizedStrategy,
// generateStrategy, - removing this since it doesn't exist
Object.defineProperty(exports, "customizeTitle", {
  enumerable: true,
  get: function () {
    return strategy_1.customizeTitle;
  },
});
Object.defineProperty(exports, "customizeDescription", {
  enumerable: true,
  get: function () {
    return strategy_1.customizeDescription;
  },
});
Object.defineProperty(exports, "customizeROI", {
  enumerable: true,
  get: function () {
    return strategy_1.customizeROI;
  },
});
Object.defineProperty(exports, "customizeMetrics", {
  enumerable: true,
  get: function () {
    return strategy_1.customizeMetrics;
  },
});
// Re-export functions from strategyInsights with their original names
var strategyInsights_1 = require("./strategyInsights");
Object.defineProperty(exports, "estimateTimeToResults", {
  enumerable: true,
  get: function () {
    return strategyInsights_1.estimateTimeToResults;
  },
});
Object.defineProperty(exports, "calculateImplementationComplexity", {
  enumerable: true,
  get: function () {
    return strategyInsights_1.calculateImplementationComplexity;
  },
});
Object.defineProperty(exports, "calculateCompetitiveAdvantage", {
  enumerable: true,
  get: function () {
    return strategyInsights_1.calculateCompetitiveAdvantage;
  },
});
Object.defineProperty(exports, "analyzeStrategyFactors", {
  enumerable: true,
  get: function () {
    return strategyInsights_1.analyzeStrategyFactors;
  },
});
Object.defineProperty(exports, "analyzeStrategy", {
  enumerable: true,
  get: function () {
    return strategyInsights_1.analyzeStrategy;
  },
});
Object.defineProperty(exports, "getStrategyInsights", {
  enumerable: true,
  get: function () {
    return strategyInsights_1.getStrategyInsights;
  },
});
// Re-export analyzeStrategy with a different name to avoid conflicts
var strategyInsights_2 = require("./strategyInsights");
Object.defineProperty(exports, "analyzeStrategyInsights", {
  enumerable: true,
  get: function () {
    return strategyInsights_2.analyzeStrategy;
  },
});
