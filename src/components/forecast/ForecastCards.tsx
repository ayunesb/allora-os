import React, { useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metric } from "@/components/ui/metric";
import { Progress } from "@/components/ui/progress";
import { TrendUp, TrendDown, Equal } from "lucide-react";

interface ForecastCardProps {
  title: string;
  current: number;
  forecast: number;
  description: string;
}

export function ForecastCards({ title, current, forecast, description }: ForecastCardProps) {
  const ratio = forecast / current;

  const getVariant = useCallback((ratio: number) => {
    if (ratio >= 1) return "success";
    if (ratio >= 0.7) return "secondary";
    if (ratio >= 0.5) return "outline";
    return "destructive";  // was "destructive" | "warning" but "warning" is not a valid variant
  }, []);

  const variant = getVariant(ratio);

  const getIcon = useCallback((ratio: number) => {
    if (ratio > 1) return <TrendUp className="h-4 w-4 text-green-500" />;
    if (ratio < 1) return <TrendDown className="h-4 w-4 text-red-500" />;
    return <Equal className="h-4 w-4 text-gray-500" />;
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
}
