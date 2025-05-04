import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManualTriggerContent from './ManualTriggerContent';
import BusinessEventContent from './BusinessEventContent';
import { useBreakpoint } from "@/hooks/use-mobile";
export function ZapierWebhookDemoTabs({ webhookUrl, isTriggering, triggerSample, triggerBusinessSample }) {
    const [activeTab, setActiveTab] = React.useState("business");
    const breakpoint = useBreakpoint();
    const isMobileView = ['xs', 'mobile'].includes(breakpoint);
    return (<Tabs defaultValue="business" value={activeTab} onValueChange={setActiveTab}>
      <TabsList className={`mb-4 ${isMobileView ? 'w-full overflow-x-auto scrollbar-thin' : ''}`}>
        <TabsTrigger value="business" className={isMobileView ? 'flex-1 text-sm px-3 whitespace-nowrap' : ''}>
          Business Events
        </TabsTrigger>
        <TabsTrigger value="manual" className={isMobileView ? 'flex-1 text-sm px-3 whitespace-nowrap' : ''}>
          Manual Triggers
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="business" className="mt-0">
        <BusinessEventContent webhookUrl={webhookUrl} onTrigger={triggerBusinessSample} isLoading={false} isTriggering={isTriggering}/>
      </TabsContent>
      
      <TabsContent value="manual" className="mt-0">
        <ManualTriggerContent webhookUrl={webhookUrl} onTrigger={() => triggerSample('manual', { test: true })} isLoading={false} isTriggering={isTriggering}/>
      </TabsContent>
    </Tabs>);
}
export default ZapierWebhookDemoTabs;
