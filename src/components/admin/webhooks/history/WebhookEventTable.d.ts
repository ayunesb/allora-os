import { WebhookEvent } from '@/types/unified-types';
interface WebhookEventTableProps {
    events: WebhookEvent[];
    isLoading?: boolean;
    onViewDetail: (event: WebhookEvent) => void;
}
export declare function WebhookEventTable({ events, isLoading, onViewDetail }: WebhookEventTableProps): JSX.Element;
export default WebhookEventTable;
