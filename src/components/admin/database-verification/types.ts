
import { DatabaseTableStatus, PolicyStatus, FunctionStatus } from '@/types/databaseVerification';

export interface DatabaseVerificationResult {
  tables: DatabaseTableStatus[];
  policies: PolicyStatus[];
  functions: FunctionStatus[];
  isVerifying: boolean;
}
