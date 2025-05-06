export * from "./saveOnboarding";
export * from "./completeOnboarding";
/**
 * Checks if a user has already completed onboarding
 * @param userId The user ID to check
 * @returns Boolean indicating if onboarding is completed
 */
export declare function checkOnboardingStatus(userId: string): Promise<boolean>;
