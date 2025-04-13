
/**
 * Allora AI: Automatic Zapier Trigger System
 * Real-Time Event-Driven Automations
 */

import { triggerBusinessEvent } from '@/lib/zapier';
import { logAuditEvent } from '@/utils/auditLogger';

// Helper to improve typing and tracking
const trackAndTriggerEvent = async (
  eventType: string,
  payload: any,
  userId?: string
): Promise<boolean> => {
  try {
    // Log the event for audit purposes
    await logAuditEvent({
      user: userId || payload.companyId || 'system',
      action: 'SYSTEM_CHANGE',
      resource: 'zapier_event',
      details: {
        eventType,
        payload,
        timestamp: new Date().toISOString()
      }
    });
    
    // Trigger the actual Zapier webhook
    const result = await triggerBusinessEvent(eventType as any, payload);
    return result.success;
  } catch (error) {
    console.error(`Error triggering Zapier event ${eventType}:`, error);
    return false;
  }
};

/**
 * When a new Strategy is Approved
 */
export async function onStrategyApproved(strategy: {
  company: string;
  strategyTitle: string;
  suggestedBy: string;
  strategyId?: string;
  companyId?: string;
  userId?: string;
}): Promise<boolean> {
  return await trackAndTriggerEvent('strategy_approved', {
    companyId: strategy.companyId || strategy.company,
    entityId: strategy.strategyId,
    entityType: 'strategy',
    strategyName: strategy.strategyTitle,
    suggestedBy: strategy.suggestedBy,
    timestamp: new Date().toISOString()
  }, strategy.userId);
}

/**
 * When a new Lead is Added
 */
export async function onNewLeadAdded(lead: {
  company: string;
  leadName: string;
  source: string;
  leadId?: string;
  companyId?: string;
  userId?: string;
  email?: string;
  phone?: string;
}): Promise<boolean> {
  return await trackAndTriggerEvent('lead_added', {
    companyId: lead.companyId || lead.company,
    entityId: lead.leadId,
    entityType: 'lead',
    leadName: lead.leadName,
    source: lead.source,
    contactInfo: {
      email: lead.email,
      phone: lead.phone
    },
    timestamp: new Date().toISOString()
  }, lead.userId);
}

/**
 * When a Campaign is Launched
 */
export async function onCampaignLaunched(campaign: {
  campaignTitle: string;
  platform: string;
  owner: string;
  campaignId?: string;
  companyId?: string;
  budget?: number;
  userId?: string;
  targetAudience?: string;
}): Promise<boolean> {
  return await trackAndTriggerEvent('campaign_launched', {
    companyId: campaign.companyId,
    entityId: campaign.campaignId,
    entityType: 'campaign',
    campaignTitle: campaign.campaignTitle,
    platform: campaign.platform,
    owner: campaign.owner,
    budget: campaign.budget,
    targetAudience: campaign.targetAudience,
    timestamp: new Date().toISOString()
  }, campaign.userId);
}

/**
 * When a Shopify Order is Placed
 */
export async function onShopifyOrderPlaced(order: {
  orderId: string;
  customerName: string;
  revenue: number;
  companyId?: string;
  products?: any[];
  userId?: string;
}): Promise<boolean> {
  return await trackAndTriggerEvent('shopify_order_placed', {
    companyId: order.companyId,
    entityId: order.orderId,
    entityType: 'order',
    orderNumber: order.orderId,
    customerName: order.customerName,
    revenue: order.revenue,
    products: order.products,
    timestamp: new Date().toISOString()
  }, order.userId);
}

/**
 * When a New Client Signs Up
 */
export async function onNewClientSignup(client: {
  companyName: string;
  clientName: string;
  clientId?: string;
  companyId?: string;
  industry?: string;
  referralSource?: string;
  userId?: string;
}): Promise<boolean> {
  return await trackAndTriggerEvent('new_client_signed', {
    companyId: client.companyId || client.companyName,
    entityId: client.clientId,
    entityType: 'client',
    companyName: client.companyName,
    clientName: client.clientName,
    industry: client.industry,
    referralSource: client.referralSource,
    timestamp: new Date().toISOString()
  }, client.userId);
}

/**
 * When Revenue Milestone is Hit
 */
export async function onRevenueMilestone(milestone: {
  companyName: string;
  amount: number;
  milestoneId?: string;
  companyId?: string;
  source?: string;
  userId?: string;
}): Promise<boolean> {
  return await trackAndTriggerEvent('revenue_milestone_reached', {
    companyId: milestone.companyId || milestone.companyName,
    entityId: milestone.milestoneId,
    entityType: 'revenue',
    companyName: milestone.companyName,
    amount: milestone.amount,
    source: milestone.source,
    milestone: milestone.amount >= 1000000 ? '$1M+' : 
               milestone.amount >= 500000 ? '$500K+' : 
               milestone.amount >= 100000 ? '$100K+' : 
               milestone.amount >= 50000 ? '$50K+' : 
               milestone.amount >= 10000 ? '$10K+' : '$1K+',
    timestamp: new Date().toISOString()
  }, milestone.userId);
}

/**
 * When a Communications Event Happens (Call, Email, Meeting)
 */
export async function onCommunicationEvent(communication: {
  type: 'call' | 'email' | 'meeting' | 'whatsapp';
  leadId: string;
  leadName: string;
  outcome?: string;
  scheduledAt?: string;
  duration?: number;
  companyId?: string;
  communicationId?: string;
  userId?: string;
}): Promise<boolean> {
  return await trackAndTriggerEvent('communication_event', {
    companyId: communication.companyId,
    entityId: communication.communicationId,
    entityType: 'communication',
    communicationType: communication.type,
    leadId: communication.leadId,
    leadName: communication.leadName,
    outcome: communication.outcome,
    scheduledAt: communication.scheduledAt,
    duration: communication.duration,
    timestamp: new Date().toISOString()
  }, communication.userId);
}

/**
 * When a User Completes Onboarding
 */
export async function onOnboardingCompleted(onboarding: {
  userId: string;
  companyId: string;
  companyName: string;
  industry?: string;
  riskAppetite?: string;
}): Promise<boolean> {
  return await trackAndTriggerEvent('onboarding_completed', {
    companyId: onboarding.companyId,
    entityId: onboarding.userId,
    entityType: 'user',
    companyName: onboarding.companyName,
    industry: onboarding.industry,
    riskAppetite: onboarding.riskAppetite,
    timestamp: new Date().toISOString()
  }, onboarding.userId);
}

/**
 * When a Payment is Processed
 */
export async function onPaymentProcessed(payment: {
  amount: number;
  status: 'success' | 'failed' | 'pending';
  paymentId: string;
  companyId: string;
  userId: string;
  purchaseType: string;
  invoiceId?: string;
}): Promise<boolean> {
  return await trackAndTriggerEvent('payment_processed', {
    companyId: payment.companyId,
    entityId: payment.paymentId,
    entityType: 'payment',
    amount: payment.amount,
    status: payment.status,
    purchaseType: payment.purchaseType,
    invoiceId: payment.invoiceId,
    timestamp: new Date().toISOString()
  }, payment.userId);
}
