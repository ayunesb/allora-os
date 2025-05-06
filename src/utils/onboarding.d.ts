/**
 * Create a new tenant and assign the current user as admin
 * @param userId Current user ID
 * @param companyData Company profile data
 * @returns Success status
 */
export declare function createTenant(
  userId: string,
  companyData: {
    name: string;
    industry?: string;
    website_url?: string;
    target_customer?: string;
    risk_appetite?: string;
    goals?: string[];
  },
): Promise<{
  success: boolean;
  tenantId?: string;
  error?: string;
}>;
/**
 * Check if onboarding is complete for a user
 * @param userId The user ID to check
 */
export declare function checkOnboardingStatus(userId: string): Promise<boolean>;
/**
 * Complete the onboarding process
 */
export declare function completeOnboarding(
  userId: string,
  data: any,
): Promise<boolean>;
export declare function saveOnboardingInfo(
  userId: string,
  data: any,
): Promise<boolean>;
