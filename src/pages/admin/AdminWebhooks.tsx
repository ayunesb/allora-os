import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ArrowRight, Webhook, Link } from "lucide-react";
export default function AdminWebhooks() {
    return (<div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TypographyH1>Webhook Management</TypographyH1>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2"/>
          Add Webhook
        </Button>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full max-w-md mb-4">
          <TabsTrigger value="active" className="flex-1">Active Webhooks</TabsTrigger>
          <TabsTrigger value="logs" className="flex-1">History</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Webhook className="h-5 w-5 mr-2 text-primary"/>
                  System Events
                </CardTitle>
                <CardDescription>
                  Webhook URLs for system-level events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-events">User Events</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="user-events" placeholder="https://your-server.com/webhooks/users"/>
                      <Button variant="outline" size="sm">Test</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="system-events">System Events</Label>
                    <div className="flex items-center space-x-2">
                      <Input id="system-events" placeholder="https://your-server.com/webhooks/system"/>
                      <Button variant="outline" size="sm">Test</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Link className="h-5 w-5 mr-2 text-primary"/>
                  Integration Webhooks
                </CardTitle>
                <CardDescription>
                  Connect third-party services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-between">
                    Connect to Zapier
                    <ArrowRight className="h-4 w-4 ml-2"/>
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-between">
                    Connect to Slack
                    <ArrowRight className="h-4 w-4 ml-2"/>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Webhook History</CardTitle>
              <CardDescription>
                Recent webhook events and their delivery status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TypographyP>
                No webhook events recorded yet. They will appear here once activity begins.
              </TypographyP>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Settings</CardTitle>
              <CardDescription>
                Configure your webhook handling preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="retry-attempts">Retry Attempts</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="retry-attempts" type="number" defaultValue={3} className="w-20"/>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="timeout">Request Timeout (ms)</Label>
                  <div className="flex items-center space-x-2">
                    <Input id="timeout" type="number" defaultValue={3000} className="w-20"/>
                  </div>
                </div>
                
                <Button className="mt-4">Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);
}
