
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Server, RefreshCw, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { SystemService } from '../SystemHealthPage';
import { getStatusColorClass, getStatusIcon, getStatusDescription } from '../utils/statusUtils';

interface OverviewTabProps {
  services: SystemService[];
}

export default function OverviewTab({ services }: OverviewTabProps) {
  const calculateHealthPercentage = () => {
    if (services.length === 0) return 0;
    
    const healthyServices = services.filter(s => s.status === 'healthy').length;
    const degradedServices = services.filter(s => s.status === 'degraded').length;
    
    return Math.round((healthyServices + (degradedServices * 0.5)) / services.length * 100);
  };
  
  const healthPercentage = calculateHealthPercentage();
  
  const getServicesByStatus = (status: 'healthy' | 'degraded' | 'down') => {
    return services.filter(service => service.status === status);
  };
  
  const healthyServices = getServicesByStatus('healthy');
  const degradedServices = getServicesByStatus('degraded');
  const downServices = getServicesByStatus('down');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>System Health Overview</CardTitle>
          <CardDescription>Overall system performance and health metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>System Health: {healthPercentage}%</span>
                <span>{healthyServices.length}/{services.length} Services Operational</span>
              </div>
              <Progress value={healthPercentage} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-green-700">Healthy</div>
                    <div className="text-2xl font-bold text-green-800">{healthyServices.length}</div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </CardContent>
              </Card>
              
              <Card className="bg-amber-50 border-amber-200">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-amber-700">Degraded</div>
                    <div className="text-2xl font-bold text-amber-800">{degradedServices.length}</div>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-amber-500" />
                </CardContent>
              </Card>
              
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-red-700">Down</div>
                    <div className="text-2xl font-bold text-red-800">{downServices.length}</div>
                  </div>
                  <XCircle className="h-8 w-8 text-red-500" />
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Recent system events and status changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="flex items-start space-x-3 border-b pb-3 last:border-0 last:pb-0">
                <div className="mt-0.5">{getStatusIcon(service.status)}</div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">{service.name}</span>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{new Date(service.lastChecked).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{service.details}</p>
                </div>
              </div>
            ))}
            
            {services.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                <Server className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p>No recent activity to display</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
