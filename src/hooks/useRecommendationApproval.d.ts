export declare function useRecommendationApproval(): {
  handleApproveRecommendation: (
    recommendation: any,
    index: number,
    riskAppetite: string,
  ) => Promise<number>;
  isApproving: boolean;
};
