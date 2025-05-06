/**
 * API Credential Validation Utility
 *
 * This utility provides functions to validate different types of API credentials
 * including webhook URLs, API keys, and other authentication tokens.
 */
import { WebhookType } from "@/utils/webhookTypes";
/**
 * Validates API credentials format (not just webhooks, but other API keys too)
 * @param credential The API credential to validate
 * @param type The type of service
 * @param options Additional validation options
 * @returns Promise with validation result
 */
export declare const validateApiCredential: (
  credential: string,
  type:
    | WebhookType
    | "stripe_key"
    | "postmark_key"
    | "twilio_key"
    | "openai_key",
  options?: {
    logAttempts?: boolean;
    redactSensitive?: boolean;
  },
) => Promise<boolean>;
