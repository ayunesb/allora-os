
export interface ValidationResult {
  valid: boolean;
  message: string;
  details?: Record<string, any>;
}

export interface LaunchValidationResults {
  valid: boolean;
  results: Record<string, ValidationResult>;
}
