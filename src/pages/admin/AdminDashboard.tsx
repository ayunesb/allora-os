
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Activity, Users, Database, Shield, Server } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <TypographyH1>Admin Dashboard</TypographyH1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">5,243</div>
              <Users className="h-5 w-5 text-muted-foreground" />
            </div>
            <TypographyP className="text-xs mt-1">+12% from last month</TypographyP>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">99.98%</div>
              <Server className="h-5 w-5 text-muted-foreground" />
            </div>
            <TypographyP className="text-xs mt-1">Last 30 days</TypographyP>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">AI Executions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">18,432</div>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <TypographyP className="text-xs mt-1">+28% from last month</TypographyP>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Security Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-green-500">Secure</div>
              <Shield className="h-5 w-5 text-green-500" />
            </div>
            <TypographyP className="text-xs mt-1">All systems protected</TypographyP>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
            <CardDescription>Overview of platform usage and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border border-dashed rounded-lg">
              <TypographyP>Activity chart will display here</TypographyP>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Database className="h-4 w-4 mr-2" />
              Database Management
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Security Dashboard
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Activity className="h-4 w-4 mr-2" />
              View System Logs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
