import React from "react";
import { Anomaly } from "@/agents/anomalyDetector";
interface ForecastAnomaliesProps {
  anomalies: Anomaly[];
  recommendations: Record<string, string>;
  kpiNames: Record<string, string>;
}
declare const ForecastAnomalies: React.FC<ForecastAnomaliesProps>;
export default ForecastAnomalies;
