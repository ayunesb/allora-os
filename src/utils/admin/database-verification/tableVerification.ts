
import { supabase } from '@/integrations/supabase/client';

interface TableVerificationResult {
  name: string;
  exists: boolean;
  error?: string;
}

/**
 * Verifies if required tables exist in the database
 */
export async function verifyDatabaseTables(): Promise<TableVerificationResult[]> {
  const requiredTables = [
    'profiles',
    'companies',
    'strategies',
    'leads',
    'campaigns',
    'communications',
    'tasks',
    'audit_logs'
  ];
  
  const results: TableVerificationResult[] = [];
  
  try {
    // Get the list of tables from the database
    const { data, error } = await supabase
      .from('pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');
    
    if (error) {
      console.error('Error fetching tables:', error);
      return requiredTables.map(table => ({
        name: table,
        exists: false,
        error: 'Failed to fetch tables from database'
      }));
    }
    
    const tableNames = data.map(t => t.tablename);
    
    // Check each required table
    for (const table of requiredTables) {
      results.push({
        name: table,
        exists: tableNames.includes(table)
      });
    }
    
    return results;
  } catch (error) {
    console.error('Error verifying database tables:', error);
    return requiredTables.map(table => ({
      name: table,
      exists: false,
      error: 'Failed to verify database tables'
    }));
  }
}
