/**
 * Validation result interface for system checks and validations
 */
export interface ValidationResult {
    type: string;
    message: string;
    valid: boolean;
    severity?: 'error' | 'warning' | 'info';
    details?: string;
    error?: string;
}
/**
 * Represents the overall system readiness status
 */
export interface ReadinessResult {
    ready: boolean;
    issues: ValidationResult[];
    passedChecks: ValidationResult[];
}
