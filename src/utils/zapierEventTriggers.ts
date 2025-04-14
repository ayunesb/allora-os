
import { toast } from 'sonner';
import { triggerBusinessEvent, BusinessEventType, BusinessEventPayload } from '@/lib/zapier';
import { logAuditEvent } from '@/utils/auditLogger';

/**
 * Trigger a Zapier workflow when a campaign is launched
 */
export async function onCampaignLaunched(payload: {
  campaignTitle: string;
  platform: string;
  owner: string;
  campaignId: string;
  companyId: string;
}) {
  try {
    console.log('Triggering campaign launched event:', payload);
    
    // Log audit event for tracking
    await logAuditEvent({
      action: 'SYSTEM_CHANGE',
      resource: 'zapier_event',
      details: { event_type: 'campaign_launched', payload }
    });
    
    const result = await triggerBusinessEvent('campaign_launched', {
      entityId: payload.campaignId,
      entityType: 'campaign',
      timestamp: new Date().toISOString(),
      ...payload
    });
    
    if (result.success) {
      console.log('Campaign launch notification sent successfully');
    } else if (result.message) {
      console.warn('Campaign launch notification failed:', result.message);
    }
    
    return result;
  } catch (error) {
    console.error('Error triggering campaign launched event:', error);
    return { success: false, error };
  }
}

/**
 * Trigger a Zapier workflow when a new lead is added
 */
export async function onNewLeadAdded(payload: {
  company: string;
  leadName: string;
  source: string;
  leadId?: string;
}) {
  try {
    console.log('Triggering new lead added event:', payload);
    
    const result = await triggerBusinessEvent('lead_added', {
      entityId: payload.leadId || 'batch',
      entityType: 'lead',
      timestamp: new Date().toISOString(),
      ...payload
    });
    
    if (result.success) {
      console.log('Lead added notification sent successfully');
    } else if (result.message) {
      console.warn('Lead added notification failed:', result.message);
    }
    
    return result;
  } catch (error) {
    console.error('Error triggering lead added event:', error);
    return { success: false, error };
  }
}

/**
 * Trigger a Zapier workflow when a strategy is approved
 */
export async function onStrategyApproved(payload: {
  strategyTitle: string;
  strategyId: string;
  companyId: string;
  approvedBy: string;
}) {
  try {
    console.log('Triggering strategy approved event:', payload);
    
    // Log audit event for tracking
    await logAuditEvent({
      action: 'SYSTEM_CHANGE',
      resource: 'zapier_event',
      details: { event_type: 'strategy_approved', payload }
    });
    
    const result = await triggerBusinessEvent('strategy_approved', {
      entityId: payload.strategyId,
      entityType: 'strategy',
      timestamp: new Date().toISOString(),
      ...payload
    });
    
    if (!result.success && result.message) {
      console.warn('Strategy approved notification failed:', result.message);
    }
    
    return result;
  } catch (error) {
    console.error('Error triggering strategy approved event:', error);
    return { success: false, error };
  }
}

/**
 * Trigger a Zapier workflow when a lead is converted to a customer
 */
export async function onLeadConverted(payload: {
  leadId: string;
  leadName: string;
  conversionValue: number;
  companyId: string;
  convertedBy: string;
}) {
  try {
    console.log('Triggering lead converted event:', payload);
    
    const result = await triggerBusinessEvent('lead_converted', {
      entityId: payload.leadId,
      entityType: 'lead',
      timestamp: new Date().toISOString(),
      ...payload
    });
    
    if (!result.success && result.message) {
      console.warn('Lead conversion notification failed:', result.message);
    }
    
    return result;
  } catch (error) {
    console.error('Error triggering lead converted event:', error);
    return { success: false, error };
  }
}

/**
 * Trigger a Zapier workflow when a revenue milestone is reached
 */
export async function onRevenueMilestoneReached(payload: {
  milestoneName: string;
  revenueAmount: number;
  companyId: string;
  milestoneId?: string;
}) {
  try {
    console.log('Triggering revenue milestone event:', payload);
    
    const result = await triggerBusinessEvent('revenue_milestone_reached', {
      entityId: payload.milestoneId || 'milestone',
      entityType: 'revenue_milestone',
      timestamp: new Date().toISOString(),
      ...payload
    });
    
    if (!result.success && result.message) {
      console.warn('Revenue milestone notification failed:', result.message);
    }
    
    return result;
  } catch (error) {
    console.error('Error triggering revenue milestone event:', error);
    return { success: false, error };
  }
}
