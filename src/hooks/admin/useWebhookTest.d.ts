import { WebhookType, WebhookTestResult } from "@/types/unified-types";
export declare function useWebhookTest(): {
  testWebhook: (
    url: string,
    webhookType: WebhookType,
  ) => Promise<WebhookTestResult>;
  isLoading: boolean;
  lastResult: WebhookTestResult;
};
