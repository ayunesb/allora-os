
import { useState } from 'react';
import { WebhookEvent, WebhookStatus } from '@/types/fixed/Webhook';
import { normalizeWebhookEvent } from '@/utils/authCompatibility';

interface FilterOptions {
  status?: WebhookStatus | '';
  type?: string;
  searchTerm?: string;
}

export const useWebhookHistoryFilters = (events: WebhookEvent[]) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: '',
    type: '',
    searchTerm: '',
  });

  const filteredEvents = events?.filter((event) => {
    const normalizedEvent = normalizeWebhookEvent(event);
    
    if (filterOptions.status && filterOptions.status !== '') {
      if (normalizedEvent.status !== filterOptions.status) {
        return false;
      }
    }

    if (filterOptions.type && filterOptions.type !== '') {
      if (normalizedEvent.webhookType !== filterOptions.type) {
        return false;
      }
    }

    if (filterOptions.searchTerm && filterOptions.searchTerm !== '') {
      const searchTermLower = filterOptions.searchTerm.toLowerCase();
      if (
        !normalizedEvent.eventType.toLowerCase().includes(searchTermLower) &&
        !normalizedEvent.targetUrl.toLowerCase().includes(searchTermLower) &&
        !normalizedEvent.id.toLowerCase().includes(searchTermLower)
      ) {
        return false;
      }
    }

    return true;
  });

  const setFilter = (key: keyof FilterOptions, value: string) => {
    setFilterOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return {
    filterOptions,
    filteredEvents,
    setFilter,
  };
};
