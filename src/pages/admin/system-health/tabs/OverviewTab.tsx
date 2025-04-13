
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from 'lucide-react';
import PerformanceMetrics from '@/components/monitoring/PerformanceMetrics';
import AlertsPanel from '@/components/monitoring/AlertsPanel';
import { SystemService } from '../SystemHealthPage';
import ServiceStatusList from './ServiceStatusList';

interface OverviewTabProps {
  services: SystemService[];
}

export default function OverviewTab({ services }: OverviewTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Real-time Metrics
          </CardTitle>
          <CardDescription>
            System performance and resource utilization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceMetrics />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>
            Latest system alerts and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertsPanel maxAlerts={3} showControls={false} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Service Status</CardTitle>
          <CardDescription>
            Current status of critical services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceStatusList services={services.slice(0, 4)} />
        </CardContent>
      </Card>
    </div>
  );
}
