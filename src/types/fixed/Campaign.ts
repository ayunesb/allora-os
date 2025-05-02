
export type CampaignStatus = "draft" | "active" | "paused" | "completed";
export type Platform = "meta" | "tiktok" | "email" | "whatsapp";

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  platform: Platform;
  status: CampaignStatus;
  budget: number;
  goal?: string;
  executiveBot?: string;
  justification?: string;
  adCopy?: string;
  audience?: string;
  healthScore?: string;
  impressions?: number;
  clicks?: number;
  leads?: number;
  roi?: number;
  aiGenerated?: boolean;
  platform_specific_id?: string;
  management_fee?: number;
  total_amount?: number;
  deployment_status?: string;
  payment_status?: string;
  last_synced_at?: string;
  platform_status?: string;
  creatives?: any;
  // Add back these fields which are referenced in components
  performance_metrics?: any;
  ad_platform?: string;
  startDate?: string;
  endDate?: string;
}
