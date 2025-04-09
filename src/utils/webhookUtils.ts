
import { WebhookType } from './webhookValidation';
import { useWebhookHistory } from '@/components/admin/webhooks/useWebhookHistory';

/**
 * Integration with useWebhookHistory for logging webhook events
 * @param webhookUrl The URL of the webhook being triggered
 * @param payload The data sent to the webhook
 * @param type The type of webhook service
 * @returns Promise with success status and response data
 */
export const logWebhookCall = async (
  webhookUrl: string,
  payload: any,
  type: WebhookType,
  eventType: string = 'webhook_call'
) => {
  // Get storage functions from useWebhookHistory
  // Note: We're accessing localStorage directly here since this is a utility function
  // not a component, and we can't use hooks in regular functions
  try {
    // Generate a unique ID for this webhook event
    const eventId = `wh_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
    
    // Create the initial event entry with pending status
    const initialEvent = {
      id: eventId,
      timestamp: new Date().toISOString(),
      webhookType: type,
      eventType,
      targetUrl: webhookUrl,
      payload,
      status: 'pending' as const
    };
    
    // Load existing events
    const storedHistory = localStorage.getItem('webhook_event_history');
    const history = storedHistory ? JSON.parse(storedHistory) : { version: 1, events: [], lastUpdated: new Date().toISOString() };
    
    // Add the new event
    history.events = [initialEvent, ...history.events];
    history.lastUpdated = new Date().toISOString();
    
    // Save to localStorage
    localStorage.setItem('webhook_event_history', JSON.stringify(history));
    
    return eventId;
  } catch (error) {
    console.error('Error logging webhook call:', error);
    return null;
  }
};

/**
 * Update a webhook call log with the result
 * @param eventId The ID of the webhook event to update
 * @param result The result of the webhook call
 */
export const updateWebhookLog = (
  eventId: string,
  result: {
    status: 'success' | 'error';
    responseCode?: number;
    response?: any;
    errorMessage?: string;
    duration?: number;
  }
) => {
  try {
    // Load existing events
    const storedHistory = localStorage.getItem('webhook_event_history');
    if (!storedHistory) return;
    
    const history = JSON.parse(storedHistory);
    
    // Update the specific event
    history.events = history.events.map((event: any) => 
      event.id === eventId ? { ...event, ...result } : event
    );
    
    history.lastUpdated = new Date().toISOString();
    
    // Save to localStorage
    localStorage.setItem('webhook_event_history', JSON.stringify(history));
  } catch (error) {
    console.error('Error updating webhook log:', error);
  }
};

/**
 * Execute a webhook call and track it in history
 * @param url The webhook URL to call
 * @param payload The data to send to the webhook
 * @param type The type of webhook service
 * @param eventType Custom event type description
 * @returns Promise with the result of the webhook call
 */
export const executeAndLogWebhook = async (
  url: string,
  payload: any,
  type: WebhookType,
  eventType: string = 'webhook_call'
) => {
  const startTime = Date.now();
  const eventId = await logWebhookCall(url, payload, type, eventType);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors', // To avoid CORS issues with external webhook providers
      body: JSON.stringify(payload),
    });
    
    const duration = Date.now() - startTime;
    
    // Since we're using no-cors, we won't get a proper response status
    // But we'll track that we attempted to send it
    if (eventId) {
      updateWebhookLog(eventId, {
        status: 'success',
        responseCode: 200, // Assuming success since we can't read the actual response with no-cors
        response: { success: true, note: "Response details not available due to CORS restrictions" },
        duration
      });
    }
    
    return {
      success: true,
      message: "Webhook triggered successfully. Check the service to confirm receipt.",
      eventId
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    
    if (eventId) {
      updateWebhookLog(eventId, {
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        duration
      });
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to trigger webhook',
      eventId
    };
  }
};
