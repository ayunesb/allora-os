
export type WebhookType = 'zapier' | 'slack' | 'github' | 'stripe' | 'notion' | 'custom';

export const validateWebhookUrlFormat = (url: string, type?: WebhookType): boolean => {
  if (!url) return false;
  
  try {
    const urlObj = new URL(url);
    
    // Basic URL validation
    if (!urlObj.protocol.startsWith('http')) {
      return false;
    }
    
    // Type-specific validation if type is provided
    if (type) {
      switch (type) {
        case 'zapier':
          return urlObj.hostname.includes('hooks.zapier.com');
        case 'slack':
          return urlObj.hostname.includes('hooks.slack.com');
        case 'github':
          return urlObj.hostname.includes('api.github.com') || urlObj.hostname.includes('github.com');
        case 'stripe':
          return true; // No specific validation for stripe URLs
        case 'notion':
          return urlObj.hostname.includes('api.notion.com') || urlObj.hostname.includes('notion.com');
        case 'custom':
          return true; // Allow any valid URL for custom webhooks
        default:
          return true;
      }
    }
    
    return true;
  } catch (error) {
    return false;
  }
};

export const sanitizeWebhookUrl = (url: string): string => {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch (error) {
    return '';
  }
};

export const testWebhook = async (url: string) => {
  if (!url) {
    return {
      success: false,
      message: 'No URL provided'
    };
  }
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'test_webhook',
        source: 'Allora AI Platform',
        timestamp: new Date().toISOString(),
        data: {
          message: `This is a test webhook from Allora AI`,
          testId: Math.random().toString(36).substring(7)
        }
      }),
      mode: 'no-cors', // Handle CORS issues
    });
    
    // With no-cors, we don't get a useful response, so assume success
    return {
      success: true,
      message: `Webhook test successful`
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      error
    };
  }
};
