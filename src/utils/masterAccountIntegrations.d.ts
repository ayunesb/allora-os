/**
 * Creates integration records for a new company in all master service accounts
 * This function is called during the onboarding process to set up a company with all integrations
 */
export declare function setupCompanyIntegrations(companyId: string, companyName: string, industry: string, email: string): Promise<{
    success: boolean;
    error?: string;
}>;
/**
 * Retrieves the integration IDs for a company
 */
export declare function getCompanyIntegrationIds(companyId: string): Promise<Record<string, string> | null>;
