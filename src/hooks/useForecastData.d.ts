import { Anomaly } from "@/agents/anomalyDetector";
export declare function useForecastData(): {
  kpiData: Record<string, number[]>;
  forecasts: Record<string, number>;
  anomalies: Anomaly[];
  recommendations: Record<string, string>;
  loading: boolean;
  refreshing: boolean;
  handleRefresh: () => void;
};
