
import { useState, useCallback, useMemo } from 'react';
import { WebhookStatus, WebhookType, WebhookEvent } from '@/types/fixed/Webhook';
import { UnifiedWebhookEvent } from '@/types/unified-types';

export type FilterOptions = {
  types: WebhookType[];
  status: WebhookStatus | '';
  dateRange: [Date | null, Date | null];
  search: string;
};

export const useWebhookHistoryFilters = (initialEvents: WebhookEvent[] | UnifiedWebhookEvent[]) => {
  const [filters, setFilters] = useState<FilterOptions>({
    types: [],
    status: '',
    dateRange: [null, null],
    search: ''
  });

  // Extract unique webhook types for filter options
  const availableTypes = useMemo(() => {
    const types = new Set<WebhookType>();
    initialEvents.forEach(event => {
      const type = event.webhookType || event.webhook_type || event.type;
      if (type && typeof type === 'string') {
        types.add(type as WebhookType);
      }
    });
    return Array.from(types);
  }, [initialEvents]);

  const filterEvents = useCallback(() => {
    return initialEvents.filter(event => {
      // Type filter
      if (filters.types.length > 0) {
        const eventType = event.webhookType || event.webhook_type || event.type;
        if (!eventType || !filters.types.includes(eventType as WebhookType)) {
          return false;
        }
      }

      // Status filter
      if (filters.status && filters.status !== '') {
        if (event.status !== filters.status) {
          return false;
        }
      }

      // Date range filter
      const eventDate = new Date(event.created_at || event.timestamp || '');
      if (filters.dateRange[0] && eventDate < filters.dateRange[0]) {
        return false;
      }
      if (filters.dateRange[1]) {
        // Add one day to include events from the end date
        const endDate = new Date(filters.dateRange[1]);
        endDate.setDate(endDate.getDate() + 1);
        if (eventDate > endDate) {
          return false;
        }
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const eventType = event.eventType || event.event_type || '';
        const url = event.targetUrl || event.url || '';
        const source = event.source || '';
        
        const matchesSearch = 
          eventType.toLowerCase().includes(searchLower) ||
          url.toLowerCase().includes(searchLower) ||
          source.toLowerCase().includes(searchLower) ||
          event.id.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) {
          return false;
        }
      }

      return true;
    });
  }, [initialEvents, filters]);

  return { 
    filters, 
    setFilters, 
    filterEvents, 
    availableTypes 
  };
};

export default useWebhookHistoryFilters;
