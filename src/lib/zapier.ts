
import { logger } from '@/utils/loggingService';

/**
 * Trigger a business event in Zapier
 * @param eventType The type of event to trigger
 * @param payload The payload to send to Zapier
 * @returns Success status and any errors
 */
export async function triggerBusinessEvent(
  eventType: string,
  payload: Record<string, any>
): Promise<{ success: boolean; error?: Error }> {
  try {
    const webhookUrl = process.env.VITE_ZAPIER_WEBHOOK_URL || '';
    
    if (!webhookUrl) {
      logger.warn('No Zapier webhook URL configured, skipping event trigger');
      return { success: false, error: new Error('No Zapier webhook URL configured') };
    }
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: eventType,
        ...payload,
        timestamp: new Date().toISOString(),
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Zapier webhook error: ${response.status} ${response.statusText}`);
    }
    
    logger.info(`Successfully triggered Zapier event: ${eventType}`);
    return { success: true };
    
  } catch (error) {
    logger.error('Error triggering Zapier webhook:', error);
    return { success: false, error: error as Error };
  }
}
