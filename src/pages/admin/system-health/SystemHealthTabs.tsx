
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Activity, Server, Database, Download, RefreshCw } from 'lucide-react';
import { SystemService } from './SystemHealthPage';
import { useNavigate } from 'react-router-dom';

interface SystemHealthTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  services: SystemService[];
  systemHealth: {
    status: 'healthy' | 'degraded' | 'down';
    percentage: number;
  };
}

export default function SystemHealthTabs({
  activeTab,
  onTabChange,
  services,
  systemHealth
}: SystemHealthTabsProps) {
  const navigate = useNavigate();
  
  const handleFix = (serviceId: string) => {
    // In a real implementation, this would call an API to attempt to fix the service
    console.log(`Attempting to fix service: ${serviceId}`);
    // For demo purposes, let's navigate to the diagnostics page
    navigate('/admin/diagnostics', { 
      state: { serviceToFix: serviceId } 
    });
  };
  
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="logs">System Logs</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="text-lg">Overall Health</div>
                <div className="text-lg font-semibold">{systemHealth.percentage}%</div>
              </div>
              
              <div className="w-full bg-muted rounded-full h-4">
                <div 
                  className={`h-4 rounded-full ${
                    systemHealth.status === 'healthy' 
                      ? 'bg-green-500' 
                      : systemHealth.status === 'degraded' 
                        ? 'bg-amber-500' 
                        : 'bg-destructive'
                  }`}
                  style={{ width: `${systemHealth.percentage}%` }}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <Card className="bg-muted/40">
                  <CardContent className="p-4 flex flex-col items-center gap-2">
                    <Server className="h-8 w-8 text-primary" />
                    <div className="text-center">
                      <div className="font-semibold">API Services</div>
                      <div className="text-sm text-muted-foreground">Operational</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/40">
                  <CardContent className="p-4 flex flex-col items-center gap-2">
                    <Database className="h-8 w-8 text-primary" />
                    <div className="text-center">
                      <div className="font-semibold">Database</div>
                      <div className="text-sm text-muted-foreground">Operational</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-muted/40">
                  <CardContent className="p-4 flex flex-col items-center gap-2">
                    <Activity className="h-8 w-8 text-primary" />
                    <div className="text-center">
                      <div className="font-semibold">Storage</div>
                      <div className="text-sm text-muted-foreground">Operational</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    const reportData = {
                      timestamp: new Date().toISOString(),
                      health: systemHealth,
                      services: services
                    };
                    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `health-report-${new Date().toISOString().split('T')[0]}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                >
                  <Download className="h-4 w-4" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="services" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service) => (
                <div key={service.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-primary" />
                      <div className="font-semibold">{service.name}</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      service.status === 'healthy' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : service.status === 'degraded' 
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {service.status}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {service.description}
                  </p>
                  
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div>Last checked: {new Date(service.lastChecked).toLocaleTimeString()}</div>
                    <div>Response time: {service.responseTime || 'N/A'} ms</div>
                  </div>
                  
                  {service.status !== 'healthy' && (
                    <div className="mt-3 flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => handleFix(service.id)}
                      >
                        <Wrench className="h-3 w-3" />
                        Fix Issue
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="logs" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>System Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">System logs will be displayed here.</p>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="performance" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Performance metrics will be displayed here.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
