
/**
 * This compatibility layer helps maintain backward compatibility
 * with older code that might be using different property names.
 */

import { Campaign } from '@/types/fixed/Campaign';

export function normalizeCampaign(campaign: Campaign): Campaign {
  return {
    ...campaign,
    name: campaign.title || campaign.name,
    ad_platform: campaign.platform,
  };
}

export function normalizeUser(user: any): any {
  if (!user) return null;
  
  // Ensure user has expected properties
  return {
    ...user,
    name: user.name || (user.user_metadata ? 
      `${user.user_metadata.firstName || ''} ${user.user_metadata.lastName || ''}`.trim() : ''),
    role: user.role || (user.user_metadata ? user.user_metadata.role : '') || 'user',
    avatar_url: user.avatar_url || (user.user_metadata ? user.user_metadata.avatar : undefined),
  };
}

export function injectPropertiesCompatibility() {
  /**
   * This is a utility to help with compatibility issues between different versions
   * of the same type definitions. It can be expanded as needed.
   */
  
  // Add other compatibility layer functions as needed
}
