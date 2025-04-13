
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Activity, XCircle } from 'lucide-react';
import { SystemService } from '../SystemHealthPage';

interface ServicesTabProps {
  services: SystemService[];
}

export default function ServicesTab({ services }: ServicesTabProps) {
  // Get health status icon
  const getStatusIcon = (status: 'healthy' | 'degraded' | 'down') => {
    switch (status) {
      case 'healthy':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <Activity className="h-5 w-5 text-amber-500" />;
      case 'down':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };
  
  // Get status color class
  const getStatusColorClass = (status: 'healthy' | 'degraded' | 'down') => {
    switch (status) {
      case 'healthy':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'degraded':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'down':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Health</CardTitle>
        <CardDescription>
          Detailed status of all system services
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.name}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  {getStatusIcon(service.status)}
                  <span className="ml-2 font-medium">{service.name}</span>
                </div>
                <span className={`text-sm px-2 py-1 rounded-full ${getStatusColorClass(service.status)}`}>
                  {service.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-md text-sm">
                <div>
                  <span className="text-muted-foreground">Latency:</span>
                  <span className="ml-2 font-medium">{service.latency}ms</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Last Checked:</span>
                  <span className="ml-2 font-medium">
                    {service.lastChecked.toLocaleTimeString()}
                  </span>
                </div>
                {service.message && (
                  <div className="col-span-2">
                    <span className="text-muted-foreground">Message:</span>
                    <span className="ml-2 font-medium">{service.message}</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
