
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleAlert, AlertOctagon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HealthCheckResult, ServiceHealth, checkSystemHealth, monitoring } from "@/utils/monitoring";
import { Separator } from "@/components/ui/separator";

export function SystemHealthCheck() {
  const [healthCheck, setHealthCheck] = useState<HealthCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    // Run a health check when the component mounts
    runHealthCheck();

    // Subscribe to health check updates
    const unsubscribe = monitoring.addHealthCheckListener((health) => {
      setHealthCheck(health);
      setLastChecked(new Date());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const runHealthCheck = async () => {
    setLoading(true);
    try {
      const result = await checkSystemHealth();
      setHealthCheck(result);
      setLastChecked(new Date());
    } catch (error) {
      console.error("Health check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: 'healthy' | 'unhealthy' | 'degraded') => {
    switch (status) {
      case 'healthy':
        return <CircleCheck className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <CircleAlert className="h-5 w-5 text-amber-500" />;
      case 'unhealthy':
        return <AlertOctagon className="h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: 'healthy' | 'unhealthy' | 'degraded') => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-500">Healthy</Badge>;
      case 'degraded':
        return <Badge className="bg-amber-500">Degraded</Badge>;
      case 'unhealthy':
        return <Badge variant="destructive">Unhealthy</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatResponseTime = (timeMs?: number) => {
    if (timeMs === undefined) return '—';
    return `${timeMs.toFixed(0)}ms`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>System Health</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={runHealthCheck}
            disabled={loading}
          >
            {loading ? "Checking..." : "Run Health Check"}
          </Button>
        </div>
        <CardDescription>
          Monitor platform health and service status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {healthCheck ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon(healthCheck.status)}
                <span className="font-medium">Overall Status:</span>
                {getStatusBadge(healthCheck.status)}
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>
                  Last checked: {lastChecked ? new Date(lastChecked).toLocaleTimeString() : 'Never'}
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Services</h4>
              <div className="grid gap-2">
                {Object.entries(healthCheck.services).map(([serviceName, serviceHealth]) => (
                  <div key={serviceName} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(serviceHealth.status)}
                      <span className="capitalize">{serviceName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {formatResponseTime(serviceHealth.responseTime)}
                      </span>
                      {getStatusBadge(serviceHealth.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted rounded-md p-3 text-xs space-y-2">
              <div className="flex justify-between">
                <span>Environment:</span>
                <span className="font-medium">{healthCheck.environment}</span>
              </div>
              {healthCheck.version && (
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span className="font-medium">{healthCheck.version}</span>
                </div>
              )}
              {healthCheck.uptime && (
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span className="font-medium">{Math.floor(healthCheck.uptime / 1000)} seconds</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            {loading ? (
              <p>Checking system health...</p>
            ) : (
              <p>No health check data available. Click "Run Health Check" to begin monitoring.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
