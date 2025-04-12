
/**
 * Common validation result type
 * Used across all validators to ensure consistent return format
 * 
 * @property valid - Whether the validation passed
 * @property message - Information about the validation result
 * @property details - Optional additional details about validation
 */
export interface ValidationResult {
  valid: boolean;
  message: string;
  details?: Record<string, any>;
}

/**
 * Input validation options
 * Configuration options for validation functions
 */
export interface ValidationOptions {
  /**
   * Whether to perform strict validation
   * Strict validation applies additional security checks
   */
  strict?: boolean;
  
  /**
   * Custom error message for failed validation
   */
  errorMessage?: string;
  
  /**
   * Context information for validation
   * Can contain additional data needed for validation
   */
  context?: Record<string, any>;
}

/**
 * Validation function signature
 * Standard interface for validation functions
 * 
 * @param input - The value to validate
 * @param options - Optional validation configuration
 * @returns Validation result
 */
export type ValidatorFn<T = any> = (
  input: T, 
  options?: ValidationOptions
) => Promise<ValidationResult> | ValidationResult;

