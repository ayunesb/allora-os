
import { WebhookType, BusinessEventType } from '@/types/fixed/Webhook';

export const triggerBusinessEvent = (
  webhookUrl: string,
  eventType: BusinessEventType,
  data: Record<string, any>
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType,
        data,
        timestamp: new Date().toISOString(),
      }),
      mode: 'no-cors', // Use no-cors to handle CORS issues
    })
      .then(() => {
        // With no-cors, we don't get a useful response, so we assume success
        resolve(true);
      })
      .catch((error) => {
        console.error('Error triggering webhook:', error);
        reject(error);
      });
  });
};

export const useZapier = () => {
  return {
    triggerWorkflow: (webhookUrl: string, data: Record<string, any>) => {
      return triggerBusinessEvent(webhookUrl, 'test_webhook', data);
    },
    triggerCampaignCreated: (webhookUrl: string, data: Record<string, any>) => {
      return triggerBusinessEvent(webhookUrl, 'campaign_created', data);
    },
    triggerLeadConverted: (webhookUrl: string, data: Record<string, any>) => {
      return triggerBusinessEvent(webhookUrl, 'lead_converted', data);
    },
    triggerStrategyApproved: (webhookUrl: string, data: Record<string, any>) => {
      return triggerBusinessEvent(webhookUrl, 'strategy_approved', data);
    },
    triggerRevenueMilestone: (webhookUrl: string, data: Record<string, any>) => {
      return triggerBusinessEvent(webhookUrl, 'revenue_milestone', data);
    },
    triggerCampaignLaunched: (webhookUrl: string, data: Record<string, any>) => {
      return triggerBusinessEvent(webhookUrl, 'campaign_launched', data);
    },
    triggerLeadAdded: (webhookUrl: string, data: Record<string, any>) => {
      return triggerBusinessEvent(webhookUrl, 'lead_added', data);
    },
    triggerNewLead: (webhookUrl: string, data: Record<string, any>) => {
      return triggerBusinessEvent(webhookUrl, 'new_lead', data);
    },
    triggerUserOnboarded: (webhookUrl: string, data: Record<string, any>) => {
      return triggerBusinessEvent(webhookUrl, 'user_onboarded', data);
    }
  };
};
