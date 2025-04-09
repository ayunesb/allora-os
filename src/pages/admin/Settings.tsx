
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import AdminSettingsProvider from '@/components/admin/settings/AdminSettingsProvider';
import APIKeysTab from '@/components/admin/APIKeysTab';
import WebhooksTab from '@/components/admin/WebhooksTab';
import SecurityTab from '@/components/admin/SecurityTab';
import NotificationsTab from '@/components/admin/NotificationsTab';

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
        
        <AdminSettingsProvider>
          {({ companyId, isLoading, apiKeys, securitySettings }) => (
            <Tabs defaultValue="api-keys">
              <TabsList className="mb-6">
                <TabsTrigger value="api-keys">API Keys</TabsTrigger>
                <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="api-keys">
                <APIKeysTab 
                  companyId={companyId} 
                  initialApiKeys={apiKeys}
                  isLoading={isLoading}
                />
              </TabsContent>
              
              <TabsContent value="webhooks">
                <WebhooksTab />
              </TabsContent>
              
              <TabsContent value="security">
                <SecurityTab 
                  initialSettings={securitySettings}
                />
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationsTab />
              </TabsContent>
            </Tabs>
          )}
        </AdminSettingsProvider>
      </div>
    </div>
  );
}
