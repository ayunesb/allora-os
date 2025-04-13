
// Import necessary modules and components
import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { WebhookHistoryContent } from "@/components/admin/webhooks/history/WebhookHistoryContent";
import WebhookConfigTab from "@/components/admin/webhooks/config/WebhookConfigTab";
import { CalendarIcon } from "lucide-react";
import { format } from 'date-fns';
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { WebhookType } from "@/utils/webhookValidation";
import { useWebhooks } from "@/components/admin/webhooks/useWebhooks";
import { useWebhookValidation } from "@/components/admin/webhooks/useWebhookValidation";

const WebhooksPage = () => {
  const [activeTab, setActiveTab] = useState("config");
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [paginatedEvents, setPaginatedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [statusOptions, setStatusOptions] = useState(['success', 'failed', 'pending']);
  const [typeOptions, setTypeOptions] = useState(['stripe', 'zapier', 'github', 'slack', 'custom']);
  const [eventTypeOptions, setEventTypeOptions] = useState(['payment.success', 'payment.failed', 'order.created']);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const { toast } = useToast();

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
  const { isValid: isStripeWebhookValid } = useWebhookValidation('stripe');
  const { isValid: isZapierWebhookValid } = useWebhookValidation('zapier');
  const { isValid: isGithubWebhookValid } = useWebhookValidation('github');
  const { isValid: isSlackWebhookValid } = useWebhookValidation('slack');
  const { isValid: isCustomWebhookValid } = useWebhookValidation('custom');

  // Mock event data with the required properties
  const mockEvents = [
    {
      id: '1',
      webhookType: 'stripe' as WebhookType,
      eventType: 'payment.success',
      targetUrl: 'https://api.example.com/webhooks/stripe',
      source: 'stripe',
      status: 'success',
      timestamp: '2025-03-15T10:30:00Z',
      payload: { data: 'payment data' },
      response: { status: '200' }
    },
    // Add more mock events as needed with the correct types
  ];

  const handleFilterEvents = () => {
    console.log('Filtering events with:', {
      selectedStatus,
      selectedType,
      selectedEventType,
      searchQuery,
      startDate,
      endDate
    });
  };

  const handleClearFilters = () => {
    console.log('Clearing all filters');
  };

  const handleSave = () => {
    handleSaveWebhooks(
      isStripeWebhookValid, 
      isZapierWebhookValid,
      isGithubWebhookValid,
      isSlackWebhookValid,
      isCustomWebhookValid
    );
  };

  // When rendering the WebhookHistoryContent component, add the onPageChange prop
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
            isLoading={false}
            searchTerm={searchQuery}
            setSearchTerm={setSearchQuery}
            statusFilter={selectedStatus}
            setStatusFilter={setSelectedStatus}
            typeFilter={selectedType}
            setTypeFilter={setSelectedType}
            currentPage={currentPage}
            totalPages={5}
            pageSize={itemsPerPage}
            handlePageChange={(page) => setCurrentPage(page)}
            webhookTypes={typeOptions}
            handleExportHistory={() => console.log('Export clicked')}
            handleClearHistory={() => console.log('Clear clicked')}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebhooksPage;
