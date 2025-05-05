import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Download, TrendingUp, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
export function DashboardAnalytics({ data, isLoading = false }) {
    const [timeRange, setTimeRange] = useState("7d");
    const [chartType, setChartType] = useState("bar");
    // Sample data - in a real app, this would come from props or an API
    const revenueData = [
        { name: "Jan", value: 4000 },
        { name: "Feb", value: 3000 },
        { name: "Mar", value: 5000 },
        { name: "Apr", value: 7000 },
        { name: "May", value: 6000 },
        { name: "Jun", value: 9000 },
    ];
    const performanceData = [
        { name: "Ads", value: 400 },
        { name: "Social", value: 300 },
        { name: "Email", value: 300 },
        { name: "Direct", value: 200 },
    ];
    const conversionData = [
        { name: "Mon", visits: 4000, conversions: 240 },
        { name: "Tue", visits: 3000, conversions: 198 },
        { name: "Wed", visits: 2000, conversions: 980 },
        { name: "Thu", visits: 2780, conversions: 390 },
        { name: "Fri", visits: 1890, conversions: 480 },
        { name: "Sat", visits: 2390, conversions: 380 },
        { name: "Sun", visits: 3490, conversions: 430 },
    ];
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const handleExportData = (format) => {
        // In a real app, this would generate and download the file
        toast.success(`Analytics data exported as ${format.toUpperCase()}`);
    };
    const handleFilterChange = (value) => {
        setTimeRange(value);
        toast.info(`Data filtered to show last ${value}`);
    };
    return (<Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5"/>
            Business Performance Analytics
          </CardTitle>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time Range"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" onClick={() => handleExportData("csv")} title="Export as CSV">
                <Download className="h-4 w-4"/>
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="mb-4 grid grid-cols-3 w-full">
            <TabsTrigger value="performance" className="flex items-center justify-center">
              <BarChart3 className="mr-2 h-4 w-4"/>
              Performance
            </TabsTrigger>
            <TabsTrigger value="channels" className="flex items-center justify-center">
              <PieChartIcon className="mr-2 h-4 w-4"/>
              Channels
            </TabsTrigger>
            <TabsTrigger value="conversions" className="flex items-center justify-center">
              <LineChartIcon className="mr-2 h-4 w-4"/>
              Conversions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']}/>
                  <Legend />
                  <Bar dataKey="value" name="Revenue" fill="#8884d8" activeBar={{ fill: '#6557ff', stroke: '#6557ff' }}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="channels">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={performanceData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`} outerRadius={100} fill="#8884d8" dataKey="value">
                    {performanceData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}`, 'Value']}/>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="conversions">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={conversionData} margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name"/>
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="visits" stackId="1" stroke="#8884d8" fill="#8884d8" name="Visits"/>
                  <Area type="monotone" dataKey="conversions" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Conversions"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>);
}
