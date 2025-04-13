
import { useState, useEffect, useCallback } from 'react';
import { WebhookEvent } from '@/types/webhooks';

export const useWebhookHistoryFilters = (events: WebhookEvent[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<WebhookEvent[]>(events);

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...events];
    
    if (searchTerm) {
      const lowerCaseQuery = searchTerm.toLowerCase();
      result = result.filter(
        event => 
          event.webhookType.toLowerCase().includes(lowerCaseQuery) ||
          (event.eventType && event.eventType.toLowerCase().includes(lowerCaseQuery)) ||
          event.targetUrl.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    if (statusFilter) {
      result = result.filter(event => event.status === statusFilter);
    }
    
    if (typeFilter) {
      result = result.filter(event => event.webhookType === typeFilter);
    }
    
    setFilteredEvents(result);
  }, [events, searchTerm, statusFilter, typeFilter]);
  
  const resetFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('');
    setTypeFilter('');
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredEvents,
    resetFilters
  };
};
