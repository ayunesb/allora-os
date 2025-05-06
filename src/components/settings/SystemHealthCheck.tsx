import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, CircleAlert, AlertOctagon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { checkSystemHealth } from "@/utils/monitoring"; // Ensure this utility exists
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
export function SystemHealthCheck() {
  const [healthCheck, setHealthCheck] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  useEffect(() => {
    // Run initial health check when component mounts
    runHealthCheck();
  }, []);
  const runHealthCheck = async () => {
    setLoading(true);
    try {
      const result = await checkSystemHealth();
      setHealthCheck(result);
      setLastChecked(new Date());
      // Provide toast notification based on system status
      if (result.status === "unhealthy") {
        toast.error("System health issues detected. Please review.");
      } else if (result.status === "degraded") {
        toast.warning("Some system services are experiencing issues.");
      } else {
        toast.success("System is up to date and running smoothly.");
      }
    } catch (error) {
      console.error("Health check failed:", error);
      toast.error("Failed to perform system health check.");
    } finally {
      setLoading(false);
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "healthy":
        return <CircleCheck className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <CircleAlert className="h-5 w-5 text-amber-500" />;
      case "unhealthy":
        return <AlertOctagon className="h-5 w-5 text-destructive" />;
    }
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "healthy":
        return <Badge className="bg-green-500">Healthy</Badge>;
      case "degraded":
        return <Badge className="bg-amber-500">Degraded</Badge>;
      case "unhealthy":
        return <Badge variant="destructive">Unhealthy</Badge>;
    }
  };
  if (!healthCheck) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center py-12">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>System Status</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={runHealthCheck}
            disabled={loading}
          >
            {loading ? "Checking..." : "Refresh Status"}
          </Button>
        </div>
        <CardDescription>
          Real-time monitoring of system services and overall health
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                Last checked:{" "}
                {lastChecked ? lastChecked.toLocaleTimeString() : "Never"}
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium text-sm">Service Status</h4>
            <div className="grid gap-2">
              {Object.entries(healthCheck.services).map(
                ([serviceName, serviceHealth]) => (
                  <div
                    key={serviceName}
                    className="flex items-center justify-between py-1"
                  >
                    <div className="flex items-center gap-2">
                      {getStatusIcon(serviceHealth.status)}
                      <span className="capitalize">{serviceName}</span>
                    </div>
                    {getStatusBadge(serviceHealth.status)}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
