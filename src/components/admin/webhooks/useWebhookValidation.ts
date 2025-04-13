
import { useState, useCallback } from 'react';

type WebhookType = 'slack' | 'github' | 'zapier' | 'stripe' | 'custom';

interface ValidationResult {
  isValid: boolean | null;
  validationMessage: string | null;
}

export function useWebhookValidation(type: WebhookType) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const validateUrl = useCallback((url: string) => {
    // If empty, reset validation
    if (!url.trim()) {
      setIsValid(null);
      setValidationMessage(null);
      return;
    }

    // Basic URL validation
    try {
      const urlObj = new URL(url);
      
      // Check for HTTPS
      if (urlObj.protocol !== 'https:') {
        setIsValid(false);
        setValidationMessage('Webhook URL must use HTTPS protocol');
        return;
      }

      // Type-specific validation
      switch (type) {
        case 'slack':
          if (!url.includes('hooks.slack.com/services/')) {
            setIsValid(false);
            setValidationMessage('Invalid Slack webhook URL format');
            return;
          }
          break;
          
        case 'github':
          if (!url.includes('api.github.com/')) {
            setIsValid(false);
            setValidationMessage('Invalid GitHub webhook URL format');
            return;
          }
          break;
          
        case 'zapier':
          if (!url.includes('hooks.zapier.com/')) {
            setIsValid(false);
            setValidationMessage('Invalid Zapier webhook URL format');
            return;
          }
          break;
          
        case 'stripe':
          // Just ensure it's a valid URL for Stripe
          break;
          
        case 'custom':
          // Just ensure it's a valid URL for custom webhooks
          break;
      }

      // All checks passed
      setIsValid(true);
      setValidationMessage(null);
      
    } catch (error) {
      setIsValid(false);
      setValidationMessage('Invalid URL format');
    }
  }, [type]);

  return {
    isValid,
    validationMessage,
    validateUrl
  };
}
