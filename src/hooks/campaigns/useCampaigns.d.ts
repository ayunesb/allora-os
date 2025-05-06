export interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: "draft" | "active" | "paused" | "completed";
  startDate?: string;
  endDate?: string;
  budget?: number;
  platform?: string;
  metrics?: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
    cost?: number;
    ctr?: number;
    cpc?: number;
    conversionRate?: number;
  };
  createdAt: string;
  updatedAt: string;
}
export interface CampaignCreateParams {
  name: string;
  description?: string;
  status?: "draft" | "active" | "paused" | "completed";
  startDate?: string;
  endDate?: string;
  budget?: number;
  platform?: string;
}
export interface CampaignUpdateParams extends Partial<CampaignCreateParams> {
  id: string;
}
export declare function useCampaigns(): {
  campaigns: Campaign[];
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string;
  fetchCampaigns: () => Promise<Campaign[]>;
  fetchCampaignById: (campaignId: string) => Promise<Campaign>;
  createCampaign: (params: CampaignCreateParams) => Promise<Campaign>;
  updateCampaign: (params: CampaignUpdateParams) => Promise<Campaign>;
  deleteCampaign: (campaignId: string) => Promise<void>;
  refetch: () => Promise<Campaign[]>;
};
