
import { useState, useEffect } from 'react';
import { validateWebhookUrl, WebhookType } from '@/utils/webhookValidation';

interface WebhookValidationResult {
  isValid: boolean;
  errorMessage: string | null;
}

/**
 * Custom hook for validating webhook URLs
 */
export function useWebhookValidation(type: WebhookType, url?: string): WebhookValidationResult {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    if (!url) {
      setIsValid(true); // Empty URL is considered valid (optional webhook)
      setErrorMessage(null);
      return;
    }
    
    try {
      const valid = validateWebhookUrl(url, type);
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
  }, [url, type]);
  
  return {
    isValid,
    errorMessage
  };
}
