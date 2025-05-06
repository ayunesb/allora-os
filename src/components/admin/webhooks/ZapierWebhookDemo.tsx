import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useZapier } from "@/hooks/useZapier";
import ManualTriggerContent from "./zapier-demo/ManualTriggerContent";
import BusinessEventContent from "./zapier-demo/BusinessEventContent";
const ZapierWebhookDemo = ({ webhookUrl }) => {
  const [activeTab, setActiveTab] = useState("manual");
  const { isLoading, triggerBusinessEvent } = useZapier();
  const handleManualTrigger = async () => {
    if (!webhookUrl) return;
    await triggerBusinessEvent(webhookUrl, "test_webhook", {
      message: "This is a manual trigger test",
      timestamp: new Date().toISOString(),
      triggered_by: "manual-demo",
    });
  };
  const handleBusinessEventTrigger = async (eventType, payload) => {
    if (!webhookUrl) return;
    await triggerBusinessEvent(webhookUrl, eventType, payload);
  };
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Test Zapier Integration</h3>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual">Simple Trigger</TabsTrigger>
          <TabsTrigger value="business">Business Events</TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="mt-4">
          <ManualTriggerContent
            webhookUrl={webhookUrl}
            onTrigger={handleManualTrigger}
            isLoading={isLoading}
          />
        </TabsContent>

        <TabsContent value="business" className="mt-4">
          <BusinessEventContent
            webhookUrl={webhookUrl}
            onTrigger={handleBusinessEventTrigger}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
export default ZapierWebhookDemo;
