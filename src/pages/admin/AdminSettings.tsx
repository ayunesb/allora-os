
import React from "react";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Settings, Shield, Bell, Webhook } from "lucide-react";
import WebhooksTab from "@/components/admin/WebhooksTab";
import { SecurityTab } from "@/components/admin/security";
import { NotificationsTab } from "@/components/admin/NotificationsTab";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = React.useState("webhooks");

  return (
    <PageErrorBoundary pageName="Admin Settings">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your application settings, webhooks, and integrations.
          </p>
        </div>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="webhooks" className="flex items-center gap-2">
              <Webhook className="h-4 w-4" />
              <span className="hidden sm:inline">Webhooks</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="webhooks" className="space-y-4">
            <WebhooksTab />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <SecurityTab />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </div>
    </PageErrorBoundary>
  );
}
