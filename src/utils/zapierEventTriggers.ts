
/**
 * Allora AI: Automatic Zapier Trigger System
 * Real-Time Event-Driven Automations
 */

import { triggerBusinessEvent } from '@/lib/zapier';

/**
 * When a new Strategy is Approved
 */
export async function onStrategyApproved(strategy: {
  company: string;
  strategyTitle: string;
  suggestedBy: string;
  strategyId?: string;
  companyId?: string;
}) {
  return await triggerBusinessEvent('strategy_approved', {
    companyId: strategy.companyId || strategy.company,
    entityId: strategy.strategyId,
    entityType: 'strategy',
    strategyName: strategy.strategyTitle,
    suggestedBy: strategy.suggestedBy,
    timestamp: new Date().toISOString()
  });
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
}) {
  return await triggerBusinessEvent('lead_added', {
    companyId: lead.companyId || lead.company,
    entityId: lead.leadId,
    entityType: 'lead',
    leadName: lead.leadName,
    source: lead.source,
    timestamp: new Date().toISOString()
  });
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
}) {
  return await triggerBusinessEvent('campaign_launched', {
    companyId: campaign.companyId,
    entityId: campaign.campaignId,
    entityType: 'campaign',
    campaignTitle: campaign.campaignTitle,
    platform: campaign.platform,
    owner: campaign.owner,
    timestamp: new Date().toISOString()
  });
}

/**
 * When a Shopify Order is Placed
 */
export async function onShopifyOrderPlaced(order: {
  orderId: string;
  customerName: string;
  revenue: number;
  companyId?: string;
}) {
  return await triggerBusinessEvent('shopify_order_placed', {
    companyId: order.companyId,
    entityId: order.orderId,
    entityType: 'order',
    orderNumber: order.orderId,
    customerName: order.customerName,
    revenue: order.revenue,
    timestamp: new Date().toISOString()
  });
}

/**
 * When a New Client Signs Up
 */
export async function onNewClientSignup(client: {
  companyName: string;
  clientName: string;
  clientId?: string;
  companyId?: string;
}) {
  return await triggerBusinessEvent('new_client_signed', {
    companyId: client.companyId || client.companyName,
    entityId: client.clientId,
    entityType: 'client',
    companyName: client.companyName,
    clientName: client.clientName,
    timestamp: new Date().toISOString()
  });
}

/**
 * When Revenue Milestone is Hit
 */
export async function onRevenueMilestone(milestone: {
  companyName: string;
  amount: number;
  milestoneId?: string;
  companyId?: string;
}) {
  return await triggerBusinessEvent('revenue_milestone_reached', {
    companyId: milestone.companyId || milestone.companyName,
    entityId: milestone.milestoneId,
    entityType: 'revenue',
    companyName: milestone.companyName,
    amount: milestone.amount,
    milestone: milestone.amount >= 1000000 ? '$1M+' : 
               milestone.amount >= 500000 ? '$500K+' : 
               milestone.amount >= 100000 ? '$100K+' : 
               milestone.amount >= 50000 ? '$50K+' : 
               milestone.amount >= 10000 ? '$10K+' : '$1K+',
    timestamp: new Date().toISOString()
  });
}
