
import { Profile } from './user';

export interface Campaign {
  id: string;
  name: string;
  platform: PlatformType;
  budget: number;
  company_id: string;
  created_at: string;
  companies?: {
    name: string;
  };
}

export type PlatformType = 'Email' | 'Facebook' | 'Instagram' | 'Twitter' | 'LinkedIn' | 'Google' | 'TikTok' | string;

// Type for creating a new campaign
export interface CampaignCreate {
  name: string;
  platform: PlatformType;
  budget: number;
  company_id: string;
}

// Type for updating an existing campaign
export type CampaignUpdate = Partial<Omit<Campaign, 'id' | 'created_at' | 'companies'>>;

// Campaign with additional metadata that might be useful for the UI
export interface CampaignWithMetadata extends Campaign {
  status?: 'active' | 'paused' | 'completed';
  performance?: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
    roi?: number;
  };
  assignedTo?: Profile;
}
