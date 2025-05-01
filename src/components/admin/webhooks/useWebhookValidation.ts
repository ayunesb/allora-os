
import { useState } from 'react';
import { WebhookType } from '@/types';
import { validateWebhookUrlFormat } from '@/utils/webhookValidation';

export function useWebhookValidation(webhookType: WebhookType | 'notion') {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationMessage, setValidationMessage] = useState<string>('');
  
  const validateUrl = (url: string) => {
    // If the URL is empty, reset validation state
    if (!url) {
      setIsValid(null);
      setValidationMessage('');
      return;
    }
    
    // Check URL format
    const validFormat = validateWebhookUrlFormat(url, webhookType as WebhookType);
    setIsValid(validFormat);
    
    if (validFormat) {
      setValidationMessage(`Valid ${webhookType} URL format`);
    } else {
      // Set specific error message based on webhook type
      switch (webhookType) {
        case 'zapier':
          setValidationMessage('Invalid Zapier webhook URL. Should start with https://hooks.zapier.com/');
          break;
        case 'slack':
          setValidationMessage('Invalid Slack webhook URL. Should start with https://hooks.slack.com/');
          break;
        case 'github':
          setValidationMessage('Invalid GitHub webhook URL. Should be a valid HTTPS URL.');
          break;
        case 'stripe':
          setValidationMessage('Invalid Stripe webhook URL. Should be a valid HTTPS URL.');
          break;
        case 'notion':
          setValidationMessage('Invalid Notion webhook URL. Should be a valid HTTPS URL.');
          break;
        default:
          setValidationMessage('Invalid webhook URL format');
      }
    }
  };
  
  return {
    isValid,
    validationMessage,
    validateUrl
  };
}
