
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure the Allora AI platform
          </p>
        </div>
        
        <Tabs defaultValue="api-keys">
          <TabsList className="mb-6">
            <TabsTrigger value="api-keys">API Keys</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="api-keys">
            <Card>
              <CardHeader>
                <CardTitle>API Keys Configuration</CardTitle>
                <CardDescription>
                  Manage integration keys for external services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="stripe-key">Stripe API Key</Label>
                  <Input id="stripe-key" type="password" placeholder="sk_test_..." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twilio-sid">Twilio Account SID</Label>
                  <Input id="twilio-sid" placeholder="AC..." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twilio-token">Twilio Auth Token</Label>
                  <Input id="twilio-token" type="password" placeholder="********" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="heygen-key">Heygen API Key</Label>
                  <Input id="heygen-key" type="password" placeholder="********" />
                </div>
                
                <Button>Save API Configuration</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="webhooks">
            <Card>
              <CardHeader>
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>
                  Configure webhook endpoints for events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="stripe-webhook">Stripe Webhook URL</Label>
                  <Input id="stripe-webhook" placeholder="https://your-domain.com/api/webhooks/stripe" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
                  <Input id="zapier-webhook" placeholder="https://hooks.zapier.com/hooks/catch/..." />
                </div>
                
                <Button>Save Webhook Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Require 2FA for all admin users
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout">Extended Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase session duration to 24 hours
                    </p>
                  </div>
                  <Switch id="session-timeout" />
                </div>
                
                <Button>Save Security Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Configure system notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email for important system events
                    </p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send text messages for critical alerts
                    </p>
                  </div>
                  <Switch id="sms-notifications" />
                </div>
                
                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
