
import { useState, useCallback } from 'react';
import { useApiClient } from '@/utils/api/enhancedApiClient';
import { toast } from 'sonner';

export interface TableInfo {
  name: string;
  rowCount: number;
  description: string | null;
  status: 'ok' | 'warning' | 'error';
  message?: string;
}

export interface FunctionInfo {
  name: string;
  returnType: string;
  language: string;
  status: 'ok' | 'warning' | 'error';
  message?: string;
}

export interface RlsPolicy {
  table: string;
  name: string;
  definition: string;
  roles: string[];
  status: 'ok' | 'warning' | 'error';
  message?: string;
}

export interface DatabaseVerificationResult {
  tables: TableInfo[];
  functions: FunctionInfo[];
  rlsPolicies: RlsPolicy[];
  lastUpdated: string;
}

export interface DatabaseIssue {
  type: 'table' | 'function' | 'policy';
  name: string;
  message: string;
  severity: 'warning' | 'error';
}

export function useDatabaseVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<DatabaseVerificationResult | null>(null);
  const [issues, setIssues] = useState<DatabaseIssue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { execute } = useApiClient();

  const fetchDatabaseInfo = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await execute<DatabaseVerificationResult>('/api/admin/database-verification', 'GET');
      setResults(data);
      
      // Process issues
      const newIssues: DatabaseIssue[] = [];
      
      // Table issues
      data.tables.forEach(table => {
        if (table.status !== 'ok') {
          newIssues.push({
            type: 'table',
            name: table.name,
            message: table.message || `Issue with table: ${table.name}`,
            severity: table.status === 'error' ? 'error' : 'warning'
          });
        }
      });
      
      // Function issues
      data.functions.forEach(func => {
        if (func.status !== 'ok') {
          newIssues.push({
            type: 'function',
            name: func.name,
            message: func.message || `Issue with function: ${func.name}`,
            severity: func.status === 'error' ? 'error' : 'warning'
          });
        }
      });
      
      // RLS policy issues
      data.rlsPolicies.forEach(policy => {
        if (policy.status !== 'ok') {
          newIssues.push({
            type: 'policy',
            name: `${policy.table}.${policy.name}`,
            message: policy.message || `Issue with RLS policy: ${policy.name}`,
            severity: policy.status === 'error' ? 'error' : 'warning'
          });
        }
      });
      
      setIssues(newIssues);
      
      return data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch database information';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [execute]);

  const repairAutomatically = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await execute<{ success: boolean; message: string; repaired: string[] }>('/api/admin/database-repair', 'POST');
      
      if (result.success) {
        toast.success(result.message || 'Database repaired successfully');
        // Refresh verification data
        await fetchDatabaseInfo();
      } else {
        toast.error(result.message || 'Failed to repair database');
      }
      
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to repair database';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [execute, fetchDatabaseInfo]);

  return {
    isLoading,
    results,
    issues,
    error,
    fetchDatabaseInfo,
    repairAutomatically
  };
}
