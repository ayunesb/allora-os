
import { logger } from './loggingService';

// Business event types for Zapier triggers
export type BusinessEventType = 
  | 'strategy_approved'
  | 'new_lead_added'
  | 'campaign_launched'
  | 'lead_converted'
  | 'revenue_milestone';

// Base payload structure
export interface BusinessEventPayload {
  eventType: BusinessEventType;
  data: Record<string, any>;
}

// Type for strategy payload
export interface StrategyApprovalPayload {
  companyId: string;
  entityId: string;
  entityType: string;
  strategyName: string;
  botName: string;
  suggestedBy: string;
  riskLevel: string;
  timestamp: string;
}

// Type for lead payload
export interface LeadPayload {
  leadId: string;
  leadName: string;
  company: string;
  email: string;
  source: string;
}

// Type for campaign payload 
export interface CampaignPayload {
  campaignId: string;
  name: string;
  type: string;
  budget?: number;
  startDate: string;
  endDate?: string;
  targetAudience?: string;
}

// Type for revenue milestone
export interface RevenueMilestonePayload {
  companyId: string;
  milestone: string; // e.g., "first_1000", "monthly_recurring_10k"
  amount: number;
  currency?: string;
}

/**
 * Trigger when a strategy has been approved
 */
export const onStrategyApproved = async (payload: StrategyApprovalPayload): Promise<boolean> => {
  try {
    return await triggerZapierEvent('strategy_approved', payload);
  } catch (error) {
    logger.error('Failed to trigger strategy approved webhook', { error, payload });
    return false;
  }
};

/**
 * Trigger when a new lead has been added
 */
export const onNewLeadAdded = async (payload: LeadPayload): Promise<boolean> => {
  try {
    return await triggerZapierEvent('new_lead_added', payload);
  } catch (error) {
    logger.error('Failed to trigger new lead webhook', { error, payload });
    return false;
  }
};

/**
 * Trigger when a campaign has been launched
 */
export const onCampaignLaunched = async (payload: CampaignPayload): Promise<boolean> => {
  try {
    return await triggerZapierEvent('campaign_launched', payload);
  } catch (error) {
    logger.error('Failed to trigger campaign launched webhook', { error, payload });
    return false;
  }
};

/**
 * Trigger any business event to Zapier
 */
export const triggerZapierEvent = async (
  eventType: BusinessEventType, 
  data: Record<string, any>
): Promise<boolean> => {
  try {
    // Get webhook URL from local storage
    const webhookUrl = localStorage.getItem('zapier_webhook_url');
    
    if (!webhookUrl) {
      logger.warn('No Zapier webhook URL configured');
      return false;
    }

    // Prepare the payload
    const payload = {
      eventType,
      data,
      timestamp: new Date().toISOString(),
      source: window.location.origin
    };

    // Call the webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors', // Use no-cors mode to avoid CORS issues
      body: JSON.stringify(payload)
    });

    // Since we're using no-cors, we won't get a proper response status
    // We'll assume it worked if no exception is thrown
    logger.info(`Triggered Zapier webhook for ${eventType}`, { payload });
    return true;
  } catch (error) {
    logger.error(`Failed to trigger Zapier webhook for ${eventType}`, { error });
    return false;
  }
};
