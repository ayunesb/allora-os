
import { toast } from 'sonner';

export type BusinessEventType = 
  | 'strategy_approved'
  | 'campaign_approved'
  | 'lead_created'
  | 'sale_completed'
  | 'onboarding_completed';

export interface BusinessEventPayload {
  entityId: string;
  entityType: string;
  timestamp: string;
  [key: string]: any;
}

export function useZapier() {
  /**
   * Trigger a Zapier workflow via a webhook URL
   */
  const triggerWorkflow = async (
    webhookUrl: string, 
    event: string, 
    payload: Record<string, any> = {},
    entityId?: string,
    entityType?: string
  ) => {
    try {
      // Ensure the webhook URL is valid
      if (!webhookUrl || !webhookUrl.startsWith('http')) {
        return { 
          success: false, 
          message: 'Invalid webhook URL' 
        };
      }
      
      console.log(`Triggering Zapier webhook for event: ${event}`);
      
      // Add event type and metadata to payload
      const fullPayload = {
        ...payload,
        event_type: event,
        entity_id: entityId,
        entity_type: entityType,
        platform: 'Allora AI',
        environment: process.env.NODE_ENV || 'development'
      };
      
      // Make the request using no-cors to avoid CORS issues
      // Note: This means we won't get response data back
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify(fullPayload)
      });
      
      // Since we're using no-cors mode, assume it worked if no exception
      return { success: true };
    } catch (error: any) {
      console.error('Error triggering Zapier webhook:', error);
      return { 
        success: false, 
        error,
        message: error.message || 'Failed to trigger Zapier webhook' 
      };
    }
  };
  
  /**
   * Trigger a business event to Zapier
   */
  const triggerBusinessEvent = async (
    eventType: BusinessEventType,
    payload: BusinessEventPayload
  ) => {
    try {
      // Get the webhook URL from localStorage
      const webhookUrl = localStorage.getItem('zapier_webhook_url');
      
      if (!webhookUrl) {
        console.warn('No Zapier webhook URL configured');
        return { success: false, message: 'No webhook URL configured' };
      }
      
      const result = await triggerWorkflow(
        webhookUrl,
        eventType,
        payload,
        payload.entityId,
        payload.entityType
      );
      
      return result;
    } catch (error: any) {
      console.error('Error triggering business event:', error);
      return { success: false, error };
    }
  };
  
  /**
   * Save a Zapier webhook URL to localStorage
   */
  const saveWebhookUrl = (url: string) => {
    try {
      localStorage.setItem('zapier_webhook_url', url);
      toast.success('Zapier webhook URL saved');
      return true;
    } catch (error) {
      console.error('Error saving webhook URL:', error);
      toast.error('Failed to save webhook URL');
      return false;
    }
  };
  
  /**
   * Get the stored Zapier webhook URL
   */
  const getWebhookUrl = () => {
    return localStorage.getItem('zapier_webhook_url') || '';
  };

  return {
    triggerWorkflow,
    triggerBusinessEvent,
    saveWebhookUrl,
    getWebhookUrl
  };
}
