import { useState, useEffect, useCallback } from 'react';
import { useAuth } from "@/context/AuthContext";
import { useCompanyId } from "./useCompanyId";
import { validateAndCleanProductionData, ValidationResults } from '@/utils/productionDataValidator';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to ensure the application is using real production data
 * and provides validation and cleanup functionality
 */
export function useProductionData() {
  const [isValidating, setIsValidating] = useState(false);
  const [validationResults, setValidationResults] = useState<ValidationResults | null>(null);
  const [isProductionReady, setIsProductionReady] = useState(false);
  const [isProductionMode, setIsProductionMode] = useState(false);
  const { user, profile } = useAuth();
  const companyId = useCompanyId();
  
  // Check if in production mode based on URL or environment or localStorage override
  useEffect(() => {
    const forceProdMode = localStorage.getItem('allora_force_production_mode') === 'true';
    const productionMode = 
      forceProdMode ||
      window.location.hostname === 'all-or-a.online' || 
      process.env.NODE_ENV === 'production';
    
    setIsProductionMode(productionMode);
  }, []);
  
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
      // First check if there's any real company data
      let hasRealData = false;
      
      if (profile?.company_id) {
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('name, id')
          .eq('id', profile.company_id)
          .single();
          
        if (!companyError && companyData) {
          // Check if there's at least one strategy for this company
          const { count, error: strategyError } = await supabase
            .from('strategies')
            .select('*', { count: 'exact', head: true })
            .eq('company_id', profile.company_id);
            
          hasRealData = !strategyError && count && count > 0;
          
          // If there's company data but no strategies, we're halfway there
          if (!hasRealData && companyData.name) {
            setIsProductionReady(true);
          }
        }
      }
      
      // Manual override for development/demo
      const forceProduction = localStorage.getItem('allora_force_production_mode') === 'true';
      if (forceProduction) {
        setIsProductionReady(true);
        setIsProductionMode(true);
        return;
      }
      
      // Skip full validation if we already know we have real data
      if (hasRealData) {
        setIsProductionReady(true);
        return;
      }
      
      // Otherwise run full validation
      const results = await validateAndCleanProductionData();
      setValidationResults(results);
      setIsProductionReady(results.success);
      
      // Provide feedback based on validation results
      if (results.success) {
        // In production mode, notify if cleanup was performed
        if (isProductionMode && results.cleanupPerformed) {
          const totalRemoved = 
            results.validationDetails.companies.cleaned + 
            results.validationDetails.leads.cleaned + 
            results.validationDetails.strategies.cleaned +
            results.validationDetails.campaigns.cleaned;
            
          if (totalRemoved > 0) {
            toast.info(`Production data cleansed: ${totalRemoved} test items removed`, {
              description: "Check the validation report for details"
            });
          }
        } else if (results.warnings.length > 0) {
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
        
        // Log the first few errors for debugging
        if (results.errors.length > 0) {
          console.error("Validation errors:", results.errors.slice(0, 3));
        }
      }
    } catch (error: any) {
      console.error("Error validating production data:", error);
      toast.error("Error validating production data");
      setIsProductionReady(false);
    } finally {
      setIsValidating(false);
    }
  }, [isProductionMode, profile?.company_id]);
  
  // Function to force production mode (for testing and demos)
  const forceProductionMode = useCallback((force: boolean) => {
    if (force) {
      localStorage.setItem('allora_force_production_mode', 'true');
      setIsProductionMode(true);
      setIsProductionReady(true);
      toast.success("Production mode activated");
    } else {
      localStorage.removeItem('allora_force_production_mode');
      setIsProductionMode(false);
      validateProductionData();
      toast.info("Reverted to automatic mode detection");
    }
  }, [validateProductionData]);
  
  // Return the hook API
  return {
    isValidating,
    validationResults,
    isProductionReady,
    isProductionMode,
    validateProductionData,
    forceProductionMode
  };
}
