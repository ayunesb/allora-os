
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useUserPreferences } from "@/hooks/useUserPreferences";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

// Import our new component tabs
import AccountTab from "@/components/settings/AccountTab";
import NotificationsTab from "@/components/settings/NotificationsTab";
import DevelopmentToolsTab from "@/components/settings/DevelopmentToolsTab";
import MarketingPlatformIntegrations from "@/components/integrations/MarketingPlatformIntegrations";
import { LinkedInIntegration } from "@/components/linkedin/LinkedInIntegration";

export default function Settings() {
  const { user, profile } = useAuth();
  const { preferences, isLoading: prefsLoading, updatePreference } = useUserPreferences();
  
  const isAdmin = profile?.role === 'admin';

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-muted-foreground mb-8">Manage your preferences and system settings</p>

      <Tabs defaultValue="account">
        <TabsList className="mb-8">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="development" className="flex items-center gap-2">
              Development
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 text-xs">
                Admin Only
              </Badge>
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="account">
          <AccountTab />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationsTab />
        </TabsContent>
        
        <TabsContent value="integrations">
          <div className="grid gap-8">
            <MarketingPlatformIntegrations />
            <LinkedInIntegration />
          </div>
        </TabsContent>
        
        {isAdmin && (
          <TabsContent value="development">
            <DevelopmentToolsTab />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
