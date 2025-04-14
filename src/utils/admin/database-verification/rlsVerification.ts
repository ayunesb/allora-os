
import { supabase } from '@/integrations/supabase/client';

interface RlsVerificationResult {
  table: string;
  exists: boolean;
  message?: string;
  error?: string;
}

/**
 * Verifies if RLS (Row Level Security) policies are enabled
 * for critical tables in the database
 */
export async function verifyRlsPolicies(): Promise<RlsVerificationResult[]> {
  const criticalTables = [
    'profiles',
    'companies',
    'strategies',
    'leads',
    'campaigns',
    'communications'
  ];
  
  const results: RlsVerificationResult[] = [];
  
  try {
    for (const table of criticalTables) {
      try {
        // Call the database function to check if RLS is enabled
        const { data, error } = await supabase.rpc('check_rls_enabled', {
          table_name: table
        });
        
        if (error) {
          results.push({
            table,
            exists: false,
            message: `RLS check failed for '${table}'`,
            error: error.message
          });
        } else {
          const rlsEnabled = data && data[0]?.rls_enabled === true;
          results.push({
            table,
            exists: rlsEnabled,
            message: rlsEnabled ? `RLS enabled for '${table}'` : `RLS not enabled for '${table}'`
          });
        }
      } catch (err) {
        results.push({
          table,
          exists: false,
          message: `Error checking RLS for '${table}'`,
          error: err instanceof Error ? err.message : 'Unknown error'
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error('Error verifying RLS policies:', error);
    return criticalTables.map(table => ({
      table,
      exists: false,
      message: 'Failed to verify RLS policies',
      error: 'Failed to verify RLS policies'
    }));
  }
}
