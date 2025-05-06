import { WebhookType, WebhookStatus } from "@/types";
export interface WebhookFilter {
  types?: WebhookType[];
  status?: WebhookStatus | "";
  dateRange?: [Date | null, Date | null];
  search?: string;
}
export declare function useWebhookHistoryFilters(
  initialFilters?: WebhookFilter,
): {
  filters: WebhookFilter;
  updateFilter: (key: keyof WebhookFilter, value: any) => void;
  clearFilters: () => void;
};
