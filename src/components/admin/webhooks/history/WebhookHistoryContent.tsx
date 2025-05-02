
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UnifiedWebhookEvent } from '@/types/unified-types';
import WebhookEventTable from './WebhookEventTable';
import WebhookEventDetailModal from './WebhookEventDetailModal';
import { useWebhookHistoryFilters, FilterOptions } from './useWebhookHistoryFilters';

interface WebhookHistoryContentProps {
  events: UnifiedWebhookEvent[];
}

const WebhookHistoryContent: React.FC<WebhookHistoryContentProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<UnifiedWebhookEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { filters, setFilters, filterEvents, availableTypes } = useWebhookHistoryFilters(events);
  const [filteredEvents, setFilteredEvents] = useState<UnifiedWebhookEvent[]>(events);
  
  // Update filtered events when filters change
  React.useEffect(() => {
    const filtered = filterEvents();
    setFilteredEvents(filtered as UnifiedWebhookEvent[]);
  }, [filters, events, filterEvents]);
  
  // Function to open event detail modal
  const openEventDetailModal = (event: UnifiedWebhookEvent) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };
  
  // Function to close event detail modal
  const closeEventDetailModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };
  
  // Function to handle filter changes
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  return (
    <Card>
      <CardContent className="p-0">
        <WebhookEventTable 
          events={filteredEvents} 
          onViewDetail={openEventDetailModal}
          filters={filters}
          onFilterChange={handleFilterChange}
          availableTypes={availableTypes}
        />
        
        {/* Event detail modal */}
        {selectedEvent && (
          <WebhookEventDetailModal 
            event={selectedEvent}
            isOpen={isModalOpen}
            onClose={closeEventDetailModal}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default WebhookHistoryContent;
