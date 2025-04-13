
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AlertsPanel from '@/components/monitoring/AlertsPanel';
import { monitoring } from '@/utils/monitoring';

export default function AlertsTab() {
  const { toast } = useToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Alerts</CardTitle>
        <CardDescription>
          Real-time alerts and notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertsPanel maxAlerts={10} />
        
        <div className="mt-6">
          <Button 
            variant="outline" 
            onClick={() => {
              // Generate test alerts
              monitoring.triggerAlert(
                'Test Warning Alert',
                'This is a test warning alert',
                'warning',
                { source: 'SystemHealth', test: true }
              );
              
              monitoring.triggerAlert(
                'Test Error Alert',
                'This is a test error alert',
                'error',
                { source: 'SystemHealth', test: true }
              );
              
              toast({
                title: "Test Alerts Generated",
                description: "Created test warning and error alerts"
              });
            }}
          >
            Generate Test Alert
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
