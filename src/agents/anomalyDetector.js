"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectAnomalies = detectAnomalies;
exports.getAnomalyRecommendations = getAnomalyRecommendations;
var loggingService_1 = require("@/utils/loggingService");
/**
 * Detects anomalies in KPI forecasts based on configured thresholds
 *
 * @param forecasts Record of KPI types to their forecasted values
 * @param thresholds Record of KPI types to their threshold configurations
 * @returns Array of detected anomalies
 */
function detectAnomalies(forecasts, thresholds) {
  try {
    var anomalies = [];
    for (var kpi in forecasts) {
      var value = forecasts[kpi];
      var _a = thresholds[kpi] || { min: -Infinity, max: Infinity },
        min = _a.min,
        max = _a.max;
      // Check if value is outside of acceptable thresholds
      if (value < min || value > max) {
        // Determine the severity based on how far the value is from the threshold
        var minThreshold = min === -Infinity ? 0 : min;
        var maxThreshold = max === Infinity ? value * 2 : max;
        var range = maxThreshold - minThreshold;
        var deviation =
          value < min ? (min - value) / range : (value - max) / range;
        var anomaly = {
          kpi: kpi,
          value: value,
          issue: value < min ? "Too Low" : "Too High",
          severity: deviation > 0.3 ? "critical" : "warning",
        };
        anomalies.push(anomaly);
        loggingService_1.logger.warn(
          "Anomaly detected for "
            .concat(kpi, ": ")
            .concat(anomaly.issue, " (")
            .concat(value, ")"),
        );
      }
    }
    return anomalies;
  } catch (error) {
    loggingService_1.logger.error("Error detecting anomalies:", error);
    return [];
  }
}
/**
 * Get descriptive recommendations based on detected anomalies
 *
 * @param anomalies Array of detected anomalies
 * @returns Record of KPI types to their action recommendations
 */
function getAnomalyRecommendations(anomalies) {
  var recommendations = {};
  for (var _i = 0, anomalies_1 = anomalies; _i < anomalies_1.length; _i++) {
    var anomaly = anomalies_1[_i];
    var kpi = anomaly.kpi,
      issue = anomaly.issue,
      value = anomaly.value;
    switch (kpi) {
      case "revenue":
        recommendations[kpi] =
          issue === "Too Low"
            ? "Consider launching a promotion or expanding marketing efforts"
            : "Analyze sudden revenue increase for sustainability";
        break;
      case "churn":
        recommendations[kpi] =
          issue === "Too High"
            ? "Investigate customer satisfaction and implement retention strategies"
            : "Document recent retention successes for future reference";
        break;
      case "user_growth":
        recommendations[kpi] =
          issue === "Too Low"
            ? "Evaluate acquisition channels and consider new growth strategies"
            : "Prepare infrastructure for higher than expected demand";
        break;
      case "retention":
        recommendations[kpi] =
          issue === "Too Low"
            ? "Implement engagement campaigns and review product experience"
            : "Document successful retention strategies for future reference";
        break;
      default:
        recommendations[kpi] =
          issue === "Too Low"
            ? "Investigate factors contributing to low "
                .concat(kpi, " value of ")
                .concat(value.toFixed(2))
            : "Analyze reasons behind high "
                .concat(kpi, " value of ")
                .concat(value.toFixed(2));
    }
  }
  return recommendations;
}
