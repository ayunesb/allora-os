
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from "@/components/ui/button";
import { RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { monitoring } from '@/utils/monitoring';
import SystemHealthHeader from './SystemHealthHeader';
import SystemHealthCards from './SystemHealthCards';
import SystemHealthTabs from './SystemHealthTabs';

export interface SystemService {
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

  return (
    <>
      <Helmet>
        <title>System Health Dashboard | Allora AI</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <SystemHealthHeader />
          
          <Button
            onClick={checkServiceHealth}
            disabled={loading}
            className="flex items-center"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        <SystemHealthCards 
          systemHealth={systemHealth} 
          services={services} 
        />
        
        <SystemHealthTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          services={services}
          systemHealth={systemHealth}
        />
      </div>
    </>
  );
}
