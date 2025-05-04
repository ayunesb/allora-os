/**
 * Webhook Validation Hook for Admin Components
 *
 * This hook provides validation for webhook URLs in admin interfaces
 */
import { WebhookType } from '@/types/fixed/Webhook';
export declare function useWebhookValidation(type: WebhookType): {
    isValid: boolean;
    validationMessage: string;
    validateUrl: (url: string) => void;
};
export default useWebhookValidation;
