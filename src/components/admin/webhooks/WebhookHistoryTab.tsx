
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useWebhookHistory } from './useWebhookHistory';
import { Spinner } from '@/components/ui/spinner';

const WebhookHistoryTab: React.FC = () => {
  const {
    events,
    filteredEvents,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedEvents
  } = useWebhookHistory();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive p-4">
        Error loading webhook history
      </div>
    );
  }

  return (
    <CardContent>
      <div className="mb-4">
        <h3 className="text-lg font-medium">Webhook History</h3>
        <p className="text-sm text-muted-foreground">
          View and manage your webhook event history
        </p>
      </div>
      
      {events.length === 0 ? (
        <div className="text-center p-8 border rounded-md bg-muted/30">
          <p>No webhook events found</p>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <p>Total events: {events.length}</p>
          </div>
          
          {/* Event list would go here */}
          <pre className="p-4 bg-muted rounded-md overflow-auto max-h-64">
            {JSON.stringify(paginatedEvents, null, 2)}
          </pre>
        </div>
      )}
    </CardContent>
  );
};

export default WebhookHistoryTab;
