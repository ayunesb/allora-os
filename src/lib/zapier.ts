
import { BusinessEventType, WebhookResult } from '@/utils/webhookTypes';

interface ZapierWebhookConfig {
  webhookUrl: string;
}

interface ZapierResult {
  success: boolean;
  message?: string;
}

export function useZapier() {
  // State could be managed here in a real implementation
  const webhookUrl = localStorage.getItem('zapier_webhook_url') || '';
  const isLoading = false;
  const lastTriggered = new Date();
  const error = '';
  
  /**
   * Updates the Zapier webhook URL
   */
  const updateWebhookUrl = (url: string): void => {
    if (url) {
      localStorage.setItem('zapier_webhook_url', url);
    }
  };
  
  /**
   * Triggers a webhook event
   */
  const triggerWebhook = async (
    eventType: BusinessEventType, 
    data: Record<string, any>
  ): Promise<WebhookResult> => {
    const url = localStorage.getItem('zapier_webhook_url');
    
    if (!url) {
      return {
        success: false,
        message: 'Zapier webhook URL is not configured'
      };
    }
    
    try {
      const payload = {
        eventType,
        data,
        timestamp: new Date().toISOString()
      };
      
      // Using no-cors mode to avoid CORS issues in browser
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify(payload)
      });
      
      // Since we're using no-cors, we can't actually check the response
      // We assume it worked if no exception was thrown
      return {
        success: true
      };
    } catch (error) {
      console.error('Error triggering Zapier webhook:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        error
      };
    }
  };
  
  /**
   * Alias for triggerWebhook for backwards compatibility
   */
  const triggerBusinessEvent = triggerWebhook;
  
  return {
    webhookUrl,
    isLoading,
    lastTriggered,
    error,
    updateWebhookUrl,
    triggerWebhook,
    triggerBusinessEvent
  };
}

// Export the types directly
export { BusinessEventType };

// Function to trigger a business event with Zapier
export const triggerBusinessEvent = async (
  eventType: BusinessEventType, 
  data: Record<string, any>
): Promise<WebhookResult> => {
  const { triggerWebhook } = useZapier();
  return triggerWebhook(eventType, data);
};
