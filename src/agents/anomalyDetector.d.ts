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
export declare function detectAnomalies(forecasts: Record<string, number>, thresholds: Record<string, ThresholdConfig>): Anomaly[];
/**
 * Get descriptive recommendations based on detected anomalies
 *
 * @param anomalies Array of detected anomalies
 * @returns Record of KPI types to their action recommendations
 */
export declare function getAnomalyRecommendations(anomalies: Anomaly[]): Record<string, string>;
