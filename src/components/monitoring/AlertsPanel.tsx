
import React, { useState, useEffect } from 'react';
import { Alert } from '@/utils/monitoring';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, X } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { monitoring } from '@/utils/monitoring';
import { AlertList } from './AlertList';
import { CollapsedAlertButton } from './CollapsedAlertButton';

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
    setAlerts(monitoring.getAlerts().slice(0, maxAlerts));
    
    const unsubscribe = monitoring.onAlert((alert) => {
      setAlerts(prevAlerts => {
        const newAlerts = [alert, ...prevAlerts].slice(0, maxAlerts);
        return newAlerts;
      });
      
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
    
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => 
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
    
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
    
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => ({ ...alert, acknowledged: true }))
    );
  };
  
  if (alerts.length === 0) {
    return null;
  }
  
  if (isCollapsed) {
    return (
      <CollapsedAlertButton 
        alerts={alerts} 
        onClick={() => setIsCollapsed(false)} 
      />
    );
  }

  return (
    <Card className={`shadow-lg border-slate-200 ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
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
      <CardContent className="pt-3 p-0">
        <AlertList 
          alerts={alerts}
          onAcknowledge={handleAcknowledge}
        />
      </CardContent>
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
