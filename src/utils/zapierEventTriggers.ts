
import { triggerBusinessEvent } from '@/lib/zapier';
import { logAuditEvent } from '@/utils/auditLogger';
import { 
  BusinessEventType, 
  StrategyApprovalPayload, 
  LeadPayload, 
  CampaignPayload 
} from '@/utils/webhookTypes';

/**
 * Sends a strategy approval event to Zapier
 */
export async function onStrategyApproved(strategy: StrategyApprovalPayload) {
  try {
    const result = await triggerBusinessEvent('strategy_approved', {
      entityId: strategy.entityId,
      entityType: strategy.entityType,
      strategyName: strategy.strategyName,
      companyId: strategy.companyId,
      botName: strategy.botName,
      suggestedBy: strategy.suggestedBy,
      riskLevel: strategy.riskLevel,
      timestamp: strategy.timestamp || new Date().toISOString()
    });

    await logAuditEvent({
      action: 'SYSTEM_CHANGE',
      resource: 'zapier_event',
      result: result.success ? 'success' : 'failed',
      details: {
        eventType: 'strategy_approved',
        strategyName: strategy.strategyName,
        success: result.success,
        errorMessage: result.success ? undefined : result.message
      }
    });

    return result;
  } catch (error) {
    console.error('Error sending strategy approved event to Zapier:', error);
    
    await logAuditEvent({
      action: 'SYSTEM_CHANGE',
      resource: 'zapier_event',
      result: 'failed',
      details: {
        eventType: 'strategy_approved',
        strategyName: strategy.strategyName,
        success: false,
        errorMessage: error instanceof Error ? error.message : 'Unknown error'
      }
    });
    
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
}

/**
 * Sends a new lead added event to Zapier
 */
export async function onNewLeadAdded(lead: LeadPayload) {
  try {
    return await triggerBusinessEvent('lead_added', {
      leadId: lead.leadId,
      leadName: lead.leadName,
      company: lead.company,
      source: lead.source,
      email: lead.email,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error sending lead added event to Zapier:', error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
}

/**
 * Sends a campaign launched event to Zapier
 */
export async function onCampaignLaunched(campaign: CampaignPayload) {
  try {
    return await triggerBusinessEvent('campaign_launched', {
      campaignId: campaign.campaignId,
      name: campaign.name,
      type: campaign.type,
      startDate: campaign.startDate,
      budget: campaign.budget,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error sending campaign launched event to Zapier:', error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error('Unknown error')
    };
  }
}

/**
 * Utility function to format audit events for Zapier actions
 */
export function logAuditEvent(event: any): Promise<void> {
  // This is a placeholder that could be implemented to log events
  console.log('Audit event:', event);
  return Promise.resolve();
}
