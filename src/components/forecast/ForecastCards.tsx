
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Anomaly } from "@/agents/anomalyDetector";

interface ForecastCardsProps {
  forecasts: Record<string, number>;
  kpiData: Record<string, number[]>;
  anomalies: Anomaly[];
  kpiNames: Record<string, string>;
}

const ForecastCards: React.FC<ForecastCardsProps> = ({ 
  forecasts, 
  kpiData, 
  anomalies,
  kpiNames
}) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Object.keys(forecasts).map((kpi) => {
        const isAnomaly = anomalies.some(a => a.kpi === kpi);
        const anomalyInfo = anomalies.find(a => a.kpi === kpi);
        
        return (
          <Card key={kpi} className={isAnomaly ? 'border-yellow-500/50' : ''}>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center text-lg">
                <span>{kpiNames[kpi] || kpi}</span>
                {isAnomaly && (
                  <Badge variant={anomalyInfo?.severity === "critical" ? "destructive" : "outline"}>
                    {anomalyInfo?.issue}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="text-2xl font-bold">
                  {kpi === 'churn' || kpi === 'retention' || kpi === 'conversion_rate'
                    ? `${(forecasts[kpi] * 100).toFixed(1)}%` 
                    : kpi === 'revenue' 
                      ? `$${Math.round(forecasts[kpi]).toLocaleString()}`
                      : Math.round(forecasts[kpi]).toLocaleString()
                  }
                </div>
                <div className="text-xs text-muted-foreground">
                  Based on {kpiData[kpi]?.length || 0} historical data points
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ForecastCards;
