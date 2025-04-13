
import React, { useState } from "react";
import { WebhookHeader, WebhookConfigTab, WebhookHistoryContent } from "@/components/admin/webhooks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function WebhooksPage() {
  const [activeTab, setActiveTab] = useState("config");
  const [mockWebhookData, setMockWebhookData] = useState({
    stripeWebhook: "https://api.example.com/webhooks/stripe",
    zapierWebhook: "https://hooks.zapier.com/hooks/catch/123456/abcdef/",
    githubWebhook: "https://api.example.com/webhooks/github",
    slackWebhook: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
    customWebhook: "https://api.example.com/webhooks/custom",
  });
  
  // Mock data for webhook history
  const mockWebhookEvents = Array(10).fill(null).map((_, index) => ({
    id: `event-${index}`,
    source: ['stripe', 'zapier', 'github', 'slack', 'custom'][index % 5],
    status: ['success', 'error', 'pending'][index % 3],
    timestamp: new Date(Date.now() - index * 3600000).toISOString(),
    payload: { data: `Sample payload ${index}` },
    response: { status: index % 3 === 0 ? 'error' : 'success' }
  }));
  
  return (
    <div className="space-y-6">
      <WebhookHeader 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="config" className="space-y-4">
          <WebhookConfigTab 
            stripeWebhook={mockWebhookData.stripeWebhook}
            zapierWebhook={mockWebhookData.zapierWebhook}
            githubWebhook={mockWebhookData.githubWebhook}
            slackWebhook={mockWebhookData.slackWebhook}
            customWebhook={mockWebhookData.customWebhook}
            onStripeWebhookChange={(val) => setMockWebhookData(prev => ({...prev, stripeWebhook: val}))}
            onZapierWebhookChange={(val) => setMockWebhookData(prev => ({...prev, zapierWebhook: val}))}
            onGithubWebhookChange={(val) => setMockWebhookData(prev => ({...prev, githubWebhook: val}))}
            onSlackWebhookChange={(val) => setMockWebhookData(prev => ({...prev, slackWebhook: val}))}
            onCustomWebhookChange={(val) => setMockWebhookData(prev => ({...prev, customWebhook: val}))}
            onTestStripeWebhook={() => Promise.resolve(true)}
            onTestZapierWebhook={() => Promise.resolve(true)}
            onTestGithubWebhook={() => Promise.resolve(true)}
            onTestSlackWebhook={() => Promise.resolve(true)}
            onTestCustomWebhook={() => Promise.resolve(true)}
            onSave={() => Promise.resolve(true)}
            isSaving={false}
            testingWebhook=""
            testLoading={false}
            isStripeWebhookValid={true}
            isZapierWebhookValid={true}
            isGithubWebhookValid={true}
            isSlackWebhookValid={true}
            isCustomWebhookValid={true}
          />
        </TabsContent>
        
        <TabsContent value="history">
          <WebhookHistoryContent 
            webhookEvents={mockWebhookEvents}
            filteredEvents={mockWebhookEvents}
            paginatedEvents={mockWebhookEvents.slice(0, 5)}
            isLoading={false}
            currentPage={1}
            totalPages={2}
            onPageChange={() => {}}
            onFilterChange={() => {}}
            onDateRangeChange={() => {}}
            onStatusChange={() => {}}
            onSourceChange={() => {}}
            onClearFilters={() => {}}
            onRefresh={() => {}}
            filters={{
              startDate: null,
              endDate: null,
              status: null,
              source: null,
              search: ''
            }}
            onViewDetails={() => {}}
            onResend={() => {}}
            selectedEvent={null}
            onCloseDetails={() => {}}
            isResending={false}
            sortOrder="desc"
            sortBy="timestamp"
            onSort={() => {}}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
