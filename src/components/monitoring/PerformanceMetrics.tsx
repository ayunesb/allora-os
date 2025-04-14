
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertBadge } from "./AlertBadge";
import { monitoring, GaugeMetric, TimingMetric } from '@/utils/monitoring';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Activity, Server, Database } from "lucide-react";

interface PerformanceMetricsProps {
  isLoading?: boolean;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ isLoading = false }) => {
  const [cpuUsage, setCpuUsage] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);
  const [apiResponseTime, setApiResponseTime] = useState(0);
  const [selectedTab, setSelectedTab] = useState("gauges");
  const [timingData, setTimingData] = useState<TimingMetric[]>([]);
  
  // Simulate metrics for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      // Update CPU usage (40-80%)
      const newCpu = 40 + Math.random() * 40;
      setCpuUsage(newCpu);
      monitoring.setGauge('CPU Usage', newCpu, 0, 100, '%', {
        warning: 70,
        critical: 90
      });
      
      // Update memory usage (30-70%)
      const newMemory = 30 + Math.random() * 40;
      setMemoryUsage(newMemory);
      monitoring.setGauge('Memory Usage', newMemory, 0, 100, '%', {
        warning: 80,
        critical: 95
      });
      
      // Update API response time (50-500ms)
      const newApiTime = 50 + Math.random() * 450;
      setApiResponseTime(newApiTime);
      monitoring.setGauge('API Response Time', newApiTime, 0, 1000, 'ms', {
        warning: 300,
        critical: 800
      });
      
      // Simulate page load timing
      monitoring.recordTiming('Page Load', 800 + Math.random() * 1200, 'frontend');
      
      // Update timing data
      setTimingData(monitoring.getTimingMetrics());
      
    }, 5000);
    
    // Initial run
    monitoring.startApiTimer('initial-load');
    
    // Generate some initial data
    monitoring.setGauge('CPU Usage', 45, 0, 100, '%');
    monitoring.setGauge('Memory Usage', 32, 0, 100, '%');
    monitoring.setGauge('API Response Time', 120, 0, 1000, 'ms');
    
    monitoring.recordTiming('API Initialization', 345, 'backend');
    monitoring.recordTiming('Database Connection', 112, 'backend');
    monitoring.recordTiming('Auth Check', 89, 'backend');
    
    setTimeout(() => {
      monitoring.endApiTimer('initial-load');
    }, 500);

    return () => clearInterval(interval);
  }, []);
  
  // Format timing data for charts
  const formattedTimingData = timingData.map(metric => ({
    name: metric.name,
    duration: metric.duration,
    category: metric.category
  })).slice(0, 10);
  
  // Sample performance data for chart
  const performanceData = [
    { date: '10:00', cpu: 42, memory: 38, apiTime: 120 },
    { date: '10:05', cpu: 45, memory: 40, apiTime: 135 },
    { date: '10:10', cpu: 48, memory: 45, apiTime: 128 },
    { date: '10:15', cpu: 52, memory: 48, apiTime: 142 },
    { date: '10:20', cpu: 58, memory: 52, apiTime: 150 },
    { date: '10:25', cpu: 62, memory: 55, apiTime: 165 },
    { date: '10:30', cpu: 68, memory: 58, apiTime: 180 },
    { date: '10:35', cpu: 72, memory: 62, apiTime: 210 },
    { date: '10:40', cpu: 70, memory: 65, apiTime: 190 },
    { date: '10:45', cpu: 65, memory: 60, apiTime: 175 },
  ];

  const getStatusColor = (value: number, warningThreshold: number, criticalThreshold: number) => {
    if (value >= criticalThreshold) return "bg-red-500";
    if (value >= warningThreshold) return "bg-amber-500";
    return "bg-green-500";
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-[250px]" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Performance</CardTitle>
        <CardDescription>
          Real-time metrics and performance data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gauges" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="w-full mb-4">
            <TabsTrigger value="gauges">Resource Usage</TabsTrigger>
            <TabsTrigger value="timings">Response Times</TabsTrigger>
            <TabsTrigger value="history">Historical Data</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gauges" className="space-y-4">
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Server className="h-4 w-4 mr-2" />
                    CPU Usage
                  </span>
                  <Badge 
                    className={getStatusColor(cpuUsage, 70, 90)}
                  >
                    {cpuUsage.toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={cpuUsage} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Database className="h-4 w-4 mr-2" />
                    Memory Usage
                  </span>
                  <Badge 
                    className={getStatusColor(memoryUsage, 80, 95)}
                  >
                    {memoryUsage.toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={memoryUsage} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Activity className="h-4 w-4 mr-2" />
                    API Response Time
                  </span>
                  <Badge 
                    className={getStatusColor(apiResponseTime, 300, 800)}
                  >
                    {apiResponseTime.toFixed(0)}ms
                  </Badge>
                </div>
                <Progress value={(apiResponseTime / 1000) * 100} className="h-2" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timings">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={formattedTimingData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 70,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45}
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis label={{ value: 'Duration (ms)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar 
                    dataKey="duration" 
                    fill="#8884d8" 
                    name="Duration (ms)"
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="cpu"
                    name="CPU Usage (%)"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="memory" 
                    name="Memory (%)"
                    stroke="#82ca9d" 
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="apiTime" 
                    name="API Time (ms)"
                    stroke="#ffc658" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetrics;
