
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, Scatter, ScatterChart, ZAxis
} from "recharts";
import { ChannelPerformance } from "@/types/analytics";
import {
  Download, Calendar, Share2, ArrowUpDown,
  BarChart3, PieChart as PieChartIcon, TrendingUp, Activity,
  Layers, Target, ChevronDown
} from "lucide-react";
import { toast } from "sonner";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";

interface CampaignAnalyticsProps {
  campaignId?: string;
  campaignName?: string;
  isComparison?: boolean;
  comparisonCampaignIds?: string[];
}

export function CampaignAnalytics({
  campaignId,
  campaignName = "Campaign Performance",
  isComparison = false,
  comparisonCampaignIds
}: CampaignAnalyticsProps) {
  const [timeframe, setTimeframe] = useState("30d");
  const [attributionModel, setAttributionModel] = useState("last-click");
  const [activeTab, setActiveTab] = useState("performance");

  // Sample data for performance over time
  const performanceData = [
    { date: "2023-01", impressions: 5000, clicks: 300, conversions: 30, revenue: 3000 },
    { date: "2023-02", impressions: 6000, clicks: 350, conversions: 35, revenue: 3500 },
    { date: "2023-03", impressions: 7500, clicks: 400, conversions: 40, revenue: 4200 },
    { date: "2023-04", impressions: 9000, clicks: 500, conversions: 50, revenue: 5100 },
    { date: "2023-05", impressions: 8500, clicks: 480, conversions: 48, revenue: 4800 },
    { date: "2023-06", impressions: 10000, clicks: 600, conversions: 60, revenue: 6300 },
  ];

  // Sample data for channel performance
  const channelData: ChannelPerformance[] = [
    {
      channelName: "Paid Search",
      metrics: {
        impressions: 25000,
        clicks: 1250,
        ctr: 5.0,
        conversions: 125,
        conversionRate: 10.0,
        cost: 6250,
        revenue: 12500,
        roi: 100
      }
    },
    {
      channelName: "Social Media",
      metrics: {
        impressions: 50000,
        clicks: 1500,
        ctr: 3.0,
        conversions: 90,
        conversionRate: 6.0,
        cost: 4500,
        revenue: 9000,
        roi: 100
      }
    },
    {
      channelName: "Display",
      metrics: {
        impressions: 100000,
        clicks: 2000,
        ctr: 2.0,
        conversions: 60,
        conversionRate: 3.0,
        cost: 3000,
        revenue: 6000,
        roi: 100
      }
    },
    {
      channelName: "Email",
      metrics: {
        impressions: 15000,
        clicks: 1800,
        ctr: 12.0,
        conversions: 180,
        conversionRate: 10.0,
        cost: 900,
        revenue: 18000,
        roi: 1900
      }
    }
  ];

  // Sample attribution data
  const attributionData = [
    { name: "First Click", value: 30 },
    { name: "Linear", value: 15 },
    { name: "Time Decay", value: 20 },
    { name: "Last Click", value: 35 }
  ];

  // Sample comparison data
  const comparisonData = [
    { name: "Impressions", campaign1: 46000, campaign2: 28000 },
    { name: "Clicks", campaign1: 2630, campaign2: 1390 },
    { name: "Conversions", campaign1: 263, campaign2: 125 },
    { name: "Revenue", campaign1: 22900, campaign2: 9800 }
  ];

  // Sample customer journey data (touchpoints)
  const journeyData = [
    { x: 0, y: 5, z: 20, name: "Facebook Ad" },
    { x: 1, y: 10, z: 15, name: "Google Search" },
    { x: 2, y: 15, z: 10, name: "Website Visit" },
    { x: 3, y: 20, z: 30, name: "Email Click" },
    { x: 4, y: 25, z: 40, name: "Purchase" }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

  const handleExport = (format: "csv" | "pdf" | "excel") => {
    toast.success(`Analytics exported as ${format.toUpperCase()}`);
  };

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
    toast.info(`Timeframe updated to ${value}`);
  };

  const handleAttributionModelChange = (value: string) => {
    setAttributionModel(value);
    toast.info(`Attribution model updated to ${value}`);
  };

  const handleShareReport = () => {
    toast.success("Report link copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">{campaignName} Analytics</h2>
          <p className="text-muted-foreground">Comprehensive analysis and attribution modeling</p>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <Select value={timeframe} onValueChange={handleTimeframeChange}>
            <SelectTrigger className="w-[130px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={attributionModel} onValueChange={handleAttributionModelChange}>
            <SelectTrigger className="w-[170px]">
              <Layers className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Attribution Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="first-click">First Click</SelectItem>
              <SelectItem value="last-click">Last Click</SelectItem>
              <SelectItem value="linear">Linear</SelectItem>
              <SelectItem value="time-decay">Time Decay</SelectItem>
              <SelectItem value="position-based">Position Based</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon" onClick={handleShareReport}>
            <Share2 className="h-4 w-4" />
          </Button>
          
          <div className="relative">
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => {
                // In a real app, this would be a dropdown menu
                handleExport("csv");
              }}
            >
              <Download className="h-4 w-4" />
              Export
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-1 sm:grid-cols-4">
          <TabsTrigger value="performance" className="flex items-center justify-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center justify-center">
            <PieChartIcon className="mr-2 h-4 w-4" />
            Channel Mix
          </TabsTrigger>
          <TabsTrigger value="attribution" className="flex items-center justify-center">
            <Layers className="mr-2 h-4 w-4" />
            Attribution
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex items-center justify-center">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Comparison
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Performance Over Time
              </CardTitle>
              <CardDescription>Campaign metrics across the selected timeframe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="impressions" 
                      stroke="#8884d8" 
                      name="Impressions" 
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="clicks" 
                      stroke="#82ca9d" 
                      name="Clicks"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="conversions" 
                      stroke="#ffc658" 
                      name="Conversions"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#ff8042" 
                      name="Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Conversion Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="conversions" 
                        name="Conversions" 
                        fill="#8884d8" 
                      />
                      <Bar 
                        dataKey="revenue" 
                        name="Revenue" 
                        fill="#82ca9d" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Activity className="mr-2 h-5 w-5" />
                  Engagement Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={performanceData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="impressions" 
                        stackId="1"
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        name="Impressions"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="clicks" 
                        stackId="2"
                        stroke="#82ca9d" 
                        fill="#82ca9d" 
                        name="Clicks"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <PieChartIcon className="mr-2 h-5 w-5" />
                  Channel Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="metrics.clicks"
                        nameKey="channelName"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [`${value}`, props.payload.channelName]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Channel Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={channelData}
                      layout="vertical"
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="channelName" />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="metrics.conversions" 
                        name="Conversions" 
                        fill="#8884d8" 
                      />
                      <Bar 
                        dataKey="metrics.cost" 
                        name="Cost" 
                        fill="#82ca9d" 
                      />
                      <Bar 
                        dataKey="metrics.revenue" 
                        name="Revenue" 
                        fill="#ffc658" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="attribution" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Layers className="mr-2 h-5 w-5" />
                  Attribution Model Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {attributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Customer Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                      }}
                    >
                      <CartesianGrid />
                      <XAxis 
                        type="number" 
                        dataKey="x" 
                        name="step" 
                        unit="" 
                        label={{ value: 'Journey Steps', position: 'insideBottomRight', offset: -10 }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="y" 
                        name="value" 
                        label={{ value: 'Impact Value', angle: -90, position: 'insideLeft' }}
                      />
                      <ZAxis 
                        type="number" 
                        dataKey="z" 
                        range={[60, 400]} 
                        name="score" 
                      />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        formatter={(value, name, props) => {
                          if (name === "step") return [`Step ${value}`, name];
                          return [value, name];
                        }}
                      />
                      <Legend />
                      <Scatter 
                        name="Touchpoints" 
                        data={journeyData} 
                        fill="#8884d8" 
                        shape="circle"
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <ArrowUpDown className="mr-2 h-5 w-5" />
                Campaign Comparison
              </CardTitle>
              <CardDescription>Compare performance with other campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comparisonData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="campaign1" 
                      name="This Campaign" 
                      fill="#8884d8" 
                    />
                    <Bar 
                      dataKey="campaign2" 
                      name="Comparison Campaign" 
                      fill="#82ca9d" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
