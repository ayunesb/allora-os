
import { useState } from 'react';
import { WebhookType, WebhookStatus } from '@/types';

export interface WebhookFilter {
  types?: WebhookType[];
  status?: WebhookStatus | '';
  dateRange?: [Date | null, Date | null];
  search?: string;
}

export function useWebhookHistoryFilters(initialFilters?: WebhookFilter) {
  const [filters, setFilters] = useState<WebhookFilter>(initialFilters || {});

  const updateFilter = (key: keyof WebhookFilter, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    filters,
    updateFilter,
    clearFilters,
  };
}
