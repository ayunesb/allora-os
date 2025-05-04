/**
 * Comprehensive production readiness validation
 */
interface ValidationIssue {
    type: 'error' | 'warning';
    message: string;
    details?: any;
}
export interface ProductionReadinessResult {
    ready: boolean;
    issues: ValidationIssue[];
    passedChecks: {
        type: string;
        message: string;
    }[];
}
/**
 * Comprehensive validation of production readiness
 *
 * Validates critical systems to ensure the application is ready for production deployment
 */
export declare const validateProductionReadiness: () => Promise<ProductionReadinessResult>;
export {};
