import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIContentGenerator } from "@/components/content-generation/AIContentGenerator";
import { MarketingPlatformIntegrations } from "@/components/integrations/MarketingPlatformIntegrations";
import { CustomerJourneyMapper } from "@/components/customer-journey/CustomerJourneyMapper";
export default function MarketingTools() {
  const [activeTab, setActiveTab] = useState("content-generation");
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Marketing Tools</h1>
      <p className="text-muted-foreground mb-6">
        Advanced tools to enhance your marketing capabilities
      </p>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content-generation">
            Content Generation
          </TabsTrigger>
          <TabsTrigger value="platform-integrations">
            Platform Integrations
          </TabsTrigger>
          <TabsTrigger value="customer-journey">Customer Journey</TabsTrigger>
        </TabsList>

        <TabsContent value="content-generation" className="space-y-4">
          <AIContentGenerator />
        </TabsContent>

        <TabsContent value="platform-integrations" className="space-y-4">
          <MarketingPlatformIntegrations />
        </TabsContent>

        <TabsContent value="customer-journey" className="space-y-4">
          <CustomerJourneyMapper />
        </TabsContent>
      </Tabs>
    </div>
  );
}
