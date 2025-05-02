export type CampaignStatus = "draft" | "active" | "paused" | "completed";
export type Platform = "meta" | "tiktok" | "email" | "whatsapp";

export type ExecutiveBot = string | {
  name: string;
  role?: string;
  avatar?: string;
};

export interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  budget: number;
  description?: string;
  adCopy?: string;
  goal?: string;
  audience?: string;
  executiveBot?: string;
  justification?: string;
  status: CampaignStatus;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
  created_at?: string;
  updated_at?: string;
  metrics?: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
    cost?: number;
    ctr?: number;
    cpc?: number;
    conversionRate?: number;
  };
  deployment_status?: string;
  payment_status?: string;
  platform_status?: string;
  ad_platform?: string;
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
}
