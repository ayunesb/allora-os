import React from "react";
interface ForecastChartsProps {
  forecasts: Record<string, number>;
  kpiData: Record<string, number[]>;
  kpiNames: Record<string, string>;
}
declare const ForecastCharts: React.FC<ForecastChartsProps>;
export default ForecastCharts;
