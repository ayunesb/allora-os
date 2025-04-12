
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ManualTriggerContent } from './ManualTriggerContent';
import { BusinessEventContent } from './BusinessEventContent';
import { useBreakpoint } from "@/hooks/use-mobile";

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
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  return (
    <Tabs defaultValue="business" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className={`mb-4 ${isMobileView ? 'w-full' : ''}`}>
        <TabsTrigger 
          value="business" 
          className={isMobileView ? 'flex-1 text-sm' : ''}
        >
          Business Events
        </TabsTrigger>
        <TabsTrigger 
          value="manual" 
          className={isMobileView ? 'flex-1 text-sm' : ''}
        >
          Manual Triggers
        </TabsTrigger>
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
