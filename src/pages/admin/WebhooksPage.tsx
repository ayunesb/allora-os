import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import WebhookConfigTab from "@/components/admin/webhooks/config/WebhookConfigTab";
import { WebhookHistoryContent } from "@/components/admin/webhooks/history/WebhookHistoryContent";
import { WebhookType } from "@/utils/webhookValidation";
import { useWebhooks } from "@/hooks/admin/useWebhooks";
import { useWebhookValidation } from "@/hooks/admin/useWebhookValidation";
import { WebhookEvent } from "@/types/webhooks";

/**
 * WebhooksPage Component
 * 
 * Provides an interface for configuring webhooks and viewing webhook event history.
 * Supports configuration for Stripe, Zapier, GitHub, Slack and custom webhooks.
 */
const WebhooksPage = () => {
  // Active tab state
  const [activeTab, setActiveTab] = useState("config");
  
  // Event pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Event data state
  const [allEvents, setAllEvents] = useState<WebhookEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<WebhookEvent[]>([]);
  const [paginatedEvents, setPaginatedEvents] = useState<WebhookEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  
  // Available options for filtering
  const statusOptions = ['success', 'failed', 'pending'];
  const typeOptions: WebhookType[] = ['stripe', 'zapier', 'github', 'slack', 'custom'];
  const eventTypeOptions = ['payment.success', 'payment.failed', 'order.created'];
  
  // Use the hooks to get webhook data and validation
  const {
    stripeWebhook,
    setStripeWebhook,
    zapierWebhook,
    setZapierWebhook,
    githubWebhook,
    setGithubWebhook,
    slackWebhook,
    setSlackWebhook,
    customWebhook,
    setCustomWebhook,
    isSaving,
    testLoading,
    testingWebhook,
    handleSaveWebhooks,
    handleTestZapierWebhook,
    handleTestGithubWebhook,
    handleTestSlackWebhook,
    handleTestCustomWebhook,
    handleTestStripeWebhook
  } = useWebhooks();

  // Validation hooks
  const { isValid: isStripeWebhookValid } = useWebhookValidation('stripe', stripeWebhook);
  const { isValid: isZapierWebhookValid } = useWebhookValidation('zapier', zapierWebhook);
  const { isValid: isGithubWebhookValid } = useWebhookValidation('github', githubWebhook);
  const { isValid: isSlackWebhookValid } = useWebhookValidation('slack', slackWebhook);
  const { isValid: isCustomWebhookValid } = useWebhookValidation('custom', customWebhook);

  // Mock event data for demonstration purposes
  useEffect(() => {
    const mockEvents: WebhookEvent[] = [
      {
        id: '1',
        webhookType: 'stripe',
        eventType: 'payment.success',
        targetUrl: 'https://api.example.com/webhooks/stripe',
        source: 'stripe',
        status: 'success',
        timestamp: '2025-03-15T10:30:00Z',
        payload: { data: 'payment data' },
        response: { status: '200' }
      },
      {
        id: '2',
        webhookType: 'zapier',
        eventType: 'lead.created',
        targetUrl: 'https://hooks.zapier.com/hooks/catch/123456/abcdef/',
        source: 'app',
        status: 'success',
        timestamp: '2025-03-14T14:45:00Z',
        payload: { data: 'lead data' },
        response: { status: '200' }
      },
      {
        id: '3',
        webhookType: 'github',
        eventType: 'push',
        targetUrl: 'https://api.github.com/webhooks/123',
        source: 'github',
        status: 'failed',
        timestamp: '2025-03-13T09:15:00Z',
        payload: { data: 'commit data' },
        response: { status: '400', error: 'Invalid payload' }
      }
    ];
    
    setAllEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);
  
  // Calculate paginated events whenever filtered events or pagination settings change
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedEvents(filteredEvents.slice(startIndex, endIndex));
  }, [filteredEvents, currentPage, itemsPerPage]);
  
  // Handle webhooks filter
  useEffect(() => {
    if (!allEvents.length) return;
    
    setIsLoading(true);
    
    // Apply filters
    let result = [...allEvents];
    
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(
        event => 
          event.webhookType.toLowerCase().includes(lowerCaseQuery) ||
          (event.eventType && event.eventType.toLowerCase().includes(lowerCaseQuery)) ||
          event.targetUrl.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    if (selectedStatus) {
      result = result.filter(event => event.status === selectedStatus);
    }
    
    if (selectedType) {
      result = result.filter(event => event.webhookType === selectedType);
    }
    
    // Set filtered events and reset to first page if filters changed
    setFilteredEvents(result);
    setCurrentPage(1);
    setIsLoading(false);
  }, [allEvents, searchQuery, selectedStatus, selectedType]);
  
  const handleFilterEvents = () => {
    console.log('Filtering events with:', {
      selectedStatus,
      selectedType,
      searchQuery
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedStatus('');
    setSelectedType('');
  };
  
  const handleExportHistory = useCallback(() => {
    toast({
      title: "Export Started",
      description: "Webhooks history export has started."
    });
    
    // In a real application, this would trigger an actual export process
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Webhooks history has been exported successfully."
      });
    }, 1500);
  }, [toast]);
  
  const handleClearHistory = useCallback(() => {
    toast({
      title: "Clear History",
      description: "This would clear all webhook history in a real application."
    });
  }, [toast]);

  const handleSave = () => {
    handleSaveWebhooks(
      isStripeWebhookValid, 
      isZapierWebhookValid,
      isGithubWebhookValid,
      isSlackWebhookValid,
      isCustomWebhookValid
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Webhooks</h1>
        <p className="text-muted-foreground">
          Manage and monitor incoming webhooks to your application
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="history">Event History</TabsTrigger>
        </TabsList>
        <TabsContent value="config">
          <WebhookConfigTab 
            stripeWebhook={stripeWebhook}
            zapierWebhook={zapierWebhook}
            githubWebhook={githubWebhook}
            slackWebhook={slackWebhook}
            customWebhook={customWebhook}
            onStripeWebhookChange={setStripeWebhook}
            onZapierWebhookChange={setZapierWebhook}
            onGithubWebhookChange={setGithubWebhook}
            onSlackWebhookChange={setSlackWebhook}
            onCustomWebhookChange={setCustomWebhook}
            onTestStripeWebhook={() => handleTestStripeWebhook(isStripeWebhookValid)}
            onTestZapierWebhook={() => handleTestZapierWebhook(isZapierWebhookValid)}
            onTestGithubWebhook={() => handleTestGithubWebhook(isGithubWebhookValid)}
            onTestSlackWebhook={() => handleTestSlackWebhook(isSlackWebhookValid)}
            onTestCustomWebhook={() => handleTestCustomWebhook(isCustomWebhookValid)}
            onSave={handleSave}
            isSaving={isSaving}
            testingWebhook={testingWebhook}
            testLoading={testLoading}
            isStripeWebhookValid={isStripeWebhookValid}
            isZapierWebhookValid={isZapierWebhookValid}
            isGithubWebhookValid={isGithubWebhookValid}
            isSlackWebhookValid={isSlackWebhookValid}
            isCustomWebhookValid={isCustomWebhookValid}
          />
        </TabsContent>
        <TabsContent value="history">
          <WebhookHistoryContent 
            webhookEvents={allEvents}
            filteredEvents={filteredEvents}
            paginatedEvents={paginatedEvents}
            isLoading={isLoading}
            searchTerm={searchQuery}
            setSearchTerm={setSearchQuery}
            statusFilter={selectedStatus}
            setStatusFilter={setSelectedStatus}
            typeFilter={selectedType}
            setTypeFilter={setSelectedType}
            currentPage={currentPage}
            totalPages={Math.ceil(filteredEvents.length / itemsPerPage)}
            pageSize={itemsPerPage}
            handlePageChange={setCurrentPage}
            webhookTypes={typeOptions}
            handleExportHistory={handleExportHistory}
            handleClearHistory={handleClearHistory}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebhooksPage;
