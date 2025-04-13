
// Create the missing WebhookType type used by useWebhookHistory
export type WebhookType = 'stripe' | 'zapier' | 'github' | 'slack' | 'custom';

export const validateWebhookUrl = (url: string, type: WebhookType): boolean => {
  if (!url.trim()) return false;
  
  try {
    const urlObj = new URL(url);
    
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }
    
    // Type-specific validations
    switch (type) {
      case 'stripe':
        return url.includes('stripe.com') || url.includes('api.example.com/webhooks/stripe');
      case 'zapier':
        return url.includes('hooks.zapier.com');
      case 'github':
        return url.includes('github.com') || url.includes('api.example.com/webhooks/github');
      case 'slack':
        return url.includes('hooks.slack.com');
      case 'custom':
        return true; // Any valid URL is fine for custom webhooks
      default:
        return false;
    }
  } catch (e) {
    return false;
  }
};

// Add the sanitizeWebhookUrl function
export const sanitizeWebhookUrl = (url: string, type: WebhookType): string => {
  if (!url || !url.trim()) return '';
  
  try {
    const urlObj = new URL(url.trim());
    return urlObj.toString();
  } catch (e) {
    return '';
  }
};

// Add the testWebhook function
export const testWebhook = async (url: string, type: WebhookType): Promise<{ success: boolean; message?: string }> => {
  if (!validateWebhookUrl(url, type)) {
    return { success: false, message: 'Invalid webhook URL' };
  }
  
  try {
    // In a real app, you would actually send a test payload to the webhook
    // Here we're just simulating a successful response
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.message || 'Failed to test webhook' 
    };
  }
};

// Helper function to execute and log webhook calls
export const executeAndLogWebhook = async (
  url: string, 
  payload: any, 
  type: WebhookType,
  eventType: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    
    // Log the successful webhook call here in a real app
    return { success: true };
  } catch (error: any) {
    // Log the failed webhook call here in a real app
    return { 
      success: false, 
      message: error.message || 'Failed to execute webhook' 
    };
  }
};
