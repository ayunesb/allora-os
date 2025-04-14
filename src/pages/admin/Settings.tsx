
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar"; // Changed from { Navbar } to default import
import AdminSettingsProvider from '@/components/admin/settings/AdminSettingsProvider';
import APIKeysTab from '@/components/admin/APIKeysTab';
import WebhooksTab from '@/components/admin/WebhooksTab';
import { SecurityTab } from '@/components/admin/security';
import NotificationsTab from '@/components/admin/NotificationsTab';
import { useBreakpoint } from "@/hooks/use-mobile";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<string>("api-keys");
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const isTabletView = breakpoint === 'tablet';
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar /> {/* Removed isLoggedIn prop since it's not expected by the component */}
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure the Allora AI platform
          </p>
        </div>
        
        <AdminSettingsProvider>
          {({ companyId, isLoading, apiKeys, securitySettings }) => (
            <Tabs defaultValue="api-keys" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className={`mb-6 ${isMobileView ? 'w-full tabs-scrollable flex' : isTabletView ? 'tabs-flex-wrap' : ''}`}>
                <TabsTrigger 
                  value="api-keys" 
                  className={isMobileView ? 'text-xs flex-1 tab-compact' : isTabletView ? 'text-sm' : ''}
                >
                  API Keys
                </TabsTrigger>
                <TabsTrigger 
                  value="webhooks" 
                  className={isMobileView ? 'text-xs flex-1 tab-compact' : isTabletView ? 'text-sm' : ''}
                >
                  Webhooks
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className={isMobileView ? 'text-xs flex-1 tab-compact' : isTabletView ? 'text-sm' : ''}
                >
                  Security
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className={isMobileView ? 'text-xs flex-1 tab-compact' : isTabletView ? 'text-sm' : ''}
                >
                  Notifications
                </TabsTrigger>
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
