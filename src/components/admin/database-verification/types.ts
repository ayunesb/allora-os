
import { DatabaseTableStatus, PolicyStatus, FunctionStatus } from '@/types/databaseVerification';

export interface DatabaseVerificationResult {
  tables: DatabaseTableStatus[];
  policies: PolicyStatus[];
  functions: FunctionStatus[];
  isVerifying: boolean;
}

// Export types from the imported module for components to use
export { DatabaseTableStatus, PolicyStatus, FunctionStatus };
