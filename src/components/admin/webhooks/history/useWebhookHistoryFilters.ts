
import { useState, useCallback } from 'react';
import { WebhookType, WebhookStatus, WebhookEvent } from '@/types/fixed/Webhook';

interface WebhookFilter {
  types?: WebhookType[];
  status?: WebhookStatus | '';
  dateRange?: [Date | null, Date | null];
  search?: string;
}

const useWebhookHistoryFilters = () => {
  const [filters, setFilters] = useState<WebhookFilter>({
    types: undefined,
    status: '',
    dateRange: [null, null],
    search: '',
  });

  const updateFilter = useCallback((key: keyof WebhookFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      types: undefined,
      status: '',
      dateRange: [null, null],
      search: '',
    });
  }, []);

  // Filter function to apply to webhook events
  const filterEvent = useCallback((event: WebhookEvent) => {
    // Type filter
    if (filters.types && filters.types.length > 0) {
      const type = event.webhookType || event.webhook_type || event.type;
      if (!filters.types.includes(type as WebhookType)) {
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
    if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
      const eventDate = new Date(event.timestamp || event.created_at);
      const startDate = filters.dateRange[0];
      const endDate = filters.dateRange[1];

      if (eventDate < startDate || eventDate > endDate) {
        return false;
      }
    }

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const searchableContent = [
        event.id,
        event.webhookType,
        event.webhook_type,
        event.eventType,
        event.event_type,
        event.type,
        event.targetUrl,
        event.url,
        JSON.stringify(event.payload),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      if (!searchableContent.includes(searchLower)) {
        return false;
      }
    }

    return true;
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    filterEvent,
  };
};

export default useWebhookHistoryFilters;
