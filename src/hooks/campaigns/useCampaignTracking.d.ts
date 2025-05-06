export declare function useCampaignTracking(): {
  trackCampaignView: (campaignId: string, campaignName: string) => void;
  trackCampaignApprove: (
    campaignId: string,
    campaignName: string,
    executiveName: string,
  ) => void;
};
