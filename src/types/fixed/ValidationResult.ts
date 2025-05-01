
export interface ValidationResult {
  type: string;
  message: string;
  valid: boolean;
  severity?: 'error' | 'warning' | 'info';
}

export interface ReadinessResult {
  ready: boolean;
  issues: ValidationResult[];
  passedChecks: ValidationResult[];
}
