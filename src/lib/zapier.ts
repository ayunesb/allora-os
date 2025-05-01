
import { BusinessEventType, BusinessEventPayload, WebhookResult } from '@/types';

/**
 * Triggers a business event to a webhook URL
 * @param webhookUrl The webhook URL to send the event to
 * @param eventType The type of business event
 * @param data The data for the event
 * @returns A promise with the result of the webhook call
 */
export const triggerBusinessEvent = async (
  webhookUrl: string,
  eventType: BusinessEventType,
  data: Record<string, any>
): Promise<WebhookResult> => {
  try {
    if (!webhookUrl) {
      return {
        success: false,
        message: 'No webhook URL provided',
      };
    }

    const payload: BusinessEventPayload = {
      eventType,
      data,
    };

    // Make the API call
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Handle response
    if (!response.ok) {
      return {
        success: false,
        message: `Failed with status: ${response.status}`,
        statusCode: response.status,
        error: await response.text(),
      };
    }

    let responseData;
    try {
      responseData = await response.json();
    } catch (e) {
      responseData = await response.text();
    }

    return {
      success: true,
      message: 'Webhook triggered successfully',
      statusCode: response.status,
      responseData,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error,
    };
  }
};

/**
 * Trigger a workflow using a webhook
 */
export const triggerWorkflow = (webhookUrl: string, data: Record<string, any>): Promise<WebhookResult> => {
  return triggerBusinessEvent(webhookUrl, 'test_webhook' as BusinessEventType, data);
};
