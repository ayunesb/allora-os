import { BusinessEventType } from "@/types/fixed/Webhook";
export interface WebhookResult {
  success: boolean;
  message?: string;
  error?: any;
  statusCode?: number;
  responseData?: any;
}
export type { BusinessEventType };
export declare const useZapier: () => {
  isLoading: boolean;
  testWebhook: (webhookUrl: string) => Promise<WebhookResult>;
  triggerBusinessEvent: (
    webhookUrl: string,
    eventType: BusinessEventType,
    payload: Record<string, any>,
  ) => Promise<WebhookResult>;
};
export default useZapier;
