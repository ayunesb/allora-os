
import { useState, useEffect, useMemo } from 'react';
import { WebhookType, WebhookStatus } from '@/types/fixed/Webhook';
import { UnifiedWebhookEvent } from '@/types/unified-types';

export interface WebhookFilterState {
  types: WebhookType[];
  status: WebhookStatus | '';
  dateRange: [Date | null, Date | null];
  searchQuery: string;
}

export function useWebhookHistoryFilters(events: UnifiedWebhookEvent[]) {
  const [filters, setFilters] = useState<WebhookFilterState>({
    types: [],
    status: '',
    dateRange: [null, null],
    searchQuery: ''
  });

  // Generate available webhook types
  const availableTypes = useMemo(() => {
    const types = new Set<WebhookType>();
    events.forEach(event => {
      const webhookType = event.webhookType || event.webhook_type;
      if (webhookType) {
        types.add(webhookType as WebhookType);
      }
    });
    return Array.from(types);
  }, [events]);

  // Generate available webhook statuses
  const availableStatuses = useMemo(() => {
    const statuses = new Set<WebhookStatus>();
    events.forEach(event => {
      if (event.status) {
        statuses.add(event.status as WebhookStatus);
      }
    });
    return Array.from(statuses);
  }, [events]);

  // Filter events based on current filter state
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Filter by webhook type if any types are selected
      if (filters.types.length > 0) {
        const eventType = event.webhookType || event.webhook_type;
        if (!eventType || !filters.types.includes(eventType as WebhookType)) {
          return false;
        }
      }

      // Filter by status if selected
      if (filters.status && filters.status !== '' as any) {
        if (event.status !== filters.status) {
          return false;
        }
      }

      // Filter by date range
      const [startDate, endDate] = filters.dateRange;
      const eventDate = new Date(event.created_at || event.timestamp || '');
      
      if (startDate && eventDate < startDate) {
        return false;
      }
      
      if (endDate) {
        const endOfDay = new Date(endDate);
        endOfDay.setHours(23, 59, 59, 999);
        if (eventDate > endOfDay) {
          return false;
        }
      }

      // Filter by search query
      if (filters.searchQuery) {
        const searchLower = filters.searchQuery.toLowerCase();
        const eventTypeLower = (event.event_type || event.eventType || '').toLowerCase();
        const sourceValue = (event.source || '').toLowerCase();
        const urlValue = (event.targetUrl || event.url || '').toLowerCase();
        
        const payloadStr = event.payload ? JSON.stringify(event.payload).toLowerCase() : '';
        
        if (!eventTypeLower.includes(searchLower) && 
            !sourceValue.includes(searchLower) && 
            !urlValue.includes(searchLower) &&
            !payloadStr.includes(searchLower)) {
          return false;
        }
      }

      return true;
    });
  }, [events, filters]);

  return {
    filters,
    setFilters,
    availableTypes,
    availableStatuses,
    filteredEvents
  };
}

export default useWebhookHistoryFilters;
