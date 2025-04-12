
import { toast } from 'sonner';
import { 
  DatabaseTableStatus, 
  PolicyStatus, 
  FunctionStatus 
} from '@/types/databaseVerification';

/**
 * Shows success or error toast messages based on verification results
 * @param tables Results of table verification
 * @param policies Results of RLS policy verification
 * @param functions Results of function verification
 */
export function displayVerificationResults(
  tables: DatabaseTableStatus[],
  policies: PolicyStatus[],
  functions: FunctionStatus[]
): void {
  // Check tables
  const missingTables = tables.filter(t => !t.exists).map(t => t.name);
  if (missingTables.length === 0) {
    toast.success('All required database tables exist');
  } else {
    toast.error(`Missing tables: ${missingTables.join(', ')}`);
  }
  
  // Check RLS policies
  const missingRls = policies.filter(p => !p.exists).map(p => p.table);
  if (missingRls.length === 0 && policies.length > 0) {
    toast.success('RLS policies verified successfully');
  } else if (missingRls.length > 0) {
    toast.error(`RLS issues found on tables: ${missingRls.join(', ')}`);
  }
  
  // Function issues
  const functionIssues = functions.filter(f => !f.exists || !f.isSecure).map(f => f.name);
  if (functionIssues.length === 0 && functions.length > 0) {
    toast.success('Database functions verified successfully');
  } else if (functionIssues.length > 0) {
    toast.error(`Issues with functions: ${functionIssues.join(', ')}`);
  }
}
