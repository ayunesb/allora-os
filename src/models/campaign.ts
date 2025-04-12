
export type Platform = 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok' | 'Twitter' | 'Email' | 'Other';

// Define an ExecutiveBot type that can be either a string or an object
export type ExecutiveBot = string | {
  name: string;
  role?: string;
  avatar?: string;
};

export type CampaignStatus = 'Draft' | 'Active' | 'Paused' | 'Completed' | 'Approved';

export type Campaign = {
  id: string;
  company_id?: string;
  name: string;
  platform: Platform;
  budget?: number;
  status?: CampaignStatus;
  created_at?: string;
  updated_at?: string;
  executiveBot?: ExecutiveBot;
  justification?: string;
  roi?: string;
  target_audience?: string;
  companies?: { name: string; };
  // Campaign metrics
  impressions?: number;
  clicks?: number;
  leads?: number;
  conversions?: number;
  ctr?: number;
  conversionRate?: number;
  costPerLead?: number;
  startDate?: string;
  endDate?: string;
  healthScore?: 'good' | 'warning' | 'critical';
  // For AI-generated campaigns
  aiGenerated?: boolean;
  description?: string;
  collaborators?: any[];
  // Added fields for our new functionality
  ad_platform?: 'meta' | 'tiktok';
  deployment_status?: 'pending' | 'ready' | 'deployed';
  platform_status?: string;
  payment_status?: 'pending' | 'paid';
  platform_specific_id?: string;
  management_fee?: number;
  total_amount?: number;
  performance_metrics?: {
    impressions?: number;
    clicks?: number;
    ctr?: string;
    spend?: string;
    conversions?: number;
    cpa?: string;
    video_views?: number;
  };
  targeting?: {
    audience?: string;
    location?: string;
    interests?: string[];
    age_range?: string;
    gender?: string;
  };
  creatives?: Array<{
    title?: string;
    description?: string;
    image_url?: string;
    video_url?: string;
    call_to_action?: string;
  }>;
  last_synced_at?: string;
  stripe_payment_id?: string;
};

// These were missing and referenced in campaignService.ts
export type CampaignCreate = Omit<Campaign, 'id' | 'created_at' | 'updated_at'>;
export type CampaignUpdate = Partial<Campaign>;
