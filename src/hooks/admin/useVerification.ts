
import { useState, useCallback } from 'react';
import { useApiClient } from '@/utils/api/enhancedApiClient';
import { toast } from 'sonner';

export interface ValidationItem {
  id: string;
  name: string;
  description: string;
  type: 'table' | 'function' | 'policy' | 'other';
  status: 'ok' | 'warning' | 'error' | 'pending';
  message?: string;
  details?: any;
}

export interface ValidationResults {
  tables?: ValidationItem[];
  databaseFunctions?: ValidationItem[];
  rlsPolicies?: ValidationItem[];
  other?: ValidationItem[];
  success: boolean;
  timestamp: string;
}

export interface VerificationResponse {
  success: boolean;
  results: ValidationResults;
  errors?: string[];
  warnings?: string[];
}

export function useVerification() {
  const [validation, setValidation] = useState<{ results: ValidationResults; loading: boolean }>({
    results: { success: false, timestamp: '' },
    loading: false
  });
  const [error, setError] = useState<string | null>(null);
  const { execute } = useApiClient();

  const runVerification = useCallback(async () => {
    setValidation(prev => ({ ...prev, loading: true }));
    setError(null);
    
    try {
      const response = await execute<VerificationResponse>('/api/admin/verification', 'POST');
      
      if (response.success) {
        setValidation({
          results: response.results,
          loading: false
        });
        
        toast.success('Verification completed');
      } else {
        setError('Verification failed');
        toast.error('Verification failed');
      }
      
      return response;
    } catch (err: any) {
      setError(err.message || 'An error occurred during verification');
      toast.error(err.message || 'Verification failed');
      throw err;
    } finally {
      setValidation(prev => ({ ...prev, loading: false }));
    }
  }, [execute]);

  const getErrorCount = useCallback(() => {
    const { results } = validation;
    let count = 0;
    
    // Safely check if rlsPolicies exists before iterating
    if (results.rlsPolicies) {
      count += results.rlsPolicies.filter(item => item.status === 'error').length;
    }
    
    // Safely check if databaseFunctions exists before iterating
    if (results.databaseFunctions) {
      count += results.databaseFunctions.filter(item => item.status === 'error').length;
    }
    
    if (results.tables) {
      count += results.tables.filter(item => item.status === 'error').length;
    }
    
    if (results.other) {
      count += results.other.filter(item => item.status === 'error').length;
    }
    
    return count;
  }, [validation]);
  
  const getWarningCount = useCallback(() => {
    const { results } = validation;
    let count = 0;
    
    // Safely check if rlsPolicies exists before iterating
    if (results.rlsPolicies) {
      count += results.rlsPolicies.filter(item => item.status === 'warning').length;
    }
    
    // Safely check if databaseFunctions exists before iterating
    if (results.databaseFunctions) {
      count += results.databaseFunctions.filter(item => item.status === 'warning').length;
    }
    
    if (results.tables) {
      count += results.tables.filter(item => item.status === 'warning').length;
    }
    
    if (results.other) {
      count += results.other.filter(item => item.status === 'warning').length;
    }
    
    return count;
  }, [validation]);

  return {
    validation,
    error,
    runVerification,
    getErrorCount,
    getWarningCount
  };
}
