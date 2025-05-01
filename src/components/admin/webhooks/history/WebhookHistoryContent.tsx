
import React, { useState } from 'react';
import { WebhookEvent } from '@/types/fixed/Webhook';
import WebhookHistoryFilters from './WebhookHistoryFilters';
import WebhookEventTable from './WebhookEventTable';
import useWebhookHistoryFilters from './useWebhookHistoryFilters';
import { WebhookEventDetailModal } from './WebhookEventDetailModal';

interface WebhookHistoryContentProps {
  events?: WebhookEvent[];
  isLoading?: boolean;
}

const WebhookHistoryContent: React.FC<WebhookHistoryContentProps> = ({ 
  events = [], 
  isLoading = false 
}) => {
  const { filters, updateFilter, resetFilters, filterEvent } = useWebhookHistoryFilters();
  const [selectedEvent, setSelectedEvent] = useState<WebhookEvent | null>(null);
  
  const filteredEvents = events.filter(filterEvent);
  
  const handleEventClick = (event: WebhookEvent) => {
    setSelectedEvent(event);
  };
  
  const handleCloseModal = () => {
    setSelectedEvent(null);
  };
  
  return (
    <div className="space-y-4">
      <WebhookHistoryFilters 
        filters={filters}
        onFilterChange={updateFilter}
        onReset={resetFilters}
      />
      
      <WebhookEventTable 
        events={filteredEvents} 
        isLoading={isLoading} 
        onEventClick={handleEventClick}
      />
      
      {selectedEvent && (
        <WebhookEventDetailModal 
          event={selectedEvent} 
          isOpen={!!selectedEvent} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
};

export default WebhookHistoryContent;
