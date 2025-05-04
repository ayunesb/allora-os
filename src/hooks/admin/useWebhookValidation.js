/**
 * Webhook Validation Hook for Admin Components
 *
 * This hook provides validation for webhook URLs in admin interfaces
 */
import { useState, useCallback } from 'react';
import { validateWebhookUrlFormat } from '@/utils/webhookValidation';
export function useWebhookValidation(type) {
    const [isValid, setIsValid] = useState(null);
    const [validationMessage, setValidationMessage] = useState(null);
    const validateUrl = useCallback((url) => {
        // If empty, reset validation
        if (!url.trim()) {
            setIsValid(null);
            setValidationMessage(null);
            return;
        }
        try {
            // Use the imported validateWebhookUrlFormat function
            const isValidFormat = validateWebhookUrlFormat(url, type);
            setIsValid(isValidFormat);
            if (!isValidFormat) {
                switch (type) {
                    case 'stripe':
                        setValidationMessage('Invalid Stripe webhook URL format. Must start with https://api.stripe.com/');
                        break;
                    case 'zapier':
                        setValidationMessage('Invalid Zapier webhook URL. Must start with https://hooks.zapier.com/');
                        break;
                    case 'github':
                        setValidationMessage('Invalid GitHub webhook URL. Must start with https://api.github.com/');
                        break;
                    case 'slack':
                        setValidationMessage('Invalid Slack webhook URL. Must start with https://hooks.slack.com/');
                        break;
                    case 'custom':
                        setValidationMessage('Invalid URL format. Must use HTTPS protocol.');
                        break;
                    default:
                        setValidationMessage('Invalid webhook URL');
                }
            }
            else {
                setValidationMessage(null);
            }
        }
        catch (error) {
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
export default useWebhookValidation;
