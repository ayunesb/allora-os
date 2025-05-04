import { WebhookStatus, WebhookType } from '@/types/fixed/Webhook';
interface WebhookEventFiltersProps {
    filters: {
        types: WebhookType[];
        status: WebhookStatus | '';
        dateRange: [Date | null, Date | null];
        search: string;
    };
    onFilterChange: (filters: any) => void;
    availableTypes: WebhookType[];
}
export declare function WebhookEventFilters({ filters, onFilterChange, availableTypes }: WebhookEventFiltersProps): JSX.Element;
export default WebhookEventFilters;
