
import { useState, useEffect, useCallback } from 'react';
import { validateWebhookUrlFormat } from '@/utils/webhookValidation';
import { WebhookType } from '@/utils/webhookTypes';
import { logger } from '@/utils/loggingService';

export interface WebhookValidationResult {
  isValid: boolean | null; // null means not yet validated
  errorMessage: string | null;
  validationMessage: string | null;
  validateUrl: (url: string) => void;
}

/**
 * Hook for validating webhook URLs with improved feedback
 */
export function useWebhookValidation(type: WebhookType, initialUrl?: string): WebhookValidationResult {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  
  /**
   * Validate a webhook URL
   */
  const validateUrl = useCallback((urlToValidate: string) => {
    if (!urlToValidate) {
      // Empty URL is considered valid (as it might be optional)
      setIsValid(true);
      setErrorMessage(null);
      setValidationMessage(null);
      return;
    }
    
    try {
      // Perform validation using our utility
      const valid = validateWebhookUrlFormat(urlToValidate, type);
      setIsValid(valid);
      
      if (!valid) {
        switch (type) {
          case 'stripe':
            setErrorMessage('Invalid Stripe webhook URL format. Must start with https://api.stripe.com/');
            break;
          case 'zapier':
            setErrorMessage('Invalid Zapier webhook URL. Must start with https://hooks.zapier.com/');
            break;
          case 'github':
            setErrorMessage('Invalid GitHub webhook URL. Must start with https://api.github.com/');
            break;
          case 'slack':
            setErrorMessage('Invalid Slack webhook URL. Must start with https://hooks.slack.com/');
            break;
          case 'custom':
            setErrorMessage('Invalid URL format. Must use HTTPS protocol.');
            break;
          default:
            setErrorMessage('Invalid webhook URL');
        }
        setValidationMessage(null);
      } else {
        setErrorMessage(null);
        
        // Provide more specific success messages based on the webhook type
        switch (type) {
          case 'stripe':
            setValidationMessage('Valid Stripe webhook URL format');
            break;
          case 'zapier':
            setValidationMessage('Valid Zapier webhook URL format');
            break;
          case 'github':
            setValidationMessage('Valid GitHub webhook URL format');
            break;
          case 'slack':
            setValidationMessage('Valid Slack webhook URL format');
            break;
          case 'custom':
            setValidationMessage('Valid webhook URL format');
            break;
          default:
            setValidationMessage('Valid webhook URL format');
        }
      }
      
      // Log the validation result
      logger.debug(`Webhook URL validation for ${type}:`, {
        url: urlToValidate.slice(0, 10) + '...',
        isValid: valid
      });
    } catch (error) {
      setIsValid(false);
      setErrorMessage('Error validating URL');
      setValidationMessage(null);
      logger.error(`Error validating ${type} webhook:`, error);
    }
  }, [type]);
  
  // Validate the initial URL if provided
  useEffect(() => {
    if (initialUrl !== undefined) {
      validateUrl(initialUrl);
    }
  }, [initialUrl, validateUrl]);
  
  return {
    isValid,
    errorMessage,
    validationMessage,
    validateUrl
  };
}
