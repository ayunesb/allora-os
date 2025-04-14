
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

// Interfaces for the webhook trigger functionality
export interface WorkflowTriggerResult {
  success: boolean;
  message?: string;
  error?: any;
}

// Define an interface for the enhanced payload to fix TypeScript errors
interface EnhancedPayload {
  event_name: string;
  timestamp: string;
  entity_id?: string;
  entity_type?: string;
  [key: string]: any;
}

/**
 * Hook for Zapier integrations
 * Provides methods for triggering Zapier webhooks and business events
 */
export function useZapier() {
  /**
   * Trigger a Zapier workflow by sending a POST request to a webhook URL
   */
  const triggerWorkflow = async (
    webhookUrl: string,
    eventName: string,
    payload: Record<string, any> = {},
    entityId?: string,
    entityType?: string
  ): Promise<WorkflowTriggerResult> => {
    if (!webhookUrl) {
      return { success: false, message: 'No webhook URL provided' };
    }
    
    try {
      console.log(`Triggering Zapier webhook for "${eventName}" event:`, payload);
      
      // Add metadata to the payload with proper typing
      const enhancedPayload: EnhancedPayload = {
        event_name: eventName,
        timestamp: new Date().toISOString(),
        ...payload,
      };
      
      // Add entity information if provided
      if (entityId) enhancedPayload.entity_id = entityId;
      if (entityType) enhancedPayload.entity_type = entityType;
      
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enhancedPayload),
        mode: 'no-cors', // Required for cross-origin webhook calls
      });
      
      // Since we're using no-cors, we won't get the status code
      // We just assume it worked unless there's an exception
      return { success: true };
    } catch (error) {
      console.error(`Error triggering Zapier webhook for "${eventName}":`, error);
      return { 
        success: false, 
        error,
        message: error.message || 'Failed to trigger webhook'
      };
    }
  };
  
  /**
   * Wrapper for the triggerBusinessEvent function to use within components
   */
  const triggerBusinessEventWithHook = async (
    eventType: BusinessEventType,
    payload: BusinessEventPayload
  ): Promise<TriggerEventResult> => {
    return triggerBusinessEvent(eventType, payload);
  };
  
  return {
    triggerWorkflow,
    triggerBusinessEvent: triggerBusinessEventWithHook
  };
}

