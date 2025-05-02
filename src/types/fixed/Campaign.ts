
export type CampaignStatus = "draft" | "active" | "paused" | "completed";
export type Platform = "meta" | "tiktok" | "email" | "whatsapp";

export interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  status: CampaignStatus;
  budget: number;
  goal?: string;
  executiveBot?: string;
  justification?: string;
  adCopy?: string;
  audience?: string;
  startDate?: string;
  endDate?: string;
  platform_specific_id?: string;
  management_fee?: number;
  total_amount?: number;
}
