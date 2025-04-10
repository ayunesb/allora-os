
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ManualTriggerContent } from './ManualTriggerContent';
import { BusinessEventContent } from './BusinessEventContent';

interface ZapierWebhookDemoTabsProps {
  webhookUrl: string;
  isTriggering: string | null;
  triggerSample: (event: string, payload: Record<string, any>) => Promise<void>;
  triggerBusinessSample: (
    eventType: string, 
    payload: Record<string, any>
  ) => Promise<void>;
}

export function ZapierWebhookDemoTabs({
  webhookUrl,
  isTriggering,
  triggerSample,
  triggerBusinessSample
}: ZapierWebhookDemoTabsProps) {
  const [activeTab, setActiveTab] = React.useState<string>("business");
  
  return (
    <Tabs defaultValue="business" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="business">Business Events</TabsTrigger>
        <TabsTrigger value="manual">Manual Triggers</TabsTrigger>
      </TabsList>
      
      <TabsContent value="business" className="mt-0">
        <BusinessEventContent 
          webhookUrl={webhookUrl}
          isTriggering={isTriggering}
          triggerBusinessSample={triggerBusinessSample}
        />
      </TabsContent>
      
      <TabsContent value="manual" className="mt-0">
        <ManualTriggerContent 
          webhookUrl={webhookUrl}
          isTriggering={isTriggering}
          triggerSample={triggerSample}
        />
      </TabsContent>
    </Tabs>
  );
}
