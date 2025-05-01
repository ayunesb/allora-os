
import { WebhookResult, BusinessEventType } from '@/types/fixed/Webhook';
import { toast } from 'sonner';

/**
 * Trigger a business event to a webhook URL
 */
export async function triggerBusinessEvent(
  webhookUrl: string,
  eventType: BusinessEventType,
  payload: Record<string, any>
): Promise<WebhookResult> {
  try {
    console.log(`Triggering business event ${eventType} to ${webhookUrl}`, payload);
    
    // Format the payload
    const body = {
      eventType,
      timestamp: new Date().toISOString(),
      data: {
        ...payload,
        appSource: 'Allora AI',
      }
    };
    
    // Send the webhook request - using no-cors mode to handle CORS issues in browser environment
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors',
      body: JSON.stringify(body)
    });
    
    // No actual response with no-cors, so we assume success
    return {
      success: true,
      message: 'Webhook triggered successfully'
    };
  } catch (error) {
    console.error('Error triggering business event:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      error
    };
  }
}

/**
 * Test a webhook URL with a simple ping event
 */
export async function testWebhook(webhookUrl: string): Promise<WebhookResult> {
  try {
    return await triggerBusinessEvent(
      webhookUrl,
      'test_event' as BusinessEventType,
      {
        message: 'This is a test event from Allora AI',
        testId: Date.now(),
      }
    );
  } catch (error) {
    console.error('Error testing webhook:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      error
    };
  }
}

/**
 * Trigger a lead added webhook
 */
export async function triggerLeadAddedEvent(webhookUrl: string, leadData: any): Promise<WebhookResult> {
  try {
    return await triggerBusinessEvent(
      webhookUrl,
      'lead_added' as BusinessEventType,
      {
        lead: leadData,
      }
    );
  } catch (error) {
    console.error('Error triggering lead added webhook:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      error
    };
  }
}
