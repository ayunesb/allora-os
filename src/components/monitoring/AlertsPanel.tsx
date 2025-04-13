
import React, { useState, useEffect } from 'react';
import { Alert } from '@/utils/monitoring';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert as AlertIcon, X, AlertTriangle, Info, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { monitoring } from '@/utils/monitoring';

interface AlertsPanelProps {
  maxAlerts?: number;
  showControls?: boolean;
  onAcknowledge?: (alertId: string) => void;
  className?: string;
}

export default function AlertsPanel({
  maxAlerts = 5,
  showControls = true,
  onAcknowledge,
  className = ''
}: AlertsPanelProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initial load of alerts
    setAlerts(monitoring.getAlerts().slice(0, maxAlerts));
    
    // Subscribe to new alerts
    const unsubscribe = monitoring.onAlert((alert) => {
      setAlerts(prevAlerts => {
        const newAlerts = [alert, ...prevAlerts].slice(0, maxAlerts);
        return newAlerts;
      });
      
      // Show toast for critical alerts
      if (alert.severity === 'critical') {
        toast({
          title: "Critical Alert",
          description: alert.message,
          variant: "destructive"
        });
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [maxAlerts, toast]);
  
  const handleAcknowledge = (alertId: string) => {
    monitoring.acknowledgeAlert(alertId);
    
    // Update our local state
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
    
    // Call handler if provided
    if (onAcknowledge) {
      onAcknowledge(alertId);
    }
  };
  
  const handleDismissAll = () => {
    alerts.forEach(alert => {
      if (!alert.acknowledged) {
        monitoring.acknowledgeAlert(alert.id);
      }
    });
    
    // Update local state
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => ({ ...alert, acknowledged: true }))
    );
  };
  
  // No alerts to show
  if (alerts.length === 0) {
    return null;
  }
  
  // Function to render the appropriate icon
  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertIcon className="h-5 w-5 text-red-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };
  
  // Function to get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'error':
        return 'bg-red-50 text-red-600 border-red-100';
      case 'warning':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'info':
      default:
        return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };
  
  // If collapsed, show a minimal version
  if (isCollapsed) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button 
          size="sm" 
          variant="outline" 
          className="rounded-full p-2" 
          onClick={() => setIsCollapsed(false)}
        >
          {getAlertIcon(alerts[0].severity)}
          <span className="ml-2">{alerts.length} Alert{alerts.length !== 1 ? 's' : ''}</span>
        </Button>
      </div>
    );
  }

  return (
    <Card className={`shadow-lg border-slate-200 ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <AlertIcon className="h-5 w-5 mr-2 text-red-500" />
            System Alerts
          </CardTitle>
          {showControls && (
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0" 
                onClick={() => setIsCollapsed(true)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Collapse</span>
              </Button>
            </div>
          )}
        </div>
        <CardDescription>
          {alerts.filter(a => !a.acknowledged).length} active alert{alerts.filter(a => !a.acknowledged).length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <Separator />
      <ScrollArea className="h-[250px]">
        <CardContent className="pt-3">
          <div className="space-y-3">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`rounded-md p-3 border ${
                  alert.acknowledged 
                    ? 'bg-gray-50 border-gray-200' 
                    : `bg-${alert.severity === 'critical' ? 'red' : 'amber'}-50 border-${alert.severity === 'critical' ? 'red' : 'amber'}-200`
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    {getAlertIcon(alert.severity)}
                    <div>
                      <h4 className={`font-medium ${alert.acknowledged ? 'text-gray-700' : 'text-gray-900'}`}>
                        {alert.title}
                      </h4>
                      <p className={`text-sm mt-0.5 ${alert.acknowledged ? 'text-gray-500' : 'text-gray-700'}`}>
                        {alert.message}
                      </p>
                    </div>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity}
                  </Badge>
                </div>
                <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                  <span>
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                  {!alert.acknowledged && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs"
                      onClick={() => handleAcknowledge(alert.id)}
                    >
                      <CheckCircle2 className="h-3 w-3 mr-1" /> 
                      Acknowledge
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </ScrollArea>
      {showControls && alerts.filter(a => !a.acknowledged).length > 0 && (
        <>
          <Separator />
          <CardFooter className="pt-3 pb-3 flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleDismissAll}
            >
              Acknowledge All
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
