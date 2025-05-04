import { WebhookStatus, WebhookType, WebhookEvent } from '@/types/unified-types';
export type FilterOptions = {
    types: WebhookType[];
    status: WebhookStatus | '';
    dateRange: [Date | null, Date | null];
    search: string;
};
export declare const useWebhookHistoryFilters: (initialEvents: WebhookEvent[]) => {
    filters: FilterOptions;
    setFilters: import("react").Dispatch<import("react").SetStateAction<FilterOptions>>;
    filterEvents: () => WebhookEvent[];
    availableTypes: WebhookType[];
};
export default useWebhookHistoryFilters;
