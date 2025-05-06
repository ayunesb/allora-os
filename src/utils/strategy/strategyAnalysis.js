"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeStrategy = analyzeStrategy;
exports.analyzeStrategyFactors = analyzeStrategyFactors;
exports.calculateImplementationComplexity = calculateImplementationComplexity;
exports.calculateCompetitiveAdvantage = calculateCompetitiveAdvantage;
exports.estimateTimeToResults = estimateTimeToResults;
function analyzeStrategy(strategy) {
  // Get key aspects from strategy
  var title = strategy.title;
  var description = strategy.description;
  var actions = strategy.keyActions || [];
  var objectives = strategy.successMetrics || [];
  var marketFit = evaluateMarketFit(strategy);
  // Analyze strengths and weaknesses
  var strengths = identifyStrengths(strategy);
  var weaknesses = identifyWeaknesses(strategy);
  // Implementation analysis
  var implementationSteps = generateImplementationSteps(strategy);
  var timeToMarket = estimateTimeToMarket(strategy);
  var complexity = evaluateComplexity(strategy);
  // Competitive analysis
  var competitiveAdvantage = evaluateCompetitiveAdvantage(strategy);
  return {
    title: title,
    description: description,
    marketFit: marketFit,
    strengths: strengths,
    weaknesses: weaknesses,
    implementationSteps: implementationSteps,
    timeToMarket: timeToMarket,
    complexity: complexity,
    competitiveAdvantage: competitiveAdvantage,
    objectives: objectives,
    actions: actions,
  };
}
function evaluateMarketFit(strategy) {
  // Implementation would analyze the strategy against market trends
  // This is a simplified version
  var riskLevel = strategy.riskLevel;
  if (riskLevel === "High") {
    return "High potential return but requires strong market positioning";
  } else if (riskLevel === "Medium") {
    return "Good market alignment with moderate competition";
  } else {
    return "Strong fit for established markets with lower disruption risk";
  }
}
function identifyStrengths(strategy) {
  // In a real implementation, this would analyze the strategy text
  // and extract strengths based on NLP or predefined criteria
  // Sample implementation
  var strengths = [];
  if (strategy.riskLevel === "Low") {
    strengths.push({
      description: "Lower resource requirements",
      impact: "medium",
    });
    strengths.push({
      description: "Higher probability of success",
      impact: "high",
    });
  } else if (strategy.riskLevel === "High") {
    strengths.push({
      description: "Potential for market disruption",
      impact: "high",
    });
    strengths.push({
      description: "First-mover advantage opportunity",
      impact: "high",
    });
  }
  // Add general strengths based on strategy content
  strengths.push({
    description: "Aligned with organizational capabilities",
    impact: "medium",
  });
  return strengths;
}
function identifyWeaknesses(strategy) {
  // Similarly, this would use more sophisticated analysis in production
  var weaknesses = [];
  if (strategy.riskLevel === "Low") {
    weaknesses.push({
      description: "Limited growth potential",
      risk: "medium",
    });
    weaknesses.push({
      description: "May fall behind more innovative competitors",
      risk: "high",
    });
  } else if (strategy.riskLevel === "High") {
    weaknesses.push({
      description: "Higher resource requirements",
      risk: "high",
    });
    weaknesses.push({
      description: "Increased failure risk",
      risk: "high",
    });
  }
  return weaknesses;
}
function generateImplementationSteps(strategy) {
  // Convert strategy actions to implementation steps
  var steps = [];
  // Use actions to generate implementation steps
  (strategy.keyActions || []).forEach(function (action, index) {
    var timeframe =
      index < 2 ? "1-3 months" : index < 4 ? "4-6 months" : "7-12 months";
    var complexity =
      index % 3 === 0 ? "high" : index % 2 === 0 ? "medium" : "low";
    steps.push({
      description: action.title,
      timeframe: timeframe,
      complexity: complexity,
    });
  });
  return steps;
}
function estimateTimeToMarket(strategy) {
  // Based on risk level and complexity
  if (strategy.riskLevel === "High") {
    return "6-9 months (requires aggressive timeline)";
  } else if (strategy.riskLevel === "Medium") {
    return "9-12 months (standard implementation timeline)";
  } else {
    return "12-18 months (conservative approach with lower risk)";
  }
}
function evaluateComplexity(strategy) {
  // Simplified complexity evaluation
  var actionsCount = (strategy.keyActions || []).length;
  var objectivesCount = (strategy.successMetrics || []).length;
  if (actionsCount > 5 || strategy.riskLevel === "High") {
    return "high";
  } else if (actionsCount > 3 || objectivesCount > 3) {
    return "medium";
  } else {
    return "low";
  }
}
function evaluateCompetitiveAdvantage(strategy) {
  // In real implementation, this would compare against market data
  if (strategy.riskLevel === "High") {
    return "Potential for significant differentiation if successfully executed";
  } else if (strategy.riskLevel === "Medium") {
    return "Moderate competitive advantage with less risk exposure";
  } else {
    return "Incremental improvement over current market offerings";
  }
}
// Add the missing exports needed by strategyInsights.ts
function analyzeStrategyFactors(strategy, riskProfile) {
  var strengths = identifyStrengths(strategy).map(function (s) {
    return s.description;
  });
  var weaknesses = identifyWeaknesses(strategy).map(function (w) {
    return w.description;
  });
  var keySuccessFactors = [
    "Clear strategic alignment",
    "Effective resource allocation",
    "Strong leadership commitment",
  ];
  return {
    strengths: strengths,
    weaknesses: weaknesses,
    keySuccessFactors: keySuccessFactors,
  };
}
function calculateImplementationComplexity(strategy, assessmentInput) {
  var complexityLevel = evaluateComplexity(strategy);
  var score =
    complexityLevel === "high" ? 80 : complexityLevel === "medium" ? 50 : 30;
  var factors = [
    "Technical implementation requirements",
    "Organizational change management needs",
    "Resource allocation challenges",
  ];
  return { score: score, factors: factors };
}
function calculateCompetitiveAdvantage(strategy, riskProfile) {
  var advantageDescription = evaluateCompetitiveAdvantage(strategy);
  var score =
    strategy.riskLevel === "High"
      ? 85
      : strategy.riskLevel === "Medium"
        ? 65
        : 45;
  var factors = [
    "Market positioning strength",
    "Unique value proposition",
    "Competitor response readiness",
  ];
  return { score: score, factors: factors };
}
function estimateTimeToResults(strategy, riskProfile) {
  var timeframe = estimateTimeToMarket(strategy);
  var confidenceLevel =
    strategy.riskLevel === "Low"
      ? "High"
      : strategy.riskLevel === "Medium"
        ? "Medium"
        : "Low";
  var milestones = [
    { description: "Initial implementation complete", timeframe: "3 months" },
    { description: "First results measurable", timeframe: "6 months" },
    { description: "Full strategy impact realized", timeframe: "12-18 months" },
  ];
  return {
    timeframe: timeframe,
    confidenceLevel: confidenceLevel,
    milestones: milestones,
  };
}
