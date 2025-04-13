
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, AreaChart, Area 
} from 'recharts';
import { LineChart as LineChartIcon, BarChart as BarChartIcon, PieChart as PieChartIcon, ArrowUpDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from '@tanstack/react-query';
import { getSystemAnalytics } from "@/backend/analyticsService";
import { useBreakpoint } from '@/hooks/use-mobile';

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  // Fetch analytics data
  const { data: systemAnalytics, isLoading } = useQuery({
    queryKey: ['systemAnalytics'],
    queryFn: getSystemAnalytics,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // User activity data (daily active users)
  const userActivityData = [
    { date: '04/06', users: 102 },
    { date: '04/07', users: 115 },
    { date: '04/08', users: 98 },
    { date: '04/09', users: 110 },
    { date: '04/10', users: 125 },
    { date: '04/11', users: 138 },
    { date: '04/12', users: 148 },
    { date: '04/13', users: 160 },
  ];
  
  // Feature usage data
  const featureUsageData = [
    { name: 'Strategy Board', usage: 35 },
    { name: 'AI Consultations', usage: 27 },
    { name: 'Executive Debate', usage: 18 },
    { name: 'Lead Management', usage: 12 },
    { name: 'Social Calendar', usage: 8 },
  ];
  
  // Subscription distribution data
  const subscriptionData = [
    { name: 'Basic', value: 45 },
    { name: 'Pro', value: 30 },
    { name: 'Enterprise', value: 15 },
    { name: 'Free Trial', value: 10 },
  ];
  
  // API usage over time
  const apiUsageData = [
    { date: '04/06', calls: 2450, errors: 85 },
    { date: '04/07', calls: 2780, errors: 92 },
    { date: '04/08', calls: 2390, errors: 78 },
    { date: '04/09', calls: 2610, errors: 82 },
    { date: '04/10', calls: 3100, errors: 110 },
    { date: '04/11', calls: 2980, errors: 89 },
    { date: '04/12', calls: 3250, errors: 95 },
    { date: '04/13', calls: 3500, errors: 102 },
  ];
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">System Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Monitor system performance and user engagement metrics
          </p>
        </div>
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 grid grid-cols-3 sm:grid-cols-4 gap-2 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* User Activity Card */}
            <Card className="border-primary/10 shadow-sm md:col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <LineChartIcon className="h-4 w-4 mr-2 text-primary" />
                  User Activity
                </CardTitle>
                <CardDescription>Daily active users</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={userActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="userActivity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#userActivity)" 
                      activeDot={{ r: 8 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Feature Usage Card */}
            <Card className="border-primary/10 shadow-sm md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <BarChartIcon className="h-4 w-4 mr-2 text-primary" />
                  Feature Usage
                </CardTitle>
                <CardDescription>Most used platform features</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={featureUsageData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="usage" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Subscription Distribution Card */}
            <Card className="border-primary/10 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <PieChartIcon className="h-4 w-4 mr-2 text-primary" />
                  Subscription Distribution
                </CardTitle>
                <CardDescription>Plans by user count</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subscriptionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {subscriptionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <Card className="border-primary/10 shadow-sm">
            <CardHeader>
              <CardTitle>User Growth Trends</CardTitle>
              <CardDescription>Monthly active users over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: 'Jan', users: 1200 },
                    { month: 'Feb', users: 1380 },
                    { month: 'Mar', users: 1590 },
                    { month: 'Apr', users: 1800 },
                    { month: 'May', users: 2050 },
                    { month: 'Jun', users: 2300 },
                    { month: 'Jul', users: 2580 },
                    { month: 'Aug', users: 2800 },
                    { month: 'Sep', users: 3050 },
                    { month: 'Oct', users: 3280 },
                    { month: 'Nov', users: 3520 },
                    { month: 'Dec', users: 3800 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="space-y-6">
          <Card className="border-primary/10 shadow-sm">
            <CardHeader>
              <CardTitle>Feature Engagement</CardTitle>
              <CardDescription>Usage patterns across platform features</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Strategy Board', new: 120, returning: 280 },
                    { name: 'AI Consultations', new: 85, returning: 190 },
                    { name: 'Executive Debate', new: 60, returning: 120 },
                    { name: 'Lead Management', new: 40, returning: 80 },
                    { name: 'Social Calendar', new: 30, returning: 50 },
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="new" stackId="a" fill="#8884d8" name="New Users" />
                  <Bar dataKey="returning" stackId="a" fill="#82ca9d" name="Returning Users" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-6">
          <Card className="border-primary/10 shadow-sm">
            <CardHeader>
              <CardTitle>API Usage & Errors</CardTitle>
              <CardDescription>API calls and error rates over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={apiUsageData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="calls" stroke="#8884d8" activeDot={{ r: 8 }} name="API Calls" />
                  <Line yAxisId="right" type="monotone" dataKey="errors" stroke="#ff7300" name="Errors" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* System Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-primary/10 shadow-sm">
          <CardHeader className="p-4">
            <CardDescription>API Calls (24h)</CardDescription>
            <CardTitle className="text-2xl mt-1">
              {isLoading ? "Loading..." : systemAnalytics?.apiCalls.toLocaleString() || "2,458"}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="border-primary/10 shadow-sm">
          <CardHeader className="p-4">
            <CardDescription>Error Rate</CardDescription>
            <CardTitle className="text-2xl mt-1">
              {isLoading ? "Loading..." : `${(systemAnalytics?.errorRate * 100 || 2.3).toFixed(1)}%`}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="border-primary/10 shadow-sm">
          <CardHeader className="p-4">
            <CardDescription>Avg Response Time</CardDescription>
            <CardTitle className="text-2xl mt-1">
              {isLoading ? "Loading..." : `${systemAnalytics?.averageResponseTime || 246}ms`}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card className="border-primary/10 shadow-sm">
          <CardHeader className="p-4">
            <CardDescription>Active Subscriptions</CardDescription>
            <CardTitle className="text-2xl mt-1">
              {isLoading ? "Loading..." : systemAnalytics?.activeSubscriptions || 48}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
