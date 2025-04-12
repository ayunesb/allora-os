
import { toast } from 'sonner';
import { DatabaseTableStatus, PolicyStatus, FunctionStatus } from '@/types/databaseVerification';

/**
 * Display user-friendly notifications about database verification results
 * @param tables Results of table verification
 * @param policies Results of RLS policy verification
 * @param functions Results of function verification
 */
export function displayVerificationResults(
  tables: DatabaseTableStatus[],
  policies: PolicyStatus[],
  functions: FunctionStatus[]
) {
  // Log all results to help with debugging
  console.log('Database verification results:', { tables, policies, functions });

  // First check if any data was returned at all
  if (tables.length === 0 && policies.length === 0 && functions.length === 0) {
    toast.error("Database verification failed - No data returned", {
      description: "Check Supabase connection and permissions"
    });
    return;
  }

  // Tables verification results
  const missingTables = tables.filter(t => !t.exists);
  if (missingTables.length === 0) {
    toast.success("Tables verification passed", {
      description: `All ${tables.length} required tables exist`
    });
  } else {
    const tableCount = missingTables.length;
    const tableNames = missingTables.map(t => t.name).join(", ");
    toast.error(`Missing ${tableCount} database ${tableCount === 1 ? 'table' : 'tables'}`, {
      description: `Missing: ${tableNames}`
    });
  }

  // RLS policies verification results
  const missingPolicies = policies.filter(p => !p.exists);
  if (missingPolicies.length === 0 && policies.length > 0) {
    toast.success("RLS policies verification passed", {
      description: `All ${policies.length} required tables have RLS policies`
    });
  } else if (policies.length > 0) {
    const policyCount = missingPolicies.length;
    const tableNames = missingPolicies.map(p => p.table).join(", ");
    toast.error(`Missing RLS policies for ${policyCount} ${policyCount === 1 ? 'table' : 'tables'}`, {
      description: `Tables without RLS: ${tableNames}`
    });
  }

  // Database functions verification results
  const functionIssues = functions.filter(f => !f.exists || !f.isSecure);
  if (functionIssues.length === 0 && functions.length > 0) {
    toast.success("Database functions verification passed", {
      description: `All ${functions.length} required functions exist and are secure`
    });
  } else if (functions.length > 0) {
    const functionCount = functionIssues.length;
    const functionNames = functionIssues.map(f => f.name).join(", ");
    toast.error(`Issues with ${functionCount} database ${functionCount === 1 ? 'function' : 'functions'}`, {
      description: `Functions with issues: ${functionNames}`
    });
  }
}
