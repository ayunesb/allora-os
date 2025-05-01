
import { logger } from './loggingService';
import { triggerBusinessEvent, BusinessEventType } from '@/lib/zapier';
import { logAuditEvent } from '@/utils/auditLogger';

// Business event types for Zapier triggers
export type { BusinessEventType } from '@/lib/zapier';

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
export const onStrategyApproved = async (payload: StrategyApprovalPayload) => {
  try {
    // Log the audit event
    await logAuditEvent({
      action: 'SYSTEM_CHANGE',
      resource: 'zapier_event',
      details: {
        event_type: 'strategy_approved',
        strategy_id: payload.entityId,
        company_id: payload.companyId
      }
    });
    
    const result = await triggerBusinessEvent('strategy_approved', payload);
    return { success: result.success, error: result.success ? undefined : new Error(result.message) };
  } catch (error) {
    logger.error('Failed to trigger strategy approved webhook', { error, payload });
    return { success: false, error: error instanceof Error ? error : new Error('Unknown error') };
  }
};

/**
 * Trigger when a new lead has been added
 */
export const onNewLeadAdded = async (payload: LeadPayload) => {
  try {
    const result = await triggerBusinessEvent('lead_added', payload);
    return { success: result.success, error: result.success ? undefined : new Error(result.message) };
  } catch (error) {
    logger.error('Failed to trigger new lead webhook', { error, payload });
    return { success: false, error: error instanceof Error ? error : new Error('Unknown error') };
  }
};

/**
 * Trigger when a campaign has been launched
 */
export const onCampaignLaunched = async (payload: CampaignPayload) => {
  try {
    const result = await triggerBusinessEvent('campaign_launched', payload);
    return { success: result.success, error: result.success ? undefined : new Error(result.message) };
  } catch (error) {
    logger.error('Failed to trigger campaign launched webhook', { error, payload });
    return { success: false, error: error instanceof Error ? error : new Error('Unknown error') };
  }
};

/**
 * Trigger any business event to Zapier
 */
export const triggerZapierEvent = async (
  eventType: BusinessEventType, 
  data: Record<string, any>
) => {
  try {
    const result = await triggerBusinessEvent(eventType, data);
    if (result.success) {
      logger.info(`Triggered Zapier webhook for ${eventType}`, { data });
      return { success: true };
    } else {
      logger.error(`Failed to trigger Zapier webhook for ${eventType}`, { message: result.message });
      return { success: false, error: new Error(result.message || 'Unknown error') };
    }
  } catch (error) {
    logger.error(`Failed to trigger Zapier webhook for ${eventType}`, { error });
    return { success: false, error: error instanceof Error ? error : new Error('Unknown error') };
  }
};
