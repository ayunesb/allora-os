
import { useState } from 'react';
import { WebhookType, validateWebhookUrl } from '@/utils/webhookValidation';

/**
 * Hook for validating webhook URLs for different services
 * @param type The type of webhook to validate
 * @returns Validation state and validation function
 */
export const useWebhookValidation = (type: WebhookType) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const validateUrl = (url: string): boolean => {
    if (!url.trim()) {
      setIsValid(null);
      setValidationMessage(null);
      return false;
    }
    
    const { isValid: urlIsValid, message } = validateWebhookUrl(url, type);
    
    setIsValid(urlIsValid);
    setValidationMessage(message || null);
    
    return urlIsValid;
  };

  return { isValid, validationMessage, validateUrl };
};
