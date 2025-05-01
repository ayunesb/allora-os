
import { useState } from 'react';
import { validateProductionReadiness } from '@/utils/launchValidator';

type ValidationResult = {
  valid: boolean;
  message: string;
  details?: Record<string, any>;
};

type ReadinessResult = {
  ready: boolean;
  issues: ValidationResult[];
  passedChecks: ValidationResult[];
};

export function usePreLaunchValidation() {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<ReadinessResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const runValidation = async () => {
    setIsValidating(true);
    setError(null);
    
    try {
      const result = await validateProductionReadiness();
      setValidationResult(result);
      return result;
    } catch (err: any) {
      console.error("Validation error:", err);
      setError(err.message || "Failed to complete validation");
      return null;
    } finally {
      setIsValidating(false);
    }
  };
  
  return {
    isValidating,
    validationResult,
    error,
    runValidation
  };
}
