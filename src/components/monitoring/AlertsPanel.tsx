
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Bell, CheckCircle2 } from 'lucide-react';
import { AlertList } from './AlertList';
import { CollapsedAlertButton } from './CollapsedAlertButton';
import { Alert, monitoring, AlertSeverity } from '@/utils/monitoring';

interface AlertsPanelProps {
  maxAlerts?: number;
  defaultExpanded?: boolean;
  showOnlyUnacknowledged?: boolean;
  severityFilter?: AlertSeverity;
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({
  maxAlerts = 5,
  defaultExpanded = true,
  showOnlyUnacknowledged = false,
  severityFilter
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Initial load of alerts
    const alertsToShow = monitoring.getAlerts(severityFilter);
    setAlerts(showOnlyUnacknowledged ? alertsToShow.filter(a => !a.acknowledged) : alertsToShow);

    // Subscribe to alert updates
    const unsubscribe = monitoring.addListener(newAlerts => {
      const filteredAlerts = severityFilter ? 
        newAlerts.filter(a => a.severity === severityFilter) : 
        newAlerts;
        
      setAlerts(showOnlyUnacknowledged ? 
        filteredAlerts.filter(a => !a.acknowledged) : 
        filteredAlerts
      );
    });

    return unsubscribe;
  }, [severityFilter, showOnlyUnacknowledged]);

  const handleAcknowledge = (alertId: string) => {
    monitoring.acknowledgeAlert(alertId);
  };

  const clearAllAlerts = () => {
    monitoring.clearAlerts();
  };

  const displayedAlerts = showAll ? alerts : alerts.slice(0, maxAlerts);

  if (alerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5 text-primary" />
            System Alerts
          </CardTitle>
          <CardDescription>Real-time system notifications and alerts</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
          <CheckCircle2 className="h-12 w-12 mb-4 text-green-500" />
          <p className="mb-2">No alerts at this time</p>
          <p className="text-sm">The system is running smoothly</p>
        </CardContent>
      </Card>
    );
  }

  if (!expanded) {
    return <CollapsedAlertButton alerts={alerts} onClick={() => setExpanded(true)} />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <ShieldAlert className="mr-2 h-5 w-5 text-primary" />
            System Alerts
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllAlerts}
            >
              Clear All
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setExpanded(false)}
            >
              Minimize
            </Button>
          </div>
        </div>
        <CardDescription>
          {alerts.length} active alert{alerts.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertList alerts={displayedAlerts} onAcknowledge={handleAcknowledge} />
        
        {alerts.length > maxAlerts && !showAll && (
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              onClick={() => setShowAll(true)}
            >
              Show {alerts.length - maxAlerts} more alerts
            </Button>
          </div>
        )}
        
        {showAll && alerts.length > maxAlerts && (
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              onClick={() => setShowAll(false)}
            >
              Show fewer alerts
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
