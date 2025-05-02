
export type WebhookType = "zapier" | "custom" | "stripe" | "slack" | "github" | "notion";

export interface WebhookTestResult {
  success: boolean;
  message?: string;
  statusCode?: number;
  data?: any;
}

export interface WebhookResult {
  success: boolean;
  message?: string;
  error?: any;
  statusCode?: number;
  responseData?: any;
}

/**
 * Validates if a URL has proper format for a webhook
 */
export function validateWebhookUrlFormat(url: string, type?: WebhookType): boolean {
  if (!url) return false;
  
  // Basic URL validation
  try {
    new URL(url);
  } catch {
    return false;
  }
  
  // Type-specific validation if type provided
  if (type) {
    switch (type) {
      case 'zapier':
        return url.includes('hooks.zapier.com');
      case 'slack':
        return url.includes('hooks.slack.com');
      case 'github':
        return url.includes('api.github.com');
      case 'stripe':
        return url.includes('stripe.com');
      case 'notion':
        return url.includes('notion.com');
      case 'custom':
        return url.startsWith('https://');
      default:
        return true;
    }
  }
  
  return url.startsWith('https://') || url.startsWith('http://');
}

/**
 * Test a webhook URL with a simple payload
 */
export async function testWebhook(url: string): Promise<WebhookTestResult> {
  if (!url) {
    return {
      success: false,
      message: 'No URL provided',
      statusCode: 400
    };
  }
  
  try {
    // Use no-cors to avoid CORS issues in browser
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify({
        test: true,
        timestamp: new Date().toISOString(),
      }),
    });
    
    // With no-cors, we can't check response status
    // Assume it went through if no error was thrown
    return {
      success: true,
      message: 'Test webhook sent',
      statusCode: 200
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Unknown error occurred',
      statusCode: 500
    };
  }
}

/**
 * Sanitize a webhook URL by trimming whitespace
 */
export function sanitizeWebhookUrl(url: string): string {
  return url?.trim() || '';
}
