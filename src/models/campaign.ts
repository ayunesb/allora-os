
export type Platform = 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok' | 'Twitter' | 'Email' | 'Other';

// Define an ExecutiveBot type that can be either a string or an object
export type ExecutiveBot = string | {
  name: string;
  role?: string;
  avatar?: string;
};

export type Campaign = {
  id: string;
  company_id?: string;
  name: string;
  platform: Platform;
  budget?: number;
  status?: 'Draft' | 'Active' | 'Paused' | 'Completed';
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
};

// These were missing and referenced in campaignService.ts
export type CampaignCreate = Omit<Campaign, 'id' | 'created_at' | 'updated_at'>;
export type CampaignUpdate = Partial<Omit<Campaign, 'id' | 'created_at'>>;
