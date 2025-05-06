import { Campaign } from "@/models/campaign";
interface CreateCampaignInput {
  name: string;
  platform: string;
  budget: number;
  targeting: any;
  creatives: any[];
  company_id?: string;
}
/**
 * Create a new ad campaign
 */
export declare function createCampaign(
  campaignData: CreateCampaignInput,
): Promise<{
  success: boolean;
  campaignId?: string;
  error?: string;
}>;
/**
 * Creates a checkout session for campaign payment
 */
export declare function createCampaignCheckout(
  campaignId: string,
  cancelUrl?: string,
): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}>;
/**
 * Check the payment status of a campaign
 */
export declare function checkCampaignPaymentStatus(
  campaignId: string,
): Promise<{
  success: boolean;
  status?: string;
  error?: string;
}>;
/**
 * Deploy campaign to ad platform
 */
export declare function deployCampaign(campaignId: string): Promise<{
  success: boolean;
  error?: string;
}>;
/**
 * Sync campaign data from ad platform
 */
export declare function syncCampaignData(campaignId: string): Promise<{
  success: boolean;
  metrics?: any;
  error?: string;
}>;
export declare function getCampaign(
  campaignId: string,
): Promise<Campaign | null>;
export {};
