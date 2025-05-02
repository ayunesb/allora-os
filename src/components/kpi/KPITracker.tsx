
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react";
import { Metric } from "@/components/ui/metric";
import { Progress } from "@/components/ui/progress";
import { KPIMetric } from "@/types/unified-types";

interface KPITrackerProps {
  metrics: KPIMetric[];
  isLoading?: boolean;
}

export function KPITracker({ metrics, isLoading = false }: KPITrackerProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/3 mb-2"></div>
              <div className="h-2 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/4 mt-2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!metrics || metrics.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No KPI metrics available</p>
      </Card>
    );
  }

  const formatMetricValue = (value: number, type: string) => {
    if (type === 'mrr' || type === 'revenue') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    }
    
    if (type === 'percentage' || type.includes('rate')) {
      return `${value.toFixed(1)}%`;
    }
    
    return value.toLocaleString();
  };

  const getMetricLabel = (type: string): string => {
    const labels: Record<string, string> = {
      mrr: 'Monthly Recurring Revenue',
      leads: 'New Leads',
      churn_rate: 'Churn Rate',
      conversion_rate: 'Conversion Rate',
      roi: 'Return on Investment',
      cac: 'Customer Acquisition Cost',
      ltv: 'Lifetime Value',
      active_users: 'Active Users',
      campaigns: 'Active Campaigns'
    };
    
    return labels[type.toLowerCase()] || type;
  };

  // Group metrics by type to show the most recent value
  const latestMetrics = metrics.reduce((acc, metric) => {
    const existingMetric = acc[metric.type];
    
    if (!existingMetric || new Date(metric.recorded_at) > new Date(existingMetric.recorded_at)) {
      acc[metric.type] = metric;
    }
    
    return acc;
  }, {} as Record<string, KPIMetric>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.values(latestMetrics).map((metric) => {
        // For simplicity, let's generate a random delta for demo purposes
        // In a real app, you would calculate this from historical data
        const delta = Math.floor(Math.random() * 20) - 10;
        const isDeltaPositive = delta > 0;
        const isDeltaNeutral = delta === 0;
        
        return (
          <Card key={metric.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {getMetricLabel(metric.type)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <Metric className="text-3xl font-bold">
                  {formatMetricValue(metric.value, metric.type)}
                </Metric>
                <div className={`flex items-center text-sm ${isDeltaPositive ? 'text-green-600' : isDeltaNeutral ? 'text-gray-500' : 'text-red-600'}`}>
                  {isDeltaPositive ? (
                    <ArrowUpIcon className="h-4 w-4 mr-1" />
                  ) : isDeltaNeutral ? (
                    <MinusIcon className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 mr-1" />
                  )}
                  <span>{Math.abs(delta)}%</span>
                </div>
              </div>
              
              <Progress 
                value={Math.min(100, (metric.value / (metric.value * 2)) * 100)} 
                className="h-2 mt-2"
              />
              
              <p className="text-xs text-muted-foreground mt-2">
                Last updated: {new Date(metric.recorded_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
