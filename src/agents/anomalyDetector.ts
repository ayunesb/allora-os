import { loggingService } from "../utils/loggingService";

/**
 * Interface for anomaly detection thresholds
 */
export interface ThresholdConfig {
  min: number;
  max: number;
}

/**
 * Interface for detected anomaly
 */
export interface Anomaly {
  kpi: string;
  value: number;
  issue: "Too Low" | "Too High";
  severity: "warning" | "critical";
}

/**
 * Detects anomalies in KPI forecasts based on configured thresholds
 *
 * @param forecasts Record of KPI types to their forecasted values
 * @param thresholds Record of KPI types to their threshold configurations
 * @returns Array of detected anomalies
 */
export function detectAnomalies(
  forecasts: Record<string, number>,
  thresholds: Record<string, ThresholdConfig>,
): Anomaly[] {
  try {
    const anomalies: Anomaly[] = [];

    for (const kpi in forecasts) {
      const value = forecasts[kpi];
      const { min, max } = thresholds[kpi] || { min: -Infinity, max: Infinity };

      // Check if value is outside of acceptable thresholds
      if (value < min || value > max) {
        // Determine the severity based on how far the value is from the threshold
        const minThreshold = min === -Infinity ? 0 : min;
        const maxThreshold = max === Infinity ? value * 2 : max;
        const range = maxThreshold - minThreshold;
        const deviation =
          value < min ? (min - value) / range : (value - max) / range;

        const anomaly: Anomaly = {
          kpi,
          value,
          issue: value < min ? "Too Low" : "Too High",
          severity: deviation > 0.3 ? "critical" : "warning",
        };

        anomalies.push(anomaly);
        logger.warn(`Anomaly detected for ${kpi}: ${anomaly.issue} (${value})`);
      }
    }

    return anomalies;
  } catch (error) {
    logger.error("Error detecting anomalies:", error);
    return [];
  }
}

/**
 * Get descriptive recommendations based on detected anomalies
 *
 * @param anomalies Array of detected anomalies
 * @returns Record of KPI types to their action recommendations
 */
export function getAnomalyRecommendations(
  anomalies: Anomaly[],
): Record<string, string> {
  const recommendations: Record<string, string> = {};

  for (const anomaly of anomalies) {
    const { kpi, issue, value } = anomaly;

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
            ? `Investigate factors contributing to low ${kpi} value of ${value.toFixed(2)}`
            : `Analyze reasons behind high ${kpi} value of ${value.toFixed(2)}`;
    }
  }

  return recommendations;
}
