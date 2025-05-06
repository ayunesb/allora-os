import {
  Platform,
  CampaignStatus,
  Campaign as CampaignType,
} from "@/types/unified-types";
export type { Platform, CampaignStatus, CampaignType as Campaign };
export type CampaignCreate = Omit<
  CampaignType,
  "id" | "created_at" | "updated_at"
>;
export type CampaignUpdate = Partial<CampaignType>;
