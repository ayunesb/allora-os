import { ReadinessResult } from '@/types/fixed/ValidationResult';
export declare const usePreLaunchValidation: () => {
    isValidating: boolean;
    validationResult: ReadinessResult;
    error: string;
    runValidation: () => Promise<void>;
};
