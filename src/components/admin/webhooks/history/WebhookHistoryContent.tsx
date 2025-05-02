
import React, { useState, useEffect } from 'react';
import WebhookEventTable from './WebhookEventTable';
import WebhookEventFilters from './WebhookEventFilters';
import EventDetailsModal from './EventDetailsModal';
import { useWebhookHistoryFilters, FilterOptions } from './useWebhookHistoryFilters';
import { UnifiedWebhookEvent } from '@/types/unified-types';

interface WebhookEventHistoryData {
  events: UnifiedWebhookEvent[];
}

const WebhookHistoryContent: React.FC<WebhookEventHistoryData> = ({ events: initialEvents }) => {
  // State for event detail modal
  const [selectedEvent, setSelectedEvent] = useState<UnifiedWebhookEvent | null>(null);
  
  // Setup filters
  const { filters, setFilters, filterEvents, availableTypes } = useWebhookHistoryFilters(initialEvents);
  
  // Filtered events
  const [filteredEvents, setFilteredEvents] = useState<UnifiedWebhookEvent[]>([]);
  
  // Filter events when filters change
  useEffect(() => {
    setFilteredEvents(filterEvents() as UnifiedWebhookEvent[]);
  }, [filterEvents, initialEvents]);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
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
      <EventDetailsModal 
        event={selectedEvent} 
        isOpen={selectedEvent !== null} 
        onClose={handleCloseEventDetail}
      />
    </div>
  );
};

export default WebhookHistoryContent;
