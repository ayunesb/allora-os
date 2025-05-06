/**
 * Webhook Validation Utility
 *
 * This utility provides webhook validation functionality for various webhook types.
 */

import { WebhookType } from "@/utils/webhookTypes";
import { logger } from "@/utils/loggingService";

/**
 * Validates a webhook URL format based on the service type
 *
 * @param url The webhook URL to validate
 * @param type The type of webhook service
 * @returns Boolean indicating if the URL format is valid
 */
export const validateWebhookUrlFormat = (
  url: string,
  type: WebhookType,
): boolean => {
  if (!url || typeof url !== "string") return false;

  try {
    // Basic URL validation
    const parsedUrl = new URL(url);

    // Must use HTTPS for security
    if (parsedUrl.protocol !== "https:") {
      logger.warn(`Insecure webhook URL (non-HTTPS): ${url}`);
      return false;
    }

    // Specific validations per service
    switch (type) {
      case "stripe":
        return (
          url.startsWith("https://api.stripe.com/") ||
          url.includes("hook.stripe.com/") ||
          url.includes("webhook.site/")
        ); // For testing purposes

      case "zapier":
        return (
          url.startsWith("https://hooks.zapier.com/") ||
          url.includes("zapier.com/hooks/") ||
          url.includes("webhook.site/")
        ); // For testing

      case "github":
        return (
          url.includes("github.com/") ||
          url.includes("api.github.com/") ||
          url.includes("webhook.site/")
        );

      case "slack":
        return (
          url.includes("hooks.slack.com/") ||
          url.includes("api.slack.com/") ||
          url.includes("webhook.site/")
        );

      case "custom":
        // For custom webhooks, just ensure it's HTTPS (we already checked this)
        return true;

      default:
        logger.warn(`Unknown webhook type: ${type}`);
        return false;
    }
  } catch (error) {
    logger.error(`Invalid URL format: ${url}`, error);
    return false;
  }
};

/**
 * Tests a webhook by sending a test payload
 *
 * @param url The webhook URL to test
 * @param type The type of webhook service
 * @returns Promise with test result
 */
export const testWebhook = async (
  url: string,
  type: WebhookType,
): Promise<{ success: boolean; message?: string }> => {
  try {
    if (!validateWebhookUrlFormat(url, type)) {
      return {
        success: false,
        message: `Invalid ${type} webhook URL format`,
      };
    }

    // Create a test payload based on the webhook type
    const testPayload = {
      event: "test",
      timestamp: new Date().toISOString(),
      source: "Allora AI Platform",
      message: `This is a test from Allora AI for ${type} webhook`,
    };

    // Send the test request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testPayload),
    });

    // Check if the response is successful
    if (response.ok) {
      return {
        success: true,
        message: `Successfully triggered ${type} webhook`,
      };
    } else {
      return {
        success: false,
        message: `Failed to trigger ${type} webhook: ${response.status} ${response.statusText}`,
      };
    }
  } catch (error: any) {
    logger.error(`Error testing ${type} webhook:`, error);
    return {
      success: false,
      message: `Error: ${error.message || "Unknown error"}`,
    };
  }
};

/**
 * Sanitizes a webhook URL to remove any potential security issues
 *
 * @param url The webhook URL to sanitize
 * @param type The type of webhook service
 * @returns Sanitized URL or null if invalid
 */
export const sanitizeWebhookUrl = (
  url: string,
  type: WebhookType,
): string | null => {
  if (!url || !url.trim()) return null;

  try {
    const trimmedUrl = url.trim();

    // Basic validation
    if (!validateWebhookUrlFormat(trimmedUrl, type)) {
      return null;
    }

    // Parse URL to ensure it's properly structured
    const parsedUrl = new URL(trimmedUrl);

    // Simple sanity check - strip any excessive query parameters or fragments
    // that might be used for XSS
    if (parsedUrl.search && parsedUrl.search.length > 200) {
      parsedUrl.search = "";
    }

    return parsedUrl.toString();
  } catch (error) {
    logger.error(`Error sanitizing webhook URL:`, error);
    return null;
  }
};
