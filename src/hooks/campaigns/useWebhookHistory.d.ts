import { WebhookEvent } from '@/types/unified-types';
export declare function useWebhookHistory(): {
    events: WebhookEvent[];
    isLoading: boolean;
    error: string;
    refreshEvents: () => Promise<void>;
};
