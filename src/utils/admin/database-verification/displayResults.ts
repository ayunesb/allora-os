
import { toast } from 'sonner';
import { DatabaseTableStatus, PolicyStatus, FunctionStatus } from '@/types/databaseVerification';

/**
 * Displays user-friendly messages for the verification results
 */
export function displayVerificationResults(
  tables: DatabaseTableStatus[],
  policies: PolicyStatus[],
  functions: FunctionStatus[]
) {
  // Check for empty results (indicates possible connection issues)
  if (tables.length === 0 && policies.length === 0 && functions.length === 0) {
    toast.error('No verification data returned', {
      description: 'Check your Supabase connection and permissions'
    });
    return;
  }
  
  // Handle verification process errors (usually first item)
  const processErrorTable = tables.find(t => t.name === 'verification_process' && !t.exists);
  const processErrorPolicy = policies.find(p => p.table === 'verification_process' && !p.exists);
  const processErrorFunction = functions.find(f => f.name === 'verification_process' && !f.exists);
  
  if (processErrorTable || processErrorPolicy || processErrorFunction) {
    const errorMessage = processErrorTable?.message || 
                         processErrorPolicy?.message || 
                         processErrorFunction?.message ||
                         'Verification process error';
    toast.error('Verification failed', {
      description: errorMessage
    });
    return;
  }
  
  // Check for database connection errors
  const connectionError = tables.find(t => t.name === 'database_connection' && !t.exists);
  if (connectionError) {
    toast.error('Database connection error', {
      description: connectionError.message
    });
    return;
  }
  
  // Calculate and display status of the tables
  const missingTables = tables.filter(t => !t.exists);
  if (missingTables.length > 0) {
    if (missingTables.length === tables.length) {
      toast.error('All required tables are missing', {
        description: 'You need to run the database setup script'
      });
    } else {
      toast.warning(`${missingTables.length} of ${tables.length} tables are missing`, {
        description: 'Some tables need to be created'
      });
    }
  } else if (tables.length > 0) {
    toast.success('All required tables exist', {
      description: `Verified ${tables.length} tables successfully`
    });
  }
  
  // Calculate and display status of RLS policies
  const missingPolicies = policies.filter(p => !p.exists);
  if (missingPolicies.length > 0) {
    if (missingPolicies.length === policies.length) {
      toast.error('RLS policies are disabled for all tables', {
        description: 'Security risk: Enable RLS for your tables'
      });
    } else {
      toast.warning(`RLS is disabled for ${missingPolicies.length} tables`, {
        description: 'Some tables have security risks'
      });
    }
  } else if (policies.length > 0) {
    toast.success('RLS is enabled for all tables', {
      description: `Verified ${policies.length} table policies`
    });
  }
  
  // Calculate and display status of database functions
  const missingFunctions = functions.filter(f => !f.exists);
  const insecureFunctions = functions.filter(f => f.exists && !f.isSecure);
  
  if (missingFunctions.length > 0) {
    if (missingFunctions.length === functions.length) {
      toast.error('All required functions are missing', {
        description: 'You need to run the database setup script'
      });
    } else {
      toast.warning(`${missingFunctions.length} of ${functions.length} functions are missing`, {
        description: 'Some functions need to be created'
      });
    }
  } else if (insecureFunctions.length > 0) {
    toast.warning(`${insecureFunctions.length} functions are not using SECURITY DEFINER`, {
      description: 'Security risk: Functions should use SECURITY DEFINER'
    });
  } else if (functions.length > 0) {
    toast.success('All required functions exist and are secure', {
      description: `Verified ${functions.length} functions successfully`
    });
  }
}
