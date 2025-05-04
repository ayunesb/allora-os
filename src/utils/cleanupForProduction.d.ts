/**
 * Verifies if all required API secrets are available
 */
export declare function verifyApiSecrets(): Promise<{
    success: boolean;
    missingSecrets?: string[];
    error?: string;
}>;
/**
 * Removes test data from the application's database
 */
export declare function removeTestData(): Promise<{
    success: boolean;
    error?: string;
}>;
/**
 * Validates the application for production readiness
 */
export declare function validateProductionReadiness(): Promise<{
    ready: boolean;
    issues: string[];
}>;
/**
 * Utility to test Zapier webhooks
 */
export declare function verifyZapierWebhooks(): Promise<Record<string, boolean>>;
