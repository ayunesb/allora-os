import { PolicyStatus } from "@/types/databaseVerification";
/**
 * Verifies if RLS (Row Level Security) policies are enabled
 * for critical tables in the database
 */
export declare function verifyRlsPolicies(): Promise<PolicyStatus[]>;
