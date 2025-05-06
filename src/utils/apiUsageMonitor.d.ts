export interface ApiUsageMetrics {
  totalApiCalls: number;
  openAiTokensUsed: number;
  strategyGenerations: number;
  campaignGenerations: number;
  scriptGenerations: number;
  aiDebateRuns: number;
  lastUpdated: Date;
}
export interface UsageLimits {
  tier: "starter" | "pro" | "enterprise";
  maxApiCalls: number;
  maxOpenAiTokens: number;
  maxStrategyGenerations: number;
  maxCampaignGenerations: number;
  maxScriptGenerations: number;
  maxAiDebateRuns: number;
}
/**
 * Records API usage for a specific company
 */
export declare function recordApiUsage(
  companyId: string,
  usageType: keyof Omit<ApiUsageMetrics, "lastUpdated" | "totalApiCalls">,
  amount?: number,
): Promise<boolean>;
/**
 * Gets API usage for a specific company
 */
export declare function getApiUsage(
  companyId: string,
): Promise<ApiUsageMetrics | null>;
/**
 * Gets usage summary for admin dashboard
 */
export declare function getUsageSummary(): Promise<Record<string, any>[]>;
