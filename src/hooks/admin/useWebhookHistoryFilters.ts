
import { useState, useCallback } from 'react';
import { WebhookStatus, WebhookType } from '@/types/unified-types';

export interface WebhookFilterState {
  types: WebhookType[];
  status: WebhookStatus | '';
  dateRange: [Date | null, Date | null];
  search: string;
}

export default function useWebhookHistoryFilters() {
  const [filter, setFilter] = useState<WebhookFilterState>({
    types: [],
    status: '',
    dateRange: [null, null],
    search: '',
  });

  const updateFilter = useCallback((newFilter: Partial<WebhookFilterState>) => {
    setFilter(prev => ({
      ...prev,
      ...newFilter
    }));
  }, []);

  const resetFilter = useCallback(() => {
    setFilter({
      types: [],
      status: '',
      dateRange: [null, null],
      search: '',
    });
  }, []);

  const setTypeFilter = useCallback((types: WebhookType[]) => {
    setFilter(prev => ({
      ...prev,
      types
    }));
  }, []);

  const setStatusFilter = useCallback((status: WebhookStatus | '') => {
    setFilter(prev => ({
      ...prev,
      status
    }));
  }, []);

  const setDateRangeFilter = useCallback((dateRange: [Date | null, Date | null]) => {
    setFilter(prev => ({
      ...prev,
      dateRange
    }));
  }, []);

  const setSearchFilter = useCallback((search: string) => {
    setFilter(prev => ({
      ...prev,
      search
    }));
  }, []);

  return {
    filter,
    updateFilter,
    resetFilter,
    setTypeFilter,
    setStatusFilter,
    setDateRangeFilter,
    setSearchFilter
  };
}

export { WebhookFilterState };
