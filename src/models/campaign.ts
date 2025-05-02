
import { Platform, CampaignStatus, Campaign as CampaignType, ExecutiveBot } from '@/types/unified-types';

// Re-export for backward compatibility
export type Platform = Platform;
export type ExecutiveBot = ExecutiveBot;
export type CampaignStatus = CampaignStatus;
export type Campaign = CampaignType;

// These were missing and referenced in campaignService.ts
export type CampaignCreate = Omit<CampaignType, 'id' | 'created_at' | 'updated_at'>;
export type CampaignUpdate = Partial<CampaignType>;
