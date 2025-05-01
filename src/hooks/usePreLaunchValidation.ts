
import { useState } from 'react';
import { validateProductionReadiness } from '@/utils/productionReadiness';

export function usePreLaunchValidation() {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const runValidation = async () => {
    setIsValidating(true);
    setError(null);
    
    try {
      const result = await validateProductionReadiness();
      setValidationResult(result);
    } catch (error) {
      console.error("Validation error:", error);
      setError("An error occurred while validating the application: " + 
        (error instanceof Error ? error.message : "Unknown error"));
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
