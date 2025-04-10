
import React from 'react';
import { Webhook } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WebhookHeaderProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const WebhookHeader: React.FC<WebhookHeaderProps> = ({ activeTab, onTabChange }) => {
  return (
    <>
      <CardTitle className="flex items-center gap-2">
        <Webhook className="h-5 w-5" />
        Webhooks
      </CardTitle>
      <CardDescription>
        Configure and monitor webhook endpoints for service integrations
      </CardDescription>
      
      <Tabs defaultValue="config" value={activeTab} onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="history">Event History</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};

export default WebhookHeader;
