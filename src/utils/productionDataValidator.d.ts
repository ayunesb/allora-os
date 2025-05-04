export interface ValidationResults {
    success: boolean;
    validRecords: number;
    errors: ValidationError[];
    warnings: ValidationWarning[];
    timestamp: string;
    cleanupPerformed: boolean;
    validationDetails: ValidationDetails;
}
interface ValidationDetails {
    companies: {
        total: number;
        valid: number;
        cleaned: number;
    };
    leads: {
        total: number;
        valid: number;
        cleaned: number;
    };
    strategies: {
        total: number;
        valid: number;
        cleaned: number;
    };
    campaigns: {
        total: number;
        valid: number;
        cleaned: number;
    };
}
interface ValidationError {
    table: string;
    message: string;
    recordId?: string;
    severity: 'error';
}
interface ValidationWarning {
    table: string;
    message: string;
    recordId?: string;
    severity: 'warning';
}
/**
 * Validates production data and removes test/demo data if necessary
 * This is used by the admin system to ensure the database is ready for production
 */
export declare function validateAndCleanProductionData(): Promise<ValidationResults>;
export {};
