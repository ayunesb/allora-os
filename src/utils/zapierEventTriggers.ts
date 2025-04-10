
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
}) {
  return await triggerBusinessEvent('new_strategy_approved', {
    companyId: strategy.company,
    entityType: 'strategy',
    company: strategy.company,
    strategy_title: strategy.strategyTitle,
    suggested_by: strategy.suggestedBy,
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
}) {
  return await triggerBusinessEvent('new_lead_added', {
    companyId: lead.company,
    entityId: lead.leadId,
    entityType: 'lead',
    company: lead.company,
    lead_name: lead.leadName,
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
    campaign_title: campaign.campaignTitle,
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
    order_id: order.orderId,
    customer_name: order.customerName,
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
}) {
  return await triggerBusinessEvent('new_client_signed', {
    companyId: client.companyName,
    entityId: client.clientId,
    entityType: 'client',
    company_name: client.companyName,
    client_name: client.clientName,
    timestamp: new Date().toISOString()
  });
}

/**
 * When Revenue Milestone is Hit
 */
export async function onRevenueMilestone(milestone: {
  companyName: string;
  amount: number;
}) {
  return await triggerBusinessEvent('revenue_milestone', {
    companyId: milestone.companyName,
    entityType: 'revenue',
    company_name: milestone.companyName,
    amount: milestone.amount,
    timestamp: new Date().toISOString()
  });
}
