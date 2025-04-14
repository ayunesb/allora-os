
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TypographyH1, TypographyP, TypographySmall } from "@/components/ui/typography";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Server, Database, RefreshCw, Clock, Cpu } from "lucide-react";

export default function AdminSystemHealth() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TypographyH1>System Health</TypographyH1>
        <Button variant="outline" className="w-full sm:w-auto">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Server className="h-4 w-4 mr-2 text-primary" />
              API Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30">
                Operational
              </Badge>
              <TypographySmall>100% uptime</TypographySmall>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Database className="h-4 w-4 mr-2 text-primary" />
              Database
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30">
                Operational
              </Badge>
              <TypographySmall>99.9% uptime</TypographySmall>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2 text-primary" />
              AI Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30">
                Degraded
              </Badge>
              <TypographySmall>95.5% uptime</TypographySmall>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30">
                145ms
              </Badge>
              <TypographySmall>-5% from avg</TypographySmall>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full max-w-md mb-4">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="performance" className="flex-1">Performance</TabsTrigger>
          <TabsTrigger value="logs" className="flex-1">System Logs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>
                Current status of all application components
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Server className="h-4 w-4 mr-2" />
                    API Services
                  </span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Healthy</Badge>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Database className="h-4 w-4 mr-2" />
                    Database Connectivity
                  </span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Healthy</Badge>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Activity className="h-4 w-4 mr-2" />
                    AI Processing
                  </span>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">Degraded</Badge>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Cpu className="h-4 w-4 mr-2" />
                    Server Resources
                  </span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Healthy</Badge>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                System performance over the last 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-lg">
                <TypographyP>Performance metrics chart will be displayed here</TypographyP>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
              <CardDescription>
                Recent system events and errors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left font-medium">Timestamp</th>
                        <th className="px-4 py-3 text-left font-medium">Level</th>
                        <th className="px-4 py-3 text-left font-medium">Service</th>
                        <th className="px-4 py-3 text-left font-medium">Message</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">2025-04-14 08:45:22</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">INFO</Badge>
                        </td>
                        <td className="px-4 py-3">API</td>
                        <td className="px-4 py-3">System startup complete</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">2025-04-14 08:47:15</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">WARN</Badge>
                        </td>
                        <td className="px-4 py-3">AI Service</td>
                        <td className="px-4 py-3">High latency detected in model responses</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap">2025-04-14 09:12:33</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">INFO</Badge>
                        </td>
                        <td className="px-4 py-3">Database</td>
                        <td className="px-4 py-3">Scheduled backup completed successfully</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
