import { WebhookFilterState } from '@/hooks/admin/useWebhookHistoryFilters';
interface WebhookHistoryFiltersProps {
    filter: WebhookFilterState;
    onFilterChange: (filter: Partial<WebhookFilterState>) => void;
    onResetFilters: () => void;
}
export default function WebhookHistoryFilters({ filter, onFilterChange, onResetFilters, }: WebhookHistoryFiltersProps): JSX.Element;
export {};
