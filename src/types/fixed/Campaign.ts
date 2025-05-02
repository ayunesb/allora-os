
export type Platform = 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok' | 'Twitter' | 'Email' | 'Other' | 'meta' | 'tiktok' | 'whatsapp' | 'email';

export type CampaignStatus = 'draft' | 'active' | 'paused' | 'completed';

export type ExecutiveBot = string | {
  name: string;
  role?: string;
  avatar?: string;
};

export interface Campaign {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  platform?: Platform;
  ad_platform?: string;
  status?: CampaignStatus;
  start_date?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  deployment_status?: string;
  payment_status?: string;
  platform_status?: string;
  channel?: string;
  summary?: string;
  tags?: string[];
  metrics?: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
    cost?: number;
    ctr?: number;
    cpc?: number;
    conversionRate?: number;
  };
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
  executiveBot?: ExecutiveBot;
  justification?: string;
  roi?: string;
  target_audience?: string;
}
