
export type Campaign = {
  id: string;
  company_id?: string;
  name: string;
  platform: 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok' | 'Email' | 'Other';
  budget?: number;
  status?: 'Draft' | 'Active' | 'Paused' | 'Completed';
  created_at?: string;
  updated_at?: string;
  executiveBot?: string;
  justification?: string;
  roi?: string;
  target_audience?: string;
  companies?: { name: string; };
};

// These were missing and referenced in campaignService.ts
export type CampaignCreate = Omit<Campaign, 'id' | 'created_at' | 'updated_at'>;
export type CampaignUpdate = Partial<Omit<Campaign, 'id' | 'created_at'>>;
