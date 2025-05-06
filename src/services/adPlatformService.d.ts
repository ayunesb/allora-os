export interface AdPlatformConnection {
  id: string;
  platform: "meta" | "tiktok";
  ad_account_id: string;
  access_token: string;
  token_expires_at: string;
  is_active: boolean;
  created_at: string;
}
/**
 * Initiate Meta auth flow
 */
export declare function initiateMetaAuth(): Promise<
  | {
      success: boolean;
      error?: undefined;
    }
  | {
      success: boolean;
      error: any;
    }
>;
/**
 * Initiate TikTok auth flow
 */
export declare function initiateTikTokAuth(): Promise<
  | {
      success: boolean;
      error?: undefined;
    }
  | {
      success: boolean;
      error: any;
    }
>;
/**
 * Get all ad platform connections for the company
 */
export declare function getAdPlatformConnections(): Promise<
  AdPlatformConnection[]
>;
/**
 * Disconnect an ad platform
 */
export declare function disconnectAdPlatform(
  platform: "meta" | "tiktok",
): Promise<
  | {
      success: boolean;
      error?: undefined;
    }
  | {
      success: boolean;
      error: any;
    }
>;
