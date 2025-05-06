import { WebhookType, WebhookStatus } from "@/types/fixed/Webhook";
export interface WebhookFilterState {
  types: WebhookType[];
  status: WebhookStatus | "";
  dateRange: [Date | null, Date | null];
  search: string;
}
export declare function useWebhookHistoryFilters(): {
  filter: WebhookFilterState;
  updateFilter: (newFilter: Partial<WebhookFilterState>) => void;
  resetFilter: () => void;
  setTypeFilter: (types: WebhookType[]) => void;
  setStatusFilter: (status: WebhookStatus | "") => void;
  setDateRangeFilter: (dateRange: [Date | null, Date | null]) => void;
  setSearchFilter: (search: string) => void;
};
export default useWebhookHistoryFilters;
