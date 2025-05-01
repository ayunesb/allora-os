
import { triggerBusinessEvent } from '@/lib/zapier';
import { logAuditEvent } from '@/utils/auditLogger';

/**
 * Triggers a Zapier event when a strategy is approved
 */
export async function onStrategyApproved(strategy: {
  strategyTitle: string;
  strategyId: string;
  companyId: string;
  approvedBy: string;
}) {
  try {
    // Log the event
    await logAuditEvent({
      action: 'SYSTEM_CHANGE',
      resource: 'zapier_event',
      details: {
        event_type: 'strategy_approved',
        strategy_id: strategy.strategyId,
        strategy_title: strategy.strategyTitle
      }
    });
    
    // Trigger the Zapier event
    return await triggerBusinessEvent('strategy_approved', {
      entityId: strategy.strategyId,
      entityType: 'strategy',
      strategyTitle: strategy.strategyTitle,
      companyId: strategy.companyId,
      approvedBy: strategy.approvedBy,
    });
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * Triggers a Zapier event when a new lead is added
 */
export async function onNewLeadAdded(lead: {
  leadId: string;
  leadName: string;
  company: string;
  email: string;
  source: string;
}) {
  try {
    // Log the event
    await logAuditEvent({
      action: 'SYSTEM_CHANGE',
      resource: 'zapier_event',
      details: {
        event_type: 'lead_added',
        lead_id: lead.leadId,
        lead_name: lead.leadName
      }
    });
    
    // Trigger the Zapier event
    return await triggerBusinessEvent('lead_added', {
      entityId: lead.leadId,
      entityType: 'lead',
      leadName: lead.leadName,
      company: lead.company,
      email: lead.email,
      source: lead.source,
    });
  } catch (error) {
    return { success: false, error };
  }
}

/**
 * Triggers a Zapier event when a campaign is launched
 */
export async function onCampaignLaunched(campaign: {
  campaignId: string;
  campaignTitle: string;
  platform: string;
  budget: number;
  owner: string;
  companyId: string;
}) {
  try {
    // Log the event
    await logAuditEvent({
      action: 'SYSTEM_CHANGE',
      resource: 'zapier_event',
      details: {
        event_type: 'campaign_launched',
        campaign_id: campaign.campaignId,
        campaign_title: campaign.campaignTitle
      }
    });
    
    // Trigger the Zapier event
    return await triggerBusinessEvent('campaign_launched', {
      entityId: campaign.campaignId,
      entityType: 'campaign',
      campaignTitle: campaign.campaignTitle,
      companyId: campaign.companyId,
      platform: campaign.platform,
      budget: campaign.budget,
      owner: campaign.owner,
    });
  } catch (error) {
    return { success: false, error };
  }
}
