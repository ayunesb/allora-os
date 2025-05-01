
import { toast } from 'sonner';
import { CampaignPayload, LeadPayload } from '@/components/admin/launch-verification/types';
import { BusinessEventType } from '@/utils/webhookTypes';

export type { BusinessEventType };

export interface BusinessEventPayload {
  eventType: BusinessEventType;
  data: Record<string, any>;
}

export const useZapier = () => {
  const triggerWebhook = async (url: string, payload: any) => {
    if (!url) {
      toast.error("No webhook URL provided");
      return false;
    }

    try {
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          ...payload,
          timestamp: new Date().toISOString(),
        }),
      });
      
      return true;
    } catch (error) {
      console.error('Error triggering webhook:', error);
      return false;
    }
  };

  const triggerBusinessEvent = async (
    webhookUrl: string,
    eventType: BusinessEventType,
    data: Record<string, any>
  ) => {
    return triggerWebhook(webhookUrl, {
      eventType,
      data,
    });
  };

  const triggerCampaignCreated = async (webhookUrl: string, campaign: CampaignPayload) => {
    return triggerBusinessEvent(webhookUrl, 'campaign_created', campaign);
  };

  const triggerLeadConverted = async (webhookUrl: string, lead: LeadPayload) => {
    return triggerBusinessEvent(webhookUrl, 'lead_converted', lead);
  };

  return {
    triggerWebhook,
    triggerBusinessEvent,
    triggerCampaignCreated,
    triggerLeadConverted,
  };
};

// Export triggerBusinessEvent for tests
export const triggerBusinessEvent = async (
  eventType: BusinessEventType,
  data: Record<string, any>
) => {
  // This is a simplified version for test mocking purposes
  console.log(`Simulating business event: ${eventType}`, data);
  return { success: true };
};
