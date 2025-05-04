import { PartialCompanyDetails } from '@/models/companyDetails';
interface OnboardingResult {
    success: boolean;
    error?: string;
}
/**
 * Saves onboarding information for a user and sets up external service integrations
 */
export declare function saveOnboardingInfo(userId: string, companyName: string, industry: string, goals: string[], companyDetails?: PartialCompanyDetails): Promise<OnboardingResult>;
export {};
