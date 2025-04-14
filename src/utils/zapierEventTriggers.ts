
import { toast } from 'sonner';
import { triggerBusinessEvent, BusinessEventType, BusinessEventPayload } from '@/lib/zapier';

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
    
    const result = await triggerBusinessEvent('campaign_launched', {
      entityId: payload.campaignId,
      entityType: 'campaign',
      timestamp: new Date().toISOString(),
      ...payload
    });
    
    if (result.success) {
      console.log('Campaign launch notification sent successfully');
    } else {
      console.warn('Campaign launch notification failed:', result.error);
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
    } else {
      console.warn('Lead added notification failed:', result.error);
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
    
    const result = await triggerBusinessEvent('strategy_approved', {
      entityId: payload.strategyId,
      entityType: 'strategy',
      timestamp: new Date().toISOString(),
      ...payload
    });
    
    if (!result.success) {
      console.warn('Strategy approved notification failed:', result.error);
    }
    
    return result;
  } catch (error) {
    console.error('Error triggering strategy approved event:', error);
    return { success: false, error };
  }
}
