
import { supabase } from '@/integrations/supabase/client';

interface RlsVerificationResult {
  table: string;
  exists: boolean;
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
            error: error.message
          });
        } else {
          results.push({
            table,
            exists: data && data[0]?.rls_enabled === true
          });
        }
      } catch (err) {
        results.push({
          table,
          exists: false,
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
      error: 'Failed to verify RLS policies'
    }));
  }
}
