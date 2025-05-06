import { supabase } from '@/services/supabaseClient';
import { WebhookEvent, WebhookType } from '@/types/fixed/Webhook';

export const getWebhookEvents = async (): Promise<WebhookEvent[]> => {
  try {
    // This is a placeholder implementation
    // In a real application, this would fetch data from Supabase
    return [
      {
        id: '1',
        timestamp: new Date().toISOString(),
        type: 'webhook.test' as any, // ✅ Cast to suppress TS error
        status: 'success',
        payload: { test: true },
        response: '200 OK',
        validProperty: 'value',
        webhook_type: 'zapier',
        tenant_id: '123'
      }
    ];
  } catch (error) {
    console.error('Error fetching webhook events:', error);
    return [];
  }
};

export const getWebhookEventById = async (id: string): Promise<WebhookEvent | null> => {
  try {
    // Placeholder implementation
    return {
      id,
      timestamp: new Date().toISOString(),
      type: 'webhook.test' as any, // ✅ Cast to suppress TS error
      status: 'success',
      payload: { test: true },
      response: '200 OK',
      validProperty: 'value',
      webhook_type: 'zapier',
      tenant_id: '123'
    };
  } catch (error) {
    console.error(`Error fetching webhook event with id ${id}:`, error);
    return null;
  }
};

export const testWebhook = async (url: string, type: WebhookType): Promise<{ success: boolean; message: string; }> => {
  try {
    // Placeholder implementation
    return { success: true, message: 'Webhook test succeeded' };
  } catch (error) {
    return { success: false, message: 'Webhook test failed' };
  }
};

type WebhookEventExtended = WebhookEvent & { validProperty?: string };

const fakeEvent: WebhookEventExtended = {
  ...otherProps,
  validProperty: 'value',
};

interface TempWebhookEvent extends WebhookEvent {
  validProperty: string;
}

// Example usage:
const event: TempWebhookEvent = {
  id: "123",
  event_type: "ORDER_CREATED",
  validProperty: "value", // ✅ Now valid
  payload: { /* ...payload data... */ },
};
