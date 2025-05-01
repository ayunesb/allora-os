
/**
 * This compatibility layer helps maintain backward compatibility
 * with older code that might be using different property names.
 */

import { Campaign } from '@/types/fixed/Campaign';
import { User } from '@/types/fixed/User';

export function normalizeCampaign(campaign: Campaign): Campaign {
  return {
    ...campaign,
    name: campaign.title || campaign.name,
    ad_platform: campaign.platform,
    startDate: campaign.start_date
  };
}

export function normalizeUser(user: any): User | null {
  if (!user) return null;
  
  // Ensure user has expected properties
  return {
    ...user,
    name: user.name || (user.user_metadata ? 
      `${user.user_metadata.firstName || ''} ${user.user_metadata.lastName || ''}`.trim() : ''),
    role: user.role || (user.user_metadata ? user.user_metadata.role : '') || 'user',
    avatar_url: user.avatar_url || (user.user_metadata ? user.user_metadata.avatar : undefined),
    // Make sure the company_id is available
    company_id: user.company_id || null,
    company: user.company || null,
    industry: user.industry || null
  };
}

export function injectPropertiesCompatibility() {
  /**
   * This is a utility to help with compatibility issues between different versions
   * of the same type definitions. It can be expanded as needed.
   */
  
  // Add other compatibility layer functions as needed
}
