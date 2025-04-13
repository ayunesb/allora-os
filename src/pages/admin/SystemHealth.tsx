
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Activity, Shield, Cpu, Globe, CheckCircle2, XCircle, BarChart3, RefreshCw } from 'lucide-react';
import PerformanceMetrics from '@/components/monitoring/PerformanceMetrics';
import AlertsPanel from '@/components/monitoring/AlertsPanel';
import { monitoring } from '@/utils/monitoring';
import { useToast } from '@/components/ui/use-toast';

interface SystemService {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  latency?: number;
  lastChecked: Date;
  message?: string;
}

export default function SystemHealth() {
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState<SystemService[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Simulate fetching service health on load
  useEffect(() => {
    checkServiceHealth();
    
    // Set up periodic health checks
    const interval = setInterval(checkServiceHealth, 60000);
    return () => clearInterval(interval);
  }, []);
  
  // Simulate service health check
  const checkServiceHealth = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockServices: SystemService[] = [
        {
          name: 'Authentication Service',
          status: Math.random() > 0.9 ? 'degraded' : 'healthy',
          latency: Math.floor(Math.random() * 100) + 50,
          lastChecked: new Date()
        },
        {
          name: 'Database',
          status: Math.random() > 0.95 ? 'down' : 'healthy',
          latency: Math.floor(Math.random() * 50) + 20,
          lastChecked: new Date()
        },
        {
          name: 'API Gateway',
          status: 'healthy',
          latency: Math.floor(Math.random() * 80) + 40,
          lastChecked: new Date()
        },
        {
          name: 'Storage Service',
          status: Math.random() > 0.92 ? 'degraded' : 'healthy',
          latency: Math.floor(Math.random() * 120) + 30,
          lastChecked: new Date()
        },
        {
          name: 'AI Processing',
          status: 'healthy',
          latency: Math.floor(Math.random() * 150) + 70,
          lastChecked: new Date()
        },
        {
          name: 'Notification Service',
          status: Math.random() > 0.97 ? 'down' : 'healthy',
          latency: Math.floor(Math.random() * 60) + 30,
          lastChecked: new Date()
        }
      ];
      
      // Add messages for non-healthy services
      mockServices.forEach(service => {
        if (service.status === 'degraded') {
          service.message = 'High latency detected';
          
          // Log warning for degraded services
          monitoring.triggerAlert(
            `${service.name} Degraded`,
            `${service.name} is experiencing high latency (${service.latency}ms)`,
            'warning',
            { service: service.name, latency: service.latency }
          );
        } else if (service.status === 'down') {
          service.message = 'Service is unavailable';
          
          // Log error for down services
          monitoring.triggerAlert(
            `${service.name} Unavailable`,
            `${service.name} is currently down`,
            'critical',
            { service: service.name, time: new Date().toISOString() }
          );
          
          // Show toast for down services
          toast({
            title: `${service.name} Down`,
            description: `${service.name} is currently unavailable`,
            variant: "destructive"
          });
        }
      });
      
      setServices(mockServices);
      setLoading(false);
      
      // Log success
      monitoring.triggerAlert(
        'Health Check Completed',
        `Checked ${mockServices.length} services`,
        'info',
        { 
          healthy: mockServices.filter(s => s.status === 'healthy').length,
          degraded: mockServices.filter(s => s.status === 'degraded').length,
          down: mockServices.filter(s => s.status === 'down').length
        }
      );
    }, 1000);
  };
  
  // Calculate overall system health
  const calculateSystemHealth = (): { status: 'healthy' | 'degraded' | 'down', percentage: number } => {
    if (!services.length) return { status: 'healthy', percentage: 100 };
    
    const downServices = services.filter(s => s.status === 'down').length;
    const degradedServices = services.filter(s => s.status === 'degraded').length;
    
    if (downServices > 0) {
      // If any service is down, system is down
      const percentage = 100 - (downServices / services.length * 100);
      return { status: 'down', percentage };
    } else if (degradedServices > 0) {
      // If any service is degraded, system is degraded
      const percentage = 100 - (degradedServices / services.length * 50);
      return { status: 'degraded', percentage };
    } else {
      return { status: 'healthy', percentage: 100 };
    }
  };
  
  const systemHealth = calculateSystemHealth();
  
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
    <>
      <Helmet>
        <title>System Health Dashboard | Allora AI</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">System Health</h1>
            <p className="text-muted-foreground">
              Monitor system performance and service status
            </p>
          </div>
          
          <Button
            onClick={checkServiceHealth}
            disabled={loading}
            className="flex items-center"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className={`border-l-4 ${
            systemHealth.status === 'healthy' ? 'border-l-green-500' : 
            systemHealth.status === 'degraded' ? 'border-l-amber-500' : 
            'border-l-red-500'
          }`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                {getStatusIcon(systemHealth.status)}
                <span className="ml-2 font-medium capitalize">
                  {systemHealth.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {systemHealth.status === 'healthy' 
                  ? 'All systems operational' 
                  : systemHealth.status === 'degraded' 
                  ? 'Some services degraded' 
                  : 'Critical services down'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Cpu className="h-5 w-5 mr-2" />
                Service Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm mb-1">
                <span>{services.filter(s => s.status === 'healthy').length} Healthy</span>
                <span>{services.filter(s => s.status !== 'healthy').length} Issues</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500"
                  style={{ width: `${systemHealth.percentage}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                API Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Operational</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Avg: 87ms
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
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
                  <AlertsPanel maxAlerts={3} />
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
                  <div className="space-y-4">
                    {services.slice(0, 4).map((service) => (
                      <div key={service.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getStatusIcon(service.status)}
                          <span className="ml-2">{service.name}</span>
                        </div>
                        <span className={`text-sm px-2 py-1 rounded-full ${getStatusColorClass(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                    ))}
                    
                    {services.length > 4 && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={() => setActiveTab('services')}
                      >
                        View All Services
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="services">
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
          </TabsContent>
          
          <TabsContent value="alerts">
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
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
