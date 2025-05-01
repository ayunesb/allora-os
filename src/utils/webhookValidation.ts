
/**
 * Tests a webhook by sending a test payload to the provided URL
 * @param url The webhook URL to test
 * @param type The type of webhook
 * @returns Promise resolving to success/failure status and details
 */
export const testWebhook = async (url: string, type: string) => {
  try {
    // Create a simple test payload
    const testPayload = {
      event: "webhook_test",
      timestamp: new Date().toISOString(),
      details: {
        message: "This is a test webhook from Allora AI",
        type
      }
    };

    // Make the request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    // Get status and response text
    const status = response.status;
    const text = await response.text();

    return {
      success: status >= 200 && status < 300,
      status,
      response: text,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Unknown error occurred',
    };
  }
};

/**
 * Sanitizes a webhook URL by checking for valid protocol and format
 * @param url The webhook URL to sanitize
 * @returns Sanitized URL or null if invalid
 */
export const sanitizeWebhookUrl = (url: string): string | null => {
  if (!url) return null;

  try {
    // Try to create a URL object to validate
    const urlObj = new URL(url);
    
    // Check for required protocols
    if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
      return null;
    }
    
    // Reconstruct the URL to avoid injection attacks
    return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}${urlObj.search}${urlObj.hash}`;
  } catch (error) {
    // Invalid URL format
    return null;
  }
};
