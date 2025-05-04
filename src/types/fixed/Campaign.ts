export type CampaignStatus = "draft" | "active" | "paused" | "completed";
export type Platform = "meta" | "tiktok" | "email" | "whatsapp";

export type Campaign = {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate?: string;
  plugin_id?: string;
  [key: string]: any;
};
