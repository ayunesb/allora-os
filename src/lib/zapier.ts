
// Interface definitions for Zapier API
export type BusinessEventType = 
  | 'campaign_launched' 
  | 'lead_added' 
  | 'strategy_approved'
  | 'lead_converted'
  | 'revenue_milestone_reached';

export interface BusinessEventPayload {
  entityId: string;
  entityType: string;
  timestamp: string;
  [key: string]: any;
}

export interface TriggerEventResult {
  success: boolean;
  message?: string;
  error?: any;
}

/**
 * Triggers a business event webhook to Zapier
 */
export async function triggerBusinessEvent(
  eventType: BusinessEventType,
  payload: BusinessEventPayload
): Promise<TriggerEventResult> {
  // Get the webhook URL for this event type from app settings
  const webhookUrl = getWebhookUrlForEvent(eventType);
  
  if (!webhookUrl) {
    console.warn(`No webhook URL configured for event type: ${eventType}`);
    return { success: false, message: 'No webhook URL configured for this event type' };
  }
  
  try {
    console.log(`Triggering Zapier webhook for ${eventType} event:`, payload);
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: eventType,
        ...payload,
      }),
      mode: 'no-cors', // Required for cross-origin webhook calls
    });
    
    // Since we're using no-cors, we won't get the status code
    // We just assume it worked unless there's an exception
    return { success: true };
  } catch (error) {
    console.error(`Error triggering ${eventType} webhook:`, error);
    return { 
      success: false, 
      error,
      message: error.message || 'Failed to trigger webhook'
    };
  }
}

/**
 * Gets the webhook URL for a specific event type from app settings
 */
function getWebhookUrlForEvent(eventType: BusinessEventType): string | null {
  // This would typically come from a database or environment setting
  // For now, we'll hardcode some sample webhook URLs for testing
  const WEBHOOK_URLS: Record<BusinessEventType, string> = {
    campaign_launched: process.env.ZAPIER_CAMPAIGN_WEBHOOK || 'https://hooks.zapier.com/hooks/catch/123456/abcdef/',
    lead_added: process.env.ZAPIER_LEAD_WEBHOOK || 'https://hooks.zapier.com/hooks/catch/123456/ghijkl/',
    strategy_approved: process.env.ZAPIER_STRATEGY_WEBHOOK || 'https://hooks.zapier.com/hooks/catch/123456/mnopqr/',
    lead_converted: process.env.ZAPIER_CONVERSION_WEBHOOK || 'https://hooks.zapier.com/hooks/catch/123456/stuvwx/',
    revenue_milestone_reached: process.env.ZAPIER_MILESTONE_WEBHOOK || 'https://hooks.zapier.com/hooks/catch/123456/yzabcd/'
  };
  
  return WEBHOOK_URLS[eventType] || null;
}
