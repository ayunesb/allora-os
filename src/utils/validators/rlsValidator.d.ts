import { ValidationResult } from "./types";
/**
 * Validates that Row Level Security (RLS) is properly configured
 * and initialized on all critical tables
 */
export declare function validateRLSPolicies(): Promise<ValidationResult>;
