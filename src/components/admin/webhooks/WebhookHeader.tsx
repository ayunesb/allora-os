import React from 'react';
import { Webhook } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBreakpoint } from "@/hooks/use-mobile";
const WebhookHeader = ({ activeTab, onTabChange }) => {
    const breakpoint = useBreakpoint();
    const isMobileView = ['xs', 'sm', 'mobile'].includes(breakpoint);
    return (<>
      <CardTitle className="flex items-center gap-2">
        <Webhook className="h-5 w-5"/>
        Webhooks
      </CardTitle>
      <CardDescription>
        Configure and monitor webhook endpoints for service integrations
      </CardDescription>
      
      <Tabs defaultValue="config" value={activeTab} onValueChange={onTabChange} className="w-full">
        <TabsList className={`${isMobileView ? 'w-full mt-2 overflow-x-auto scrollbar-thin' : 'w-auto'}`}>
          <TabsTrigger value="config" className={isMobileView ? 'flex-1 text-sm px-3' : ''}>
            {isMobileView ? 'Config' : 'Configuration'}
          </TabsTrigger>
          <TabsTrigger value="history" className={isMobileView ? 'flex-1 text-sm px-3' : ''}>
            {isMobileView ? 'History' : 'Event History'}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>);
};
export default WebhookHeader;
