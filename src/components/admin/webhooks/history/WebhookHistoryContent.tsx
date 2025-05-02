
import React, { useState, useEffect } from 'react';
import WebhookEventTable from './WebhookEventTable';
import WebhookEventFilters from './WebhookEventFilters';
import EventDetailsModal from './EventDetailsModal';
import { useWebhookHistoryFilters } from '@/hooks/admin/useWebhookHistoryFilters';
import { UnifiedWebhookEvent } from '@/types/unified-types';

interface WebhookHistoryContentProps {
  events: UnifiedWebhookEvent[];
}

export function WebhookHistoryContent({ events: initialEvents }: WebhookHistoryContentProps) {
  // State for event detail modal
  const [selectedEvent, setSelectedEvent] = useState<UnifiedWebhookEvent | null>(null);
  
  // Setup filters
  const { filters, setFilters, availableTypes, filteredEvents } = useWebhookHistoryFilters(initialEvents);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  // Open event details modal
  const handleViewEventDetail = (event: UnifiedWebhookEvent) => {
    setSelectedEvent(event);
  };
  
  // Close event details modal
  const handleCloseEventDetail = () => {
    setSelectedEvent(null);
  };
  
  return (
    <div className="space-y-6">
      {/* Filters */}
      <WebhookEventFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        availableTypes={availableTypes}
      />
      
      {/* Event Table */}
      <WebhookEventTable 
        events={filteredEvents}
        onViewDetail={handleViewEventDetail}
      />
      
      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal 
          event={selectedEvent} 
          isOpen={selectedEvent !== null} 
          onClose={handleCloseEventDetail}
        />
      )}
    </div>
  );
}

export default WebhookHistoryContent;
