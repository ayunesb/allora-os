
import React from 'react';
import { WebhookEvent } from '../useWebhookHistory';
import WebhookEventTable from '../WebhookEventTable';
import { WebhookHistoryFilters } from './WebhookHistoryFilters';
import { WebhookHistoryPagination } from './WebhookHistoryPagination';

interface WebhookHistoryContentProps {
  webhookEvents: WebhookEvent[];
  filteredEvents: WebhookEvent[];
  paginatedEvents: WebhookEvent[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  typeFilter: string;
  setTypeFilter: (value: string) => void;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
  webhookTypes: string[];
  handleExportHistory: () => void;
  handleClearHistory: () => void;
}

export const WebhookHistoryContent: React.FC<WebhookHistoryContentProps> = ({
  webhookEvents,
  filteredEvents,
  paginatedEvents,
  isLoading,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  currentPage,
  totalPages,
  pageSize,
  handlePageChange,
  webhookTypes,
  handleExportHistory,
  handleClearHistory
}) => {
  return (
    <div className="space-y-6">
      <WebhookHistoryFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        webhookTypes={webhookTypes}
        filteredEventsCount={filteredEvents.length}
        totalCount={webhookEvents.length}
        currentPage={currentPage}
        pageSize={pageSize}
        handleExportHistory={handleExportHistory}
        handleClearHistory={handleClearHistory}
      />
      
      {/* Event table */}
      <WebhookEventTable 
        events={paginatedEvents} 
        isLoading={isLoading} 
      />
      
      {/* Pagination */}
      <WebhookHistoryPagination 
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};
