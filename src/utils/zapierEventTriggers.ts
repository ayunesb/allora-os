
import { CampaignPayload, LeadPayload } from '@/components/admin/launch-verification/types';
import { useZapier } from '@/lib/zapier';

export const onCampaignCreated = async (webhookUrl: string, campaign: CampaignPayload) => {
  const { triggerCampaignCreated } = useZapier();
  return triggerCampaignCreated(webhookUrl, campaign);
};

export const onLeadConverted = async (webhookUrl: string, lead: LeadPayload) => {
  const { triggerLeadConverted } = useZapier();
  return triggerLeadConverted(webhookUrl, lead);
};

export const onRevenueMilestoneReached = async (webhookUrl: string, data: Record<string, any>) => {
  const { triggerBusinessEvent } = useZapier();
  return triggerBusinessEvent(webhookUrl, 'revenue_milestone', data);
};

export const onUserOnboarded = async (webhookUrl: string, userId: string, userData: Record<string, any>) => {
  const { triggerBusinessEvent } = useZapier();
  return triggerBusinessEvent(webhookUrl, 'user_onboarded', {
    userId,
    ...userData
  });
};
