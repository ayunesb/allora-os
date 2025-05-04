export interface WebhookSettings {
    stripe: string;
    zapier: string;
    github: string;
    slack: string;
    custom: string;
}
/**
 * Custom hook for persisting webhook settings to Supabase
 */
export declare function useWebhookStorage(): {
    saveWebhookSettings: (settings: WebhookSettings) => Promise<boolean>;
    loadWebhookSettings: () => Promise<WebhookSettings | null>;
};
