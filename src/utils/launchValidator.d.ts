/**
 * Comprehensive launch validation utility
 */
export interface ValidationResult {
  valid: boolean;
  results: {
    legal: boolean;
    functional: boolean;
    security: boolean;
    performance: boolean;
    ai: boolean;
    integrations: boolean;
    navigation: boolean;
    legalAcceptance?: {
      valid: boolean;
      message: string;
    };
    rlsPolicies?: {
      valid: boolean;
      message: string;
    };
    databaseFunctions?: {
      valid: boolean;
      message: string;
    };
  };
  issues: string[];
}
/**
 * Validates if the application is ready for launch
 */
export declare function validateLaunchReadiness(): Promise<ValidationResult>;
/**
 * Main export for production readiness validation
 */
export declare function validateProductionReadiness(): Promise<{
  ready: boolean;
  issues: {
    type: string;
    message: string;
  }[];
  passedChecks: {
    type: string;
    message: string;
  }[];
}>;
