import { useState } from "react";
import { WebhookType, WebhookStatus } from "@/types/fixed/Webhook";

export interface WebhookFilterState {
  types: WebhookType[];
  status: WebhookStatus | "";
  dateRange: [Date | null, Date | null];
  search: string;
}

export function useWebhookHistoryFilters() {
  const [filter, setFilter] = useState<WebhookFilterState>({
    types: [],
    status: "",
    dateRange: [null, null],
    search: "",
  });

  const updateFilter = (newFilter: Partial<WebhookFilterState>) => {
    setFilter((prev) => ({
      ...prev,
      ...newFilter,
    }));
  };

  const resetFilter = () => {
    setFilter({
      types: [],
      status: "",
      dateRange: [null, null],
      search: "",
    });
  };

  const setTypeFilter = (types: WebhookType[]) => {
    updateFilter({ types });
  };

  const setStatusFilter = (status: WebhookStatus | "") => {
    updateFilter({ status });
  };

  const setDateRangeFilter = (dateRange: [Date | null, Date | null]) => {
    updateFilter({ dateRange });
  };

  const setSearchFilter = (search: string) => {
    updateFilter({ search });
  };

  return {
    filter,
    updateFilter,
    resetFilter,
    setTypeFilter,
    setStatusFilter,
    setDateRangeFilter,
    setSearchFilter,
  };
}

export default useWebhookHistoryFilters;
