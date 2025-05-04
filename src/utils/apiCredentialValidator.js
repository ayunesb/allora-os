/**
 * API Credential Validation Utility
 *
 * This utility provides functions to validate different types of API credentials
 * including webhook URLs, API keys, and other authentication tokens.
 */
import { validateWebhookUrlFormat } from '@/utils/validators/webhookValidator';
import { logger } from '@/utils/loggingService';
/**
 * Validates API credentials format (not just webhooks, but other API keys too)
 * @param credential The API credential to validate
 * @param type The type of service
 * @param options Additional validation options
 * @returns Promise with validation result
 */
export const validateApiCredential = async (credential, type, options = {}) => {
    const { logAttempts = false, redactSensitive = true } = options;
    if (!credential)
        return false;
    // Format validation for webhook URLs
    if (['stripe', 'zapier', 'github', 'slack', 'custom'].includes(type)) {
        return validateWebhookUrlFormat(credential, type);
    }
    // For API keys, check the format based on known patterns
    const keyPatterns = {
        stripe_key: /^sk_(?:test|live)_[a-zA-Z0-9]{24,}$/,
        postmark_key: /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/,
        twilio_key: /^[a-zA-Z0-9]{32}$/,
        openai_key: /^sk-[a-zA-Z0-9]{32,}$/
    };
    const pattern = keyPatterns[type];
    if (!pattern) {
        logger.error(`Unknown API credential type: ${type}`);
        return false;
    }
    const isValid = pattern.test(credential);
    if (logAttempts) {
        const redactedCredential = redactSensitive
            ? `${credential.substring(0, 4)}...${credential.substring(credential.length - 4)}`
            : credential;
        if (isValid) {
            logger.info(`Valid ${type} credential format: ${redactedCredential}`);
        }
        else {
            logger.warn(`Invalid ${type} credential format: ${redactedCredential}`);
        }
    }
    return isValid;
};
