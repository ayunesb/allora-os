import React from "react";
interface AnalyticsChartProps {
  title: string;
  description: string;
  chartType: "line" | "area" | "bar" | "pie" | "radialBar";
  data: any[];
  dataKeys: string[];
  colors: string[];
  xAxisDataKey?: string;
  nameKey?: string;
}
declare const AnalyticsChart: React.FC<AnalyticsChartProps>;
export default AnalyticsChart;
