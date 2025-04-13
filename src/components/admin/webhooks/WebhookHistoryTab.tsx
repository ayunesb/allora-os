
import React from 'react';
import { CardContent } from "@/components/ui/card";
import { WebhookHistoryContent } from './history/WebhookHistoryContent';
import { useWebhookHistory } from './useWebhookHistory';
import { useBreakpoint } from '@/hooks/use-mobile';

const WebhookHistoryTab = () => {
  const { 
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
  } = useWebhookHistory();
  
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  return (
    <CardContent className={isMobileView ? 'p-2' : ''}>
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
  );
};

export default WebhookHistoryTab;
