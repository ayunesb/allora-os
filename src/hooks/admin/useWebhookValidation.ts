
import { useState, useEffect, useCallback } from 'react';
import { validateWebhookUrlFormat, WebhookType } from '@/utils/webhookValidation';

export interface WebhookValidationResult {
  isValid: boolean;
  errorMessage: string | null;
  validateUrl: (url: string) => void;
}

export function useWebhookValidation(type: WebhookType, url?: string): WebhookValidationResult {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const validateUrl = useCallback((urlToValidate: string) => {
    if (!urlToValidate) {
      setIsValid(true); // Empty URL is considered valid (optional webhook)
      setErrorMessage(null);
      return;
    }
    
    try {
      const valid = validateWebhookUrlFormat(urlToValidate, type);
      setIsValid(valid);
      
      if (!valid) {
        switch (type) {
          case 'stripe':
            setErrorMessage('Invalid Stripe webhook URL');
            break;
          case 'zapier':
            setErrorMessage('Invalid Zapier webhook URL. Must include hooks.zapier.com');
            break;
          case 'github':
            setErrorMessage('Invalid GitHub webhook URL');
            break;
          case 'slack':
            setErrorMessage('Invalid Slack webhook URL. Must include hooks.slack.com');
            break;
          case 'custom':
            setErrorMessage('Invalid URL format');
            break;
          default:
            setErrorMessage('Invalid webhook URL');
        }
      } else {
        setErrorMessage(null);
      }
    } catch (error) {
      setIsValid(false);
      setErrorMessage('Error validating URL');
      console.error(`Error validating ${type} webhook:`, error);
    }
  }, [type]);
  
  // Validate the initial URL if provided
  useEffect(() => {
    if (url !== undefined) {
      validateUrl(url);
    }
  }, [url, validateUrl]);
  
  return {
    isValid,
    errorMessage,
    validateUrl
  };
}
