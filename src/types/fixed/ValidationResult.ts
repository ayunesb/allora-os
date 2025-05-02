
export interface ValidationResult {
  type: string;
  message: string;
  valid: boolean;
  severity?: 'error' | 'warning' | 'info';
  details?: string;
  error?: string;
}

export interface ReadinessResult {
  ready: boolean;
  issues: ValidationResult[];
  passedChecks: ValidationResult[];
}
