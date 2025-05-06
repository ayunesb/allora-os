import { Campaign, Platform } from "@/models/campaign";
export declare function fetchCompanyCampaigns(
  companyId: string,
): Promise<Campaign[]>;
export declare function fetchCampaign(
  campaignId: string,
): Promise<Campaign | null>;
export declare function createCampaign(
  companyId: string,
  name: string,
  platform: Platform,
  budget: number,
): Promise<Campaign | null>;
export declare function updateCampaign(
  campaignId: string,
  updates: Partial<Omit<Campaign, "id" | "created_at" | "company_id">>,
): Promise<boolean>;
export declare function deleteCampaign(campaignId: string): Promise<boolean>;
