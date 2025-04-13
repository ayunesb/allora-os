
import React from "react";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart, PieChart } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart as RechartsBarChart, Bar } from "recharts";

// Sample data for charts
const performanceData = [
  { name: "Jan", users: 400, pageViews: 2400, sessions: 1800 },
  { name: "Feb", users: 300, pageViews: 1398, sessions: 1200 },
  { name: "Mar", users: 200, pageViews: 9800, sessions: 5200 },
  { name: "Apr", users: 278, pageViews: 3908, sessions: 2800 },
  { name: "May", users: 189, pageViews: 4800, sessions: 3100 },
  { name: "Jun", users: 239, pageViews: 3800, sessions: 2500 },
];

const engagementData = [
  { name: "Campaigns", value: 65 },
  { name: "Social", value: 15 },
  { name: "Direct", value: 10 },
  { name: "Referral", value: 10 },
];

export default function AdminAnalytics() {
  return (
    <PageErrorBoundary pageName="Analytics Dashboard">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Analyze platform performance, user engagement, and business metrics.
          </p>
        </div>

        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <AreaChart className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="engagement" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Engagement
            </TabsTrigger>
            <TabsTrigger value="conversion" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Conversion
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>User activity and page performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" />
                    <Line type="monotone" dataKey="pageViews" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="sessions" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>How users interact with your platform</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={performanceData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="sessions" fill="#8884d8" />
                    <Bar dataKey="users" fill="#82ca9d" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="conversion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Metrics</CardTitle>
                <CardDescription>Lead and customer conversion data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Source Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-muted-foreground">
                          Chart data visualization will be displayed here
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Conversion Rate</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center text-muted-foreground">
                          Chart data visualization will be displayed here
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageErrorBoundary>
  );
}
