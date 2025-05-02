export type CampaignStatus = "draft" | "active" | "paused" | "completed";
export type Platform = "meta" | "tiktok" | "email" | "whatsapp";

export interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  status: CampaignStatus;
  executiveBot?: string;
  justification?: string;
  healthScore?: string;
  impressions?: number;
  clicks?: number;
  leads?: number;
  roi?: number;
  creatives?: any;
  ad_platform?: never;
}

export type WebhookType = "zapier" | "custom" | "stripe" | "slack" | "github" | "notion";
export interface WebhookEvent {
  id: string;
  event_type: string;
  webhookType: WebhookType;
  timestamp?: string;
  duration?: number;
  targetUrl?: string;
  url?: string;
  response?: any;
}

export interface SocialMediaPost {
  id: string;
  content: string;
  platform: Platform;
  created_at: string;
  updated_at?: string;
}
