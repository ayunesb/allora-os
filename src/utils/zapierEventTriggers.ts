
import { CampaignPayload, LeadPayload, WebhookResult } from '@/types/Webhooks';
import { useZapier, triggerBusinessEvent as triggerEvent } from '@/lib/zapier';
import { logAuditEvent } from '@/utils/auditLogger';

export const onCampaignCreated = async (webhookUrl: string, campaign: CampaignPayload): Promise<WebhookResult> => {
  const { triggerCampaignCreated } = useZapier();
  return triggerCampaignCreated(webhookUrl, campaign);
};

export const onLeadConverted = async (webhookUrl: string, lead: LeadPayload): Promise<WebhookResult> => {
  const { triggerLeadConverted } = useZapier();
  return triggerLeadConverted(webhookUrl, lead);
};

export const onRevenueMilestoneReached = async (webhookUrl: string, data: Record<string, any>): Promise<WebhookResult> => {
  const { triggerBusinessEvent } = useZapier();
  return triggerBusinessEvent(webhookUrl, 'revenue_milestone', data);
};

export const onUserOnboarded = async (webhookUrl: string, userId: string, userData: Record<string, any>): Promise<WebhookResult> => {
  const { triggerBusinessEvent } = useZapier();
  return triggerBusinessEvent(webhookUrl, 'user_onboarded', {
    userId,
    ...userData
  });
};

export const onCampaignLaunched = async (webhookUrl: string, campaign: CampaignPayload): Promise<WebhookResult> => {
  try {
    const result = await triggerEvent(webhookUrl, 'campaign_launched', {
      entityId: campaign.campaignId,
      entityType: 'campaign',
      campaignTitle: campaign.campaignTitle,
      companyId: campaign.companyId
    });
    
    await logAuditEvent('SYSTEM_CHANGE', 'Triggered campaign_launched Zapier webhook', undefined, {
      campaignId: campaign.campaignId,
      success: true
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error triggering campaign_launched webhook:', error);
    
    await logAuditEvent('SYSTEM_ERROR', 'Failed to trigger campaign_launched Zapier webhook', undefined, {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return { success: false, error };
  }
};

export const onNewLeadAdded = async (webhookUrl: string, lead: LeadPayload): Promise<WebhookResult> => {
  try {
    const result = await triggerEvent(webhookUrl, 'lead_added', {
      entityId: lead.leadId,
      entityType: 'lead',
      leadName: lead.leadName,
      company: lead.company
    });
    
    await logAuditEvent('SYSTEM_CHANGE', 'Triggered lead_added Zapier webhook', undefined, {
      leadId: lead.leadId,
      success: true
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error triggering lead_added webhook:', error);
    
    await logAuditEvent('SYSTEM_ERROR', 'Failed to trigger lead_added Zapier webhook', undefined, {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return { success: false, error };
  }
};

export const onStrategyApproved = async (webhookUrl: string, strategy: Record<string, any>): Promise<WebhookResult> => {
  try {
    const result = await triggerEvent(webhookUrl, 'strategy_approved', {
      entityId: strategy.strategyId,
      entityType: 'strategy',
      strategyTitle: strategy.strategyTitle,
      companyId: strategy.companyId
    });
    
    await logAuditEvent('SYSTEM_CHANGE', 'Triggered strategy_approved Zapier webhook', undefined, {
      strategyId: strategy.strategyId,
      success: true
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error triggering strategy_approved webhook:', error);
    
    await logAuditEvent('SYSTEM_ERROR', 'Failed to trigger strategy_approved Zapier webhook', undefined, {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    return { success: false, error };
  }
};
