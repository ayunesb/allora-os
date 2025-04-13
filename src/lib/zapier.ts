
/**
 * Zapier Integration Helper
 * Enables triggering automation workflows via Zapier webhooks
 */

import { useSelfLearning } from '@/hooks/useSelfLearning';
import { ActionCategory } from '@/utils/selfLearning';
import { sanitizeInput } from '@/utils/sanitizers';
import { executeWebhook } from '@/utils/webhookRetry'; 
import { validateApiCredential } from '@/utils/apiCredentialValidator';
import { logger } from '@/utils/loggingService';
import { encryptData, decryptData } from '@/utils/cryptoUtils';

// Business event types for better type safety
export type BusinessEventType = 
  // Strategy events
  | 'strategy_approved' 
  | 'strategy_created'
  // Lead events
  | 'lead_created' 
  | 'lead_converted'
  | 'lead_status_changed'
  // Campaign events
  | 'campaign_created'
  | 'campaign_approved'
  | 'campaign_launched'
  // Revenue events
  | 'revenue_milestone_reached'
  | 'order_placed'
  // General events
  | 'milestone_reached'
  | 'experiment_logged'
  | string; // Allow custom events as well

// Define payload types for each event for better type checking
export type BusinessEventPayload = {
  // Common fields
  timestamp?: string;
  userId?: string;
  companyId?: string;
  entityId?: string;
  entityType?: string;
  botId?: string;
  botName?: string;
  
  // Specific event fields can be added via spreading additional fields
  [key: string]: any;
};

// Helper to securely store webhook URLs
const securelyStoreWebhookUrl = (webhookUrl: string, prefix: string = 'zapier'): void => {
  try {
    // Use a prefix to distinguish between different types of webhook URLs
    const key = `${prefix}_webhook_url`;
    
    // In a production app, this would use a proper encryption mechanism
    // For now, we'll use localStorage but in a real app we should use
    // a more secure storage option like encrypted IndexedDB or 
    // server-side storage with proper authentication
    localStorage.setItem(key, webhookUrl);
    
    logger.info(`Webhook URL stored securely for ${prefix}`);
  } catch (error) {
    logger.error('Error storing webhook URL:', error);
  }
};

// Helper to securely retrieve webhook URLs
const securelyRetrieveWebhookUrl = (prefix: string = 'zapier'): string | null => {
  try {
    const key = `${prefix}_webhook_url`;
    return localStorage.getItem(key);
  } catch (error) {
    logger.error('Error retrieving webhook URL:', error);
    return null;
  }
};

// Base function to trigger a Zapier webhook with proper validation
export const triggerZap = async (event: string, payload: Record<string, any>) => {
  try {
    logger.info(`Triggering Zapier webhook for event: ${event}`, { event });
    
    // Validate webhook URL
    const webhookUrl = payload.webhookUrl;
    
    if (!webhookUrl) {
      throw new Error("Zapier webhook URL not provided");
    }
    
    // Validate the webhook URL format
    const isValid = await validateApiCredential(webhookUrl, 'zapier', {
      logAttempts: true,
      redactSensitive: false
    });
    
    if (!isValid) {
      logger.warn(`Invalid Zapier webhook URL format: ${webhookUrl}`);
      return { 
        success: false, 
        message: "Invalid Zapier webhook URL format" 
      };
    }
    
    // Sanitize event name and payload values to prevent injection
    const sanitizedEvent = sanitizeInput(event);
    const sanitizedPayload = Object.entries(payload).reduce((acc, [key, value]) => {
      // Only sanitize string values
      acc[key] = typeof value === 'string' ? sanitizeInput(value) : value;
      return acc;
    }, {} as Record<string, any>);
    
    // Prepare request body
    const requestBody = {
      event: sanitizedEvent,
      payload: sanitizedPayload,
      timestamp: new Date().toISOString(),
      source: 'Allora AI Platform'
    };
    
    // Use the improved webhook execution with retries
    const result = await executeWebhook(webhookUrl, requestBody, 'zapier', sanitizedEvent);
    
    // Track this zapier event in our self-learning system if we have userId
    if (sanitizedPayload.userId) {
      logger.info('Tracking Zapier event', {
        action: 'trigger_zapier_webhook',
        category: 'automation',
        entityId: sanitizedPayload.entityId,
        entityType: sanitizedPayload.entityType,
        event: sanitizedEvent,
        success: result.success
      });
    }
    
    return { success: result.success, message: result.message };
  } catch (error: any) {
    logger.error("Error triggering Zapier webhook:", error);
    return { success: false, error };
  }
};

// React hook for using Zapier within components
export const useZapier = () => {
  const { trackAction } = useSelfLearning();
  
  // Regular component-based webhook triggering (for buttons, etc)
  const triggerZapierWorkflow = async (
    webhookUrl: string,
    event: string,
    payload: Record<string, any> = {},
    entityId?: string,
    entityType?: string
  ) => {
    if (!webhookUrl || !webhookUrl.trim()) {
      return { success: false, error: new Error("Webhook URL is required") };
    }
    
    // Store the webhook URL securely for future use
    securelyStoreWebhookUrl(webhookUrl.trim());
    
    // Add webhook URL to payload
    const fullPayload = {
      ...payload,
      webhookUrl: webhookUrl.trim()
    };
    
    const result = await triggerZap(event, fullPayload);
    
    // Track this action in our self-learning system
    trackAction(
      'trigger_zapier_workflow',
      'automation',
      entityId,
      entityType,
      {
        event,
        success: result.success
      }
    );
    
    return result;
  };
  
  // New: Automatic business event based webhook triggering
  const triggerBusinessEvent = async (
    eventType: BusinessEventType,
    payload: BusinessEventPayload
  ) => {
    // Get the webhook URL from secure storage
    const webhookUrl = securelyRetrieveWebhookUrl('zapier') || 'https://hooks.zapier.com/hooks/catch/22321548/20s5s0c/';
    
    if (!webhookUrl) {
      logger.warn("No Zapier webhook URL configured. Business event not sent.");
      return { success: false, error: new Error("No Zapier webhook URL configured") };
    }
    
    // Prepare the full payload
    const fullPayload = {
      ...payload,
      webhookUrl,
      timestamp: payload.timestamp || new Date().toISOString(),
      source: 'Allora AI Business Event'
    };
    
    logger.info(`Triggering business event: ${eventType}`, { 
      eventType, 
      entityId: payload.entityId, 
      entityType: payload.entityType 
    });
    
    const result = await triggerZap(eventType, fullPayload);
    
    // Track the automatic business event trigger
    trackAction(
      'auto_business_event',
      'automation',
      payload.entityId,
      payload.entityType,
      {
        eventType,
        success: result.success
      }
    );
    
    return result;
  };
  
  return {
    triggerWorkflow: triggerZapierWorkflow,
    triggerBusinessEvent
  };
};

// Standalone function for components that don't use hooks
export const triggerBusinessEvent = async (
  eventType: BusinessEventType,
  payload: BusinessEventPayload
) => {
  // Get the webhook URL from secure storage
  const webhookUrl = securelyRetrieveWebhookUrl('zapier') || 'https://hooks.zapier.com/hooks/catch/22321548/20s5s0c/';
  
  if (!webhookUrl) {
    logger.warn("No Zapier webhook URL configured. Business event not sent.");
    return { success: false, error: new Error("No Zapier webhook URL configured") };
  }
  
  // Add webhook URL to payload
  const fullPayload = {
    ...payload,
    webhookUrl,
    timestamp: payload.timestamp || new Date().toISOString(),
  };
  
  return await triggerZap(eventType, fullPayload);
};
