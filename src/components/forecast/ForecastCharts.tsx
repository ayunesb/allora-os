
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartDataPoint {
  period: string;
  value: number;
  isForecast?: boolean;
}

interface ForecastChartsProps {
  forecasts: Record<string, number>;
  kpiData: Record<string, number[]>;
  kpiNames: Record<string, string>;
}

const ForecastCharts: React.FC<ForecastChartsProps> = ({ 
  forecasts, 
  kpiData,
  kpiNames
}) => {
  // Format data for charts
  const getChartData = (kpiType: string): ChartDataPoint[] => {
    const data = kpiData[kpiType] || [];
    const chartData: ChartDataPoint[] = data.map((value, index) => ({
      period: `Period ${index + 1}`,
      value
    }));
    
    // Add forecast point if available
    if (forecasts[kpiType]) {
      chartData.push({
        period: `Forecast`,
        value: forecasts[kpiType],
        isForecast: true
      });
    }
    
    return chartData;
  };

  return (
    <div className="grid gap-6">
      {Object.keys(forecasts).map((kpi) => {
        const chartData = getChartData(kpi);
        return (
          <Card key={kpi}>
            <CardHeader>
              <CardTitle>{kpiNames[kpi] || kpi}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-60">
                {/* Placeholder for chart - in a real implementation we would use recharts */}
                <div className="bg-gray-100 dark:bg-gray-800 h-full w-full rounded flex items-center justify-center">
                  <p>Chart visualization for {kpiNames[kpi] || kpi}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ForecastCharts;
