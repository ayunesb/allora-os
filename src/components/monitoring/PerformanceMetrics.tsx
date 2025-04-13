
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Gauge, Cpu, Database, Activity, BarChart3 } from 'lucide-react';
import { monitoring, startApiTimer } from '@/utils/monitoring';

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: Date;
}

interface MetricHistory {
  [key: string]: PerformanceMetric[];
}

export default function PerformanceMetrics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [apiLatency, setApiLatency] = useState(0);
  const [databaseQueryTime, setDatabaseQueryTime] = useState(0);
  const [metricHistory, setMetricHistory] = useState<MetricHistory>({
    cpu: [],
    memory: [],
    api: [],
    database: []
  });
  
  // Simulate gathering performance metrics
  useEffect(() => {
    // Function to get random variations in metrics
    const getVariation = (base: number, variance: number) => {
      return Math.max(0, Math.min(100, base + (Math.random() * variance * 2 - variance)));
    };
    
    // Simulate CPU usage metric
    const cpuTimer = setInterval(() => {
      const newCpuUsage = getVariation(cpuUsage || 30, 5);
      setCpuUsage(newCpuUsage);
      
      monitoring.setGauge('system.cpu', newCpuUsage);
      
      setMetricHistory(prev => ({
        ...prev,
        cpu: [
          ...prev.cpu,
          { name: 'CPU', value: newCpuUsage, timestamp: new Date() }
        ].slice(-20)
      }));
    }, 3000);
    
    // Simulate memory usage metric
    const memoryTimer = setInterval(() => {
      const newMemoryUsage = getVariation(memoryUsage || 45, 3);
      setMemoryUsage(newMemoryUsage);
      
      monitoring.setGauge('system.memory', newMemoryUsage);
      
      setMetricHistory(prev => ({
        ...prev,
        memory: [
          ...prev.memory,
          { name: 'Memory', value: newMemoryUsage, timestamp: new Date() }
        ].slice(-20)
      }));
    }, 5000);
    
    // Simulate API latency metrics
    const apiTimer = setInterval(() => {
      const endpoints = ['getStrategies', 'getCampaigns', 'getUserProfile', 'getLeads'];
      const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
      
      const timer = startApiTimer(endpoint);
      
      // Simulate API call time (between 100ms and 300ms)
      setTimeout(() => {
        const duration = timer();
        setApiLatency(duration);
        
        setMetricHistory(prev => ({
          ...prev,
          api: [
            ...prev.api,
            { name: endpoint, value: duration, timestamp: new Date() }
          ].slice(-20)
        }));
      }, 100 + Math.random() * 200);
    }, 4000);
    
    // Simulate database query time
    const dbTimer = setInterval(() => {
      const tables = ['strategies', 'campaigns', 'leads', 'profiles'];
      const table = tables[Math.floor(Math.random() * tables.length)];
      
      // Simulate DB query time (between 50ms and 150ms)
      const queryTime = 50 + Math.random() * 100;
      setDatabaseQueryTime(queryTime);
      
      monitoring.recordTiming(`db.query.${table}`, queryTime, { table });
      
      setMetricHistory(prev => ({
        ...prev,
        database: [
          ...prev.database,
          { name: table, value: queryTime, timestamp: new Date() }
        ].slice(-20)
      }));
    }, 6000);
    
    // Clean up intervals
    return () => {
      clearInterval(cpuTimer);
      clearInterval(memoryTimer);
      clearInterval(apiTimer);
      clearInterval(dbTimer);
    };
  }, [cpuUsage, memoryUsage]);

  // Format time for chart display
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  // Prepare chart data
  const getChartData = (metrics: PerformanceMetric[]) => {
    return metrics.map(metric => ({
      name: formatTime(metric.timestamp),
      value: metric.value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>
          Real-time system performance monitoring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center justify-center">
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center justify-center">
              <Cpu className="h-4 w-4 mr-2" />
              System
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center justify-center">
              <Gauge className="h-4 w-4 mr-2" />
              API
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center justify-center">
              <Database className="h-4 w-4 mr-2" />
              Database
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm flex items-center">
                    <Cpu className="h-4 w-4 mr-2" />
                    CPU Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-2">
                    <Progress value={cpuUsage} className="h-2" />
                    <p className="text-xs text-right text-muted-foreground">
                      {cpuUsage.toFixed(1)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm flex items-center">
                    <Database className="h-4 w-4 mr-2" />
                    Memory Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-2">
                    <Progress value={memoryUsage} className="h-2" />
                    <p className="text-xs text-right text-muted-foreground">
                      {memoryUsage.toFixed(1)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm flex items-center">
                    <Gauge className="h-4 w-4 mr-2" />
                    API Latency
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-2">
                    <Progress 
                      value={Math.min(100, (apiLatency / 500) * 100)} 
                      className="h-2" 
                    />
                    <p className="text-xs text-right text-muted-foreground">
                      {apiLatency.toFixed(2)} ms
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="py-2">
                  <CardTitle className="text-sm flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    DB Query Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="space-y-2">
                    <Progress 
                      value={Math.min(100, (databaseQueryTime / 200) * 100)} 
                      className="h-2" 
                    />
                    <p className="text-xs text-right text-muted-foreground">
                      {databaseQueryTime.toFixed(2)} ms
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="system">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getChartData(metricHistory.cpu)}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    domain={[0, 100]} 
                    label={{ value: '%', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getChartData(metricHistory.memory)}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    domain={[0, 100]} 
                    label={{ value: '%', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="api">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getChartData(metricHistory.api)}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    domain={[0, 'dataMax + 50']} 
                    label={{ value: 'ms', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#ff7300" fill="#ffa500" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="database">
            <div className="h-[300px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={getChartData(metricHistory.database)}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    domain={[0, 'dataMax + 20']} 
                    label={{ value: 'ms', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip />
                  <Area type="monotone" dataKey="value" stroke="#0088FE" fill="#0088FE" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
