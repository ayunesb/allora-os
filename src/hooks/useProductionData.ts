
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from "@/context/AuthContext";
import { useCompanyId } from "./useCompanyId";
import { validateAndCleanProductionData, ValidationResults } from '@/utils/productionDataValidator';
import { toast } from 'sonner';

/**
 * Hook to ensure the application is using real production data
 * and provides validation and cleanup functionality
 */
export function useProductionData() {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResults, setValidationResults] = useState<ValidationResults | null>(null);
  const [isProductionReady, setIsProductionReady] = useState(false);
  const { user, profile } = useAuth();
  const companyId = useCompanyId();
  
  // Run validation on initial load
  useEffect(() => {
    // Only run validation if we have a user and company ID
    if (user && companyId) {
      validateProductionData();
    }
  }, [user, companyId]);
  
  // Function to validate production data
  const validateProductionData = useCallback(async () => {
    setIsValidating(true);
    
    try {
      const results = await validateAndCleanProductionData();
      setValidationResults(results);
      setIsProductionReady(results.success);
      
      // Provide feedback based on validation results
      if (results.success) {
        if (results.warnings.length > 0) {
          toast.info(`Validation completed with ${results.warnings.length} warnings`, {
            description: "Check the validation report for details"
          });
        } else {
          toast.success("All data validated successfully", {
            description: `Found ${results.validRecords} valid records`
          });
        }
      } else {
        toast.error("Validation failed", {
          description: `Found ${results.errors.length} critical errors`
        });
      }
    } catch (error) {
      console.error("Error validating production data:", error);
      toast.error("Error validating production data");
    } finally {
      setIsValidating(false);
    }
  }, []);
  
  // Return the hook API
  return {
    isValidating,
    validationResults,
    isProductionReady,
    validateProductionData
  };
}
