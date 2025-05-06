"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRiskScore =
  exports.assessRiskLevel =
  exports.weightedRiskFactors =
    void 0;
exports.weightedRiskFactors = {
  ambition: 0.25,
  budget: 0.2,
  timeframe: 0.15,
  marketVolatility: 0.1,
  competitionIntensity: 0.1,
  organizationalReadiness: 0.1,
  innovationCapacity: 0.05,
  regulatoryConstraints: 0.05,
};
var assessRiskLevel = function (answers) {
  var score = (0, exports.calculateRiskScore)(answers).score;
  if (score <= 2.5) return "Low";
  if (score <= 3.5) return "Medium";
  return "High";
};
exports.assessRiskLevel = assessRiskLevel;
var calculateRiskScore = function (answers) {
  // Initialize variables
  var totalScore = 0;
  var totalWeight = 0;
  var breakdown = {};
  // Calculate core factors (required)
  var coreFactors = {
    ambition: {
      value: answers.ambition,
      weight: exports.weightedRiskFactors.ambition,
    },
    budget: {
      value: answers.budget,
      weight: exports.weightedRiskFactors.budget,
    },
    timeframe: {
      value: answers.timeframe,
      weight: exports.weightedRiskFactors.timeframe,
    },
  };
  // Calculate weighted score for core factors
  for (var _i = 0, _a = Object.entries(coreFactors); _i < _a.length; _i++) {
    var _b = _a[_i],
      name_1 = _b[0],
      _c = _b[1],
      value = _c.value,
      weight = _c.weight;
    var contribution = value * weight;
    totalScore += contribution;
    totalWeight += weight;
    breakdown[name_1] = {
      contribution: contribution,
      percentage: 0, // Will calculate percentages after all factors are processed
    };
  }
  // Calculate additional factors (optional)
  var additionalFactors = {
    marketVolatility: {
      value: answers.marketVolatility,
      weight: exports.weightedRiskFactors.marketVolatility,
    },
    competitionIntensity: {
      value: answers.competitionIntensity,
      weight: exports.weightedRiskFactors.competitionIntensity,
    },
    organizationalReadiness: {
      value: answers.organizationalReadiness,
      weight: exports.weightedRiskFactors.organizationalReadiness,
    },
    innovationCapacity: {
      value: answers.innovationCapacity,
      weight: exports.weightedRiskFactors.innovationCapacity,
    },
    regulatoryConstraints: {
      value: answers.regulatoryConstraints,
      weight: exports.weightedRiskFactors.regulatoryConstraints,
    },
  };
  // Add scores for available additional factors
  for (
    var _d = 0, _e = Object.entries(additionalFactors);
    _d < _e.length;
    _d++
  ) {
    var _f = _e[_d],
      name_2 = _f[0],
      _g = _f[1],
      value = _g.value,
      weight = _g.weight;
    if (value !== undefined) {
      var contribution = value * weight;
      totalScore += contribution;
      totalWeight += weight;
      breakdown[name_2] = {
        contribution: contribution,
        percentage: 0, // Will calculate percentages after all factors are processed
      };
    }
  }
  // Add custom factors if provided
  if (answers.customFactors && answers.customFactors.length > 0) {
    for (var _h = 0, _j = answers.customFactors; _h < _j.length; _h++) {
      var factor = _j[_h];
      var contribution = factor.score * factor.weight;
      totalScore += contribution;
      totalWeight += factor.weight;
      breakdown[factor.name] = {
        contribution: contribution,
        percentage: 0,
      };
    }
  }
  // Normalize the score if weights don't add up to 1
  var normalizedScore =
    totalWeight > 0 ? (totalScore / totalWeight) * 5 : totalScore;
  // Calculate percentage contributions
  for (var factor in breakdown) {
    breakdown[factor].percentage =
      (breakdown[factor].contribution / totalScore) * 100;
  }
  // Determine risk level
  var riskLevel;
  if (normalizedScore <= 2.5) riskLevel = "Low";
  else if (normalizedScore <= 3.5) riskLevel = "Medium";
  else riskLevel = "High";
  return {
    level: riskLevel,
    score: parseFloat(normalizedScore.toFixed(2)),
    breakdown: breakdown,
  };
};
exports.calculateRiskScore = calculateRiskScore;
