
/**
 * Type definitions for integration components
 */

/**
 * Props for the Zapier readiness test component
 */
export interface ZapierReadinessTestProps {
  webhookUrl: string;
  isValid: boolean;
}

/**
 * Props for webhook components
 */
export interface WebhookTestProps {
  endpoint: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

/**
 * Component for testing webhooks
 */
export interface ZapierTriggerButtonProps {
  webhookUrl: string;
  onTrigger?: () => void;
  isDisabled?: boolean;
}
