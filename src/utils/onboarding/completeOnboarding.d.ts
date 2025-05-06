interface CompletionResult {
  success: boolean;
  error?: string;
}
/**
 * Completes the user onboarding process by setting the onboarding_completed flag in the profile
 */
export declare function completeOnboarding(
  userId: string,
  companyId: string,
  industry: string,
  platformConnections?: {
    meta?: boolean;
    tiktok?: boolean;
  },
): Promise<CompletionResult>;
export {};
