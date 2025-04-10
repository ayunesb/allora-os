
/**
 * Result from a validation check
 */
export interface ValidationResult {
  valid: boolean;
  message: string;
}

/**
 * Complete result from all validations
 */
export interface LaunchValidationResults {
  valid: boolean;
  results: Record<string, ValidationResult>;
}
