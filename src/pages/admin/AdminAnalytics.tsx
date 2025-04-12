
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, BarChart, PieChart } from 'lucide-react';

export default function AdminAnalytics() {
  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">System Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Monitor system performance and user engagement metrics
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <LineChart className="h-4 w-4 mr-2 text-primary" />
              User Activity
            </CardTitle>
            <CardDescription>Daily active users</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Analytics visualization would appear here</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <BarChart className="h-4 w-4 mr-2 text-primary" />
              Feature Usage
            </CardTitle>
            <CardDescription>Most used platform features</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Analytics visualization would appear here</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-md flex items-center">
              <PieChart className="h-4 w-4 mr-2 text-primary" />
              Subscription Distribution
            </CardTitle>
            <CardDescription>Plans by user count</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Analytics visualization would appear here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
