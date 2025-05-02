
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPIMetric } from '@/types/unified-types';
import { formatDate } from '@/utils/exportUtils';
import { Skeleton } from '@/components/ui/skeleton';

interface KPITrackerProps {
  metrics: KPIMetric[];
  isLoading?: boolean;
}

export function KPITracker({ metrics, isLoading = false }: KPITrackerProps) {
  // Group metrics by type
  const metricsByType: Record<string, KPIMetric[]> = {};
  
  if (!isLoading && metrics.length > 0) {
    metrics.forEach(metric => {
      if (!metricsByType[metric.type]) {
        metricsByType[metric.type] = [];
      }
      metricsByType[metric.type].push(metric);
    });
  }
  
  // Calculate trends for each metric type
  const calculateTrend = (metrics: KPIMetric[]) => {
    if (metrics.length < 2) return { percentage: 0, isPositive: true };
    
    const sortedMetrics = [...metrics].sort((a, b) => 
      new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
    );
    
    const current = sortedMetrics[0].value;
    const previous = sortedMetrics[1].value;
    
    if (previous === 0) return { percentage: 0, isPositive: true };
    
    const percentage = ((current - previous) / previous) * 100;
    return {
      percentage: Math.abs(Math.round(percentage * 10) / 10),
      isPositive: percentage >= 0
    };
  };
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-1/3 mb-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-1/4 mb-4" />
              <Skeleton className="h-4 w-2/5" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (!metrics.length) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">
            No KPI metrics available. Metrics will appear here as they are recorded.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(metricsByType).map(([type, typeMetrics]) => {
        const latestMetric = typeMetrics[0];
        const trend = calculateTrend(typeMetrics);
        
        return (
          <Card key={type} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg capitalize">{type}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-3xl font-bold">
                    {type.includes('percentage') 
                      ? `${latestMetric.value.toFixed(1)}%` 
                      : latestMetric.value.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Last updated: {formatDate(latestMetric.recorded_at)}
                  </p>
                </div>
                
                {typeMetrics.length > 1 && (
                  <div className={`text-sm font-medium flex items-center ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {trend.isPositive ? '↑' : '↓'} {trend.percentage}%
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
