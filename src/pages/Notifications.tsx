import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
export default function Notifications() {
    const [emailNotifications, setEmailNotifications] = useState({
        marketingEmails: true,
        productUpdates: true,
        securityAlerts: true,
        recommendationAlerts: false,
        weeklyDigest: true,
    });
    const [pushNotifications, setPushNotifications] = useState({
        newStrategies: true,
        newLeads: true,
        campaignUpdates: true,
        executiveDebates: false,
        systemAlerts: true,
    });
    const handleSaveSettings = () => {
        toast.success("Notification settings saved successfully");
    };
    return (<>
      <Helmet>
        <title>Notifications - Allora AI</title>
      </Helmet>
      <PageErrorBoundary pageName="Notifications">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold tracking-tight mb-6">Notifications</h1>
          <p className="text-muted-foreground mb-8">Manage your notification preferences and view recent alerts</p>
          
          <Tabs defaultValue="settings" className="space-y-4">
            <TabsList>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="history">Notification History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="marketing" className="flex flex-col space-y-1">
                      <span>Marketing Emails</span>
                      <span className="font-normal text-sm text-muted-foreground">Receive updates about new features and promotions</span>
                    </Label>
                    <Switch id="marketing" checked={emailNotifications.marketingEmails} onCheckedChange={(checked) => setEmailNotifications(prev => ({ ...prev, marketingEmails: checked }))}/>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="product-updates" className="flex flex-col space-y-1">
                      <span>Product Updates</span>
                      <span className="font-normal text-sm text-muted-foreground">Get notified about new platform features</span>
                    </Label>
                    <Switch id="product-updates" checked={emailNotifications.productUpdates} onCheckedChange={(checked) => setEmailNotifications(prev => ({ ...prev, productUpdates: checked }))}/>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="security" className="flex flex-col space-y-1">
                      <span>Security Alerts</span>
                      <span className="font-normal text-sm text-muted-foreground">Important security related notifications</span>
                    </Label>
                    <Switch id="security" checked={emailNotifications.securityAlerts} onCheckedChange={(checked) => setEmailNotifications(prev => ({ ...prev, securityAlerts: checked }))}/>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="recommendations" className="flex flex-col space-y-1">
                      <span>Recommendation Alerts</span>
                      <span className="font-normal text-sm text-muted-foreground">Get notified when new AI recommendations are available</span>
                    </Label>
                    <Switch id="recommendations" checked={emailNotifications.recommendationAlerts} onCheckedChange={(checked) => setEmailNotifications(prev => ({ ...prev, recommendationAlerts: checked }))}/>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="digest" className="flex flex-col space-y-1">
                      <span>Weekly Digest</span>
                      <span className="font-normal text-sm text-muted-foreground">Weekly summary of activities and insights</span>
                    </Label>
                    <Switch id="digest" checked={emailNotifications.weeklyDigest} onCheckedChange={(checked) => setEmailNotifications(prev => ({ ...prev, weeklyDigest: checked }))}/>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Push Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-strategies" className="flex flex-col space-y-1">
                      <span>New Strategies</span>
                      <span className="font-normal text-sm text-muted-foreground">Get notified when new strategies are proposed</span>
                    </Label>
                    <Switch id="new-strategies" checked={pushNotifications.newStrategies} onCheckedChange={(checked) => setPushNotifications(prev => ({ ...prev, newStrategies: checked }))}/>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="new-leads" className="flex flex-col space-y-1">
                      <span>New Leads</span>
                      <span className="font-normal text-sm text-muted-foreground">Get notified when new leads come in</span>
                    </Label>
                    <Switch id="new-leads" checked={pushNotifications.newLeads} onCheckedChange={(checked) => setPushNotifications(prev => ({ ...prev, newLeads: checked }))}/>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="campaign-updates" className="flex flex-col space-y-1">
                      <span>Campaign Updates</span>
                      <span className="font-normal text-sm text-muted-foreground">Get notified about your campaign performance</span>
                    </Label>
                    <Switch id="campaign-updates" checked={pushNotifications.campaignUpdates} onCheckedChange={(checked) => setPushNotifications(prev => ({ ...prev, campaignUpdates: checked }))}/>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="executive-debates" className="flex flex-col space-y-1">
                      <span>Executive Debates</span>
                      <span className="font-normal text-sm text-muted-foreground">Get notified when AI executives have new debates</span>
                    </Label>
                    <Switch id="executive-debates" checked={pushNotifications.executiveDebates} onCheckedChange={(checked) => setPushNotifications(prev => ({ ...prev, executiveDebates: checked }))}/>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-alerts" className="flex flex-col space-y-1">
                      <span>System Alerts</span>
                      <span className="font-normal text-sm text-muted-foreground">Important system notifications</span>
                    </Label>
                    <Switch id="system-alerts" checked={pushNotifications.systemAlerts} onCheckedChange={(checked) => setPushNotifications(prev => ({ ...prev, systemAlerts: checked }))}/>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-end">
                <Button onClick={handleSaveSettings} className="gap-2">
                  <Save className="h-4 w-4"/>
                  Save Settings
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Notification History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    No notifications yet. They will appear here once you receive them.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </PageErrorBoundary>
    </>);
}
