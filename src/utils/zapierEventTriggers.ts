
import { useZapier } from '@/lib/zapier';

/**
 * Trigger a lead converted event
 */
export async function onLeadConverted({
  leadId,
  leadName,
  company,
  email,
  source
}: {
  leadId: string;
  leadName: string;
  company: string;
  email: string;
  source: string;
}) {
  const { webhookUrl, triggerWebhook } = useZapier();
  
  if (!webhookUrl) {
    console.error('No Zapier webhook URL configured');
    return false;
  }

  return triggerWebhook('LEAD_CONVERTED', {
    leadId,
    leadName,
    company,
    email,
    source,
    conversionTimestamp: new Date().toISOString()
  });
}

/**
 * Trigger a campaign created event
 */
export async function onCampaignCreated({
  campaignId,
  campaignTitle,
  platform,
  budget,
  owner,
  companyId
}: {
  campaignId: string;
  campaignTitle: string;
  platform: string;
  budget: number;
  owner: string;
  companyId: string;
}) {
  const { webhookUrl, triggerWebhook } = useZapier();
  
  if (!webhookUrl) {
    console.error('No Zapier webhook URL configured');
    return false;
  }

  return triggerWebhook('CAMPAIGN_CREATED', {
    campaignId,
    campaignTitle,
    platform,
    budget,
    owner,
    companyId,
    creationTimestamp: new Date().toISOString()
  });
}

/**
 * Trigger a revenue milestone event
 */
export async function onRevenueMilestoneReached({
  companyId,
  milestone,
  amount,
  currency = 'USD'
}: {
  companyId: string;
  milestone: string;
  amount: number;
  currency?: string;
}) {
  const { webhookUrl, triggerWebhook } = useZapier();
  
  if (!webhookUrl) {
    console.error('No Zapier webhook URL configured');
    return false;
  }

  return triggerWebhook('REVENUE_MILESTONE', {
    companyId,
    milestone,
    amount,
    currency,
    reachedAt: new Date().toISOString()
  });
}
