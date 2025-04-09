
import { useState } from 'react';
import { sanitizeUrl } from '@/utils/sanitizers';

type WebhookType = 'stripe' | 'zapier';

export const useWebhookValidation = (type: WebhookType) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateUrl = (url: string): boolean => {
    if (!url.trim()) {
      setIsValid(null);
      return false;
    }
    
    try {
      // Use the sanitizeUrl utility to sanitize and validate the URL
      const sanitized = sanitizeUrl(url);
      const isUrlValid = !!sanitized && new URL(sanitized).toString() === sanitized;
      
      // Additional specific validation
      if (type === 'zapier') {
        const isZapierUrl = sanitized.includes('hooks.zapier.com');
        setIsValid(isUrlValid && isZapierUrl);
        if (isUrlValid && !isZapierUrl) {
          console.warn('URL is valid but does not appear to be a Zapier webhook');
        }
        return isUrlValid && isZapierUrl;
      } else {
        setIsValid(isUrlValid);
        return isUrlValid;
      }
    } catch (e) {
      setIsValid(false);
      return false;
    }
  };

  return { isValid, validateUrl };
};
