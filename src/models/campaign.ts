
import { Platform, CampaignStatus, Campaign as CampaignType } from '@/types/unified-types';

// Re-export for backward compatibility
export type { Platform, CampaignStatus, CampaignType as Campaign };

// These were missing and referenced in campaignService.ts
export type CampaignCreate = Omit<CampaignType, 'id' | 'created_at' | 'updated_at'>;
export type CampaignUpdate = Partial<CampaignType>;
