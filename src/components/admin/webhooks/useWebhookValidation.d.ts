import { WebhookType } from "@/types/fixed/Webhook";
export declare function useWebhookValidation(type: WebhookType): {
  isValid: boolean;
  validationMessage: string;
  validateUrl: (url: string) => void;
};
export default useWebhookValidation;
