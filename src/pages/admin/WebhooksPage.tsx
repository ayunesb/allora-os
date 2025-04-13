
import React from "react";
import { WebhookHeader } from "@/components/admin/webhooks";
import { WebhookConfigTab } from "@/components/admin/webhooks/config";
import { WebhookHistoryContent } from "@/components/admin/webhooks/history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WebhooksPage() {
  return (
    <div className="space-y-6">
      <WebhookHeader />
      
      <Tabs defaultValue="config" className="space-y-4">
        <TabsList>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="config" className="space-y-4">
          <WebhookConfigTab />
        </TabsContent>
        
        <TabsContent value="history">
          <WebhookHistoryContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
