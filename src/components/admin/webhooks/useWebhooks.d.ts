interface Webhook {
  id: string;
  type: string;
  url: string;
  active: boolean;
  createdAt: string;
  lastTriggered?: string;
  events?: string[];
}
interface Filter {
  type?: string;
  url?: string;
  active?: boolean;
}
export declare function useWebhooks(): {
  webhooks: Webhook[];
  isLoading: boolean;
  error: Error;
  filter: Filter;
  setFilter: import("react").Dispatch<import("react").SetStateAction<Filter>>;
  clearFilterAndRefetch: () => void;
  trackEvent: (eventType: string) => void;
  createWebhook: (data: Omit<Webhook, "id" | "createdAt">) => Promise<Webhook>;
  updateWebhook: (webhook: Webhook) => Promise<Webhook>;
  deleteWebhook: (id: string) => Promise<Webhook>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
};
export {};
