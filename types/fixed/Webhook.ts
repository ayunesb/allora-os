export type WebhookEvent = {
  // Define the structure of a webhook event
  id: string;
  eventType: string;
  payload: Record<string, any>;
};

export type WebhookStatus = "pending" | "processed" | "failed";
