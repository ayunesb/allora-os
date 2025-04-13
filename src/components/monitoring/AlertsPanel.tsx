
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, monitoring, AlertSeverity } from '@/utils/monitoring';
import { Info, AlertTriangle, AlertCircle, BellRing, X, RefreshCw } from 'lucide-react';

interface AlertsPanelProps {
  maxAlerts?: number;
  severity?: AlertSeverity | 'all';
}

export default function AlertsPanel({ maxAlerts = 5, severity = 'all' }: AlertsPanelProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAlerts = () => {
      setIsLoading(true);
      
      let alertsList: Alert[];
      if (severity === 'all') {
        alertsList = monitoring.getRecentAlerts(maxAlerts);
      } else {
        alertsList = monitoring.getAlerts(severity as AlertSeverity).slice(0, maxAlerts);
      }
      
      setAlerts(alertsList);
      setIsLoading(false);
    };
    
    loadAlerts();
    
    // Subscribe to alert updates
    const unsubscribe = monitoring.addListener((updatedAlerts) => {
      if (severity === 'all') {
        setAlerts(updatedAlerts.slice(0, maxAlerts));
      } else {
        setAlerts(
          updatedAlerts
            .filter(alert => alert.severity === severity)
            .slice(0, maxAlerts)
        );
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [maxAlerts, severity]);

  const getSeverityIcon = (alertSeverity: AlertSeverity) => {
    switch (alertSeverity) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-700" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSeverityClass = (alertSeverity: AlertSeverity) => {
    switch (alertSeverity) {
      case 'info':
        return 'bg-blue-50 border-blue-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'critical':
        return 'bg-red-100 border-red-300';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const handleDismiss = (alertId: string) => {
    monitoring.dismissAlert(alertId);
  };

  const refreshAlerts = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let alertsList: Alert[];
      if (severity === 'all') {
        alertsList = monitoring.getRecentAlerts(maxAlerts);
      } else {
        alertsList = monitoring.getAlerts(severity as AlertSeverity).slice(0, maxAlerts);
      }
      
      setAlerts(alertsList);
      setIsLoading(false);
    }, 500);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <RefreshCw className="h-6 w-6 text-muted-foreground animate-spin" />
      </div>
    );
  }

  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center">
        <BellRing className="h-10 w-10 text-muted-foreground opacity-20 mb-3" />
        <p className="text-muted-foreground">No alerts to display</p>
        <Button 
          variant="ghost" 
          size="sm" 
          className="mt-3"
          onClick={refreshAlerts}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshAlerts}
          className="gap-1"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </Button>
      </div>
      
      <ScrollArea className="h-[320px]">
        <div className="space-y-2">
          {alerts.map((alert) => (
            <Card 
              key={alert.id} 
              className={`border overflow-hidden ${getSeverityClass(alert.severity)}`}
            >
              <div className={`h-1 w-full ${
                alert.severity === 'info' ? 'bg-blue-500' : 
                alert.severity === 'warning' ? 'bg-amber-500' : 
                alert.severity === 'error' ? 'bg-red-500' : 
                'bg-red-700'
              }`} />
              <CardContent className="p-3 pt-3">
                <div className="flex justify-between items-start">
                  <div className="flex gap-2">
                    <div className="flex-shrink-0 mt-0.5">
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div>
                      <div className="font-medium">{alert.title}</div>
                      <div className="text-sm text-muted-foreground">{alert.message}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {alert.timestamp.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => handleDismiss(alert.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
