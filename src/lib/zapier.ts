
import { BusinessEventType, BusinessEventPayload, WebhookResult } from '@/types';

// Function to trigger a workflow through a webhook
export const triggerWorkflow = async (
  webhookUrl: string,
  eventType: BusinessEventType,
  payload: Record<string, any>
): Promise<WebhookResult> => {
  if (!webhookUrl) {
    console.error('No webhook URL provided');
    return { success: false, message: 'No webhook URL provided' };
  }

  const eventPayload: BusinessEventPayload = {
    eventType,
    data: payload
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Source': 'Allora-AI',
        'X-Event-Type': eventType
      },
      body: JSON.stringify(eventPayload)
    });

    if (response.ok) {
      return { 
        success: true, 
        message: `Successfully triggered ${eventType} event`
      };
    } else {
      return { 
        success: false, 
        message: `Failed to trigger webhook (${response.status})`,
        error: `HTTP error: ${response.status}`
      };
    }
  } catch (error) {
    console.error('Error triggering Zapier webhook:', error);
    return {
      success: false,
      message: 'Network error when triggering webhook',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Re-export types
export type { BusinessEventType, BusinessEventPayload };

