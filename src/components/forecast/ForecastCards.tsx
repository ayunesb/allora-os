// Find the problematic line and replace 'warning' with 'secondary'
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon, AlertTriangle } from "lucide-react";

interface ForecastItem {
  kpi: string;
  current: number;
  predicted: number;
  trend: 'up' | 'down' | 'stable';
  anomaly: 'none' | 'minor' | 'critical';
}

interface ForecastCardsProps {
  forecasts: ForecastItem[];
}

export const ForecastCards: React.FC<ForecastCardsProps> = ({ forecasts }) => {
  const getTrendIcon = (trend: string) => {
    if (trend === 'up') {
      return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
    } else if (trend === 'down') {
      return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const getAnomalyIcon = (anomaly: string) => {
    if (anomaly === 'critical') {
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  const getVariant = (anomaly: string) => {
    if (anomaly === 'critical') {
      return 'destructive';
    }
    // Change 'warning' to 'secondary' since 'warning' isn't a valid variant
    return 'secondary'; // previously 'warning'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {forecasts.map((forecast, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              {forecast.kpi}
              {forecast.anomaly !== 'none' && (
                <Badge variant={getVariant(forecast.anomaly)}>
                  {forecast.anomaly} {getAnomalyIcon(forecast.anomaly)}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current</p>
                <p className="text-lg font-bold">{forecast.current}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Predicted</p>
                <p className="text-lg font-bold">{forecast.predicted}</p>
              </div>
            </div>
            {forecast.trend && (
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                Trend: {getTrendIcon(forecast.trend)} {forecast.trend}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ForecastCards;
