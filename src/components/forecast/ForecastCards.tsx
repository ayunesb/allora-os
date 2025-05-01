
import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metric } from "@/components/ui/metric";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface ForecastCardProps {
  title: string;
  current: number;
  forecast: number;
  description: string;
}

const ForecastCard = ({ title, current, forecast, description }: ForecastCardProps) => {
  const ratio = forecast / current;

  const getVariant = useCallback((ratio: number) => {
    if (ratio >= 1) return "success";
    if (ratio >= 0.7) return "secondary";
    if (ratio >= 0.5) return "outline";
    return "destructive";  // Use only valid variants
  }, []);

  const variant = getVariant(ratio);

  const getIcon = useCallback((ratio: number) => {
    if (ratio > 1) return <ArrowUp className="h-4 w-4 text-green-500" />;
    if (ratio < 1) return <ArrowDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  }, []);

  const icon = getIcon(ratio);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2">
          <Metric>{forecast}</Metric>
          {icon}
        </div>
        <Progress value={ratio * 100} variant={variant} className="mt-2" />
        <p className="text-sm text-muted-foreground mt-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

interface ForecastCardsProps {
  forecasts: any;
  kpiData: any;
  anomalies: any;
  kpiNames: Record<string, string>;
}

const ForecastCards = ({ forecasts, kpiData, anomalies, kpiNames }: ForecastCardsProps) => {
  if (!forecasts || !kpiData) {
    return <div className="grid gap-4">Loading forecast data...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.keys(forecasts).map((key) => {
        const current = kpiData[key]?.value || 1;
        const forecast = forecasts[key]?.value || 0;
        const hasAnomaly = anomalies.some((a: any) => a.kpi === key);

        return (
          <ForecastCard
            key={key}
            title={kpiNames[key] || key}
            current={current}
            forecast={forecast}
            description={hasAnomaly ? "Anomaly detected" : "Forecast on track"}
          />
        );
      })}
    </div>
  );
};

export default ForecastCards;
