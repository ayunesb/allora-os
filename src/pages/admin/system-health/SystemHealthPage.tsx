import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AlertCircle, CheckCircle, Server, Database, Network } from 'lucide-react';
import SystemHealthHeader from './SystemHealthHeader';
import SystemHealthTabs from './SystemHealthTabs';

export default function SystemHealthPage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [systemHealth, setSystemHealth] = useState({
        status: 'healthy',
        percentage: 100
    });

    const [data, setData] = useState<{ id: string; name: string; description: string; status: string; lastChecked: string; responseTime: number; details: string }[]>([]);

    useEffect(() => {
        const fetchSystemHealth = async () => {
            try {
                setIsLoading(true);
                // Simulate API call to fetch system health data
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Mock services data
                const mockServices = [
                    {
                        id: '1',
                        name: 'Database',
                        description: 'Supabase database connection',
                        status: 'healthy',
                        lastChecked: new Date().toISOString(),
                        responseTime: 45,
                        details: 'All database functions operating normally'
                    },
                    {
                        id: '2',
                        name: 'Authentication',
                        description: 'User authentication service',
                        status: 'healthy',
                        lastChecked: new Date().toISOString(),
                        responseTime: 32,
                        details: 'Authentication service functioning correctly'
                    },
                    {
                        id: '3',
                        name: 'API Server',
                        description: 'Backend API services',
                        status: 'healthy',
                        lastChecked: new Date().toISOString(),
                        responseTime: 78,
                        details: 'All API endpoints responding within expected parameters'
                    },
                    {
                        id: '4',
                        name: 'Storage',
                        description: 'File storage service',
                        status: 'healthy',
                        lastChecked: new Date().toISOString(),
                        responseTime: 120,
                        details: 'Storage buckets accessible and functioning correctly'
                    },
                    {
                        id: '5',
                        name: 'Email Service',
                        description: 'Email delivery service via Postmark',
                        status: 'healthy',
                        lastChecked: new Date().toISOString(),
                        responseTime: 254,
                        details: 'Email delivery service operational'
                    }
                ];
                setServices(mockServices);
                // Calculate overall health percentage
                const totalServices = mockServices.length;
                const healthyServices = mockServices.filter(s => s.status === 'healthy').length;
                const degradedServices = mockServices.filter(s => s.status === 'degraded').length;
                let status = 'healthy';
                if (healthyServices < totalServices && healthyServices > 0) {
                    status = 'degraded';
                }
                else if (healthyServices === 0) {
                    status = 'down';
                }
                const healthPercentage = Math.round((healthyServices + (degradedServices * 0.5)) / totalServices * 100);
                setSystemHealth({
                    status,
                    percentage: healthPercentage
                });
                toast.success("System health data refreshed");
            }
            catch (error) {
                console.error("Error fetching system health:", error);
                toast.error("Failed to fetch system health data");
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchSystemHealth();
    }, []);

    const handleTabChange = (value: string) => {
        setActiveTab(value);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'healthy':
                return (<div className="flex items-center">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Healthy
            </Badge>
            <CheckCircle className="h-4 w-4 text-green-500 ml-2"/>
          </div>);
            case 'degraded':
                return (<div className="flex items-center">
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Degraded
            </Badge>
            <AlertCircle className="h-4 w-4 text-amber-500 ml-2"/>
          </div>);
            case 'down':
                return (<div className="flex items-center">
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              Down
            </Badge>
            <AlertCircle className="h-4 w-4 text-red-500 ml-2"/>
          </div>);
            default:
                return null;
        }
    };

    return (<div className="space-y-6">
      <SystemHealthHeader />
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between">
            <div className="flex items-center">
              <Server className="mr-2 h-5 w-5 text-primary"/>
              System Status
            </div>
            {getStatusBadge(systemHealth.status)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <Card className="flex-1 bg-muted/50">
              <CardContent className="p-4 flex items-center gap-3">
                <Database className="h-8 w-8 text-primary"/>
                <div>
                  <div className="text-sm font-medium">Database</div>
                  <div className="text-xs text-muted-foreground">Operational</div>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 bg-muted/50">
              <CardContent className="p-4 flex items-center gap-3">
                <Network className="h-8 w-8 text-primary"/>
                <div>
                  <div className="text-sm font-medium">API</div>
                  <div className="text-xs text-muted-foreground">Operational</div>
                </div>
              </CardContent>
            </Card>
            <Card className="flex-1 bg-muted/50">
              <CardContent className="p-4 flex items-center gap-3">
                <Server className="h-8 w-8 text-primary"/>
                <div>
                  <div className="text-sm font-medium">Services</div>
                  <div className="text-xs text-muted-foreground">Operational</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <SystemHealthTabs activeTab={activeTab} onTabChange={handleTabChange} services={services} systemHealth={systemHealth}/>
    </div>);
}
