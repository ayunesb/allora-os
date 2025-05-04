import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, Download, RefreshCw } from "lucide-react";
export default function AdminAnalytics() {
    return (<div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TypographyH1>Analytics Dashboard</TypographyH1>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Calendar className="h-4 w-4 mr-2"/>
            Date Range
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2"/>
            Export
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <RefreshCw className="h-4 w-4 mr-2"/>
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,243</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,872</div>
            <p className="text-xs text-muted-foreground mt-1">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Session Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14m 32s</div>
            <p className="text-xs text-muted-foreground mt-1">+2m from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.28%</div>
            <p className="text-xs text-muted-foreground mt-1">+0.4% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full max-w-md mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="ai">AI Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:row-span-2">
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Daily active users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border border-dashed rounded-lg">
                  <p className="text-muted-foreground">Activity chart will display here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Features</CardTitle>
                <CardDescription>Most used platform features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[180px] flex items-center justify-center border border-dashed rounded-lg">
                  <p className="text-muted-foreground">Feature usage chart will display here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Geographical Distribution</CardTitle>
                <CardDescription>User distribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[180px] flex items-center justify-center border border-dashed rounded-lg">
                  <p className="text-muted-foreground">Map visualization will display here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Demographics</CardTitle>
              <CardDescription>User analysis by demographics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border border-dashed rounded-lg">
                <p className="text-muted-foreground">Demographics charts will display here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>User engagement with platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border border-dashed rounded-lg">
                <p className="text-muted-foreground">Engagement metrics will display here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Performance Metrics</CardTitle>
              <CardDescription>Performance of AI components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border border-dashed rounded-lg">
                <p className="text-muted-foreground">AI performance metrics will display here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);
}
