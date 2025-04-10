
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";
import { useWebhookHistory } from './useWebhookHistory';
import { useWebhookHistoryFilters } from './history/useWebhookHistoryFilters';
import { WebhookHistoryContent } from './history/WebhookHistoryContent';

/**
 * Component for displaying webhook event history with filtering and pagination
 */
const WebhookHistoryTab: React.FC = () => {
  const PAGE_SIZE = 10;

  // Get webhook events from the hook
  const { 
    webhookEvents, 
    isLoading, 
    clearHistory, 
    exportHistory 
  } = useWebhookHistory();

  // Use the filter hook to manage filtering and pagination
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    currentPage,
    webhookTypes,
    filteredEvents,
    paginatedEvents,
    totalPages,
    pageSize,
    handlePageChange
  } = useWebhookHistoryFilters(webhookEvents, PAGE_SIZE);

  const handleExportHistory = () => {
    exportHistory();
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all webhook history? This action cannot be undone.')) {
      clearHistory();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Webhook Event History
        </CardTitle>
        <CardDescription>
          View and analyze past webhook events, their status, and payloads
        </CardDescription>
      </CardHeader>
      <CardContent>
        <WebhookHistoryContent 
          webhookEvents={webhookEvents}
          filteredEvents={filteredEvents}
          paginatedEvents={paginatedEvents}
          isLoading={isLoading}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
          webhookTypes={webhookTypes}
          handleExportHistory={handleExportHistory}
          handleClearHistory={handleClearHistory}
        />
      </CardContent>
    </Card>
  );
};

export default WebhookHistoryTab;
