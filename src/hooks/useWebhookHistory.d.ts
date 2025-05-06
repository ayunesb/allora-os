import { WebhookEvent, BusinessEventType } from "@/types/unified-types";
interface UseWebhookHistoryOptions {
  limit?: number;
  initialFilter?: {
    eventType?: BusinessEventType;
    status?: string;
    fromDate?: Date | null;
    toDate?: Date | null;
  };
}
export declare function useWebhookHistory({
  limit,
  initialFilter,
}?: UseWebhookHistoryOptions): {
  events: WebhookEvent[];
  isLoading: boolean;
  error: string;
  total: number;
  fetchHistory: ({
    eventType,
    status,
    fromDate,
    toDate,
  }?: {
    eventType?: BusinessEventType;
    status?: string;
    fromDate?: Date | null;
    toDate?: Date | null;
  }) => Promise<void>;
};
export default useWebhookHistory;
