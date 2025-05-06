import {
  DatabaseTableStatus,
  PolicyStatus,
  FunctionStatus,
} from "@/types/databaseVerification";

export interface DatabaseVerificationResult {
  tables: DatabaseTableStatus[];
  policies: PolicyStatus[];
  functions: FunctionStatus[];
  isVerifying: boolean;
}

// Correctly re-export types using 'export type'
export type { DatabaseTableStatus, PolicyStatus, FunctionStatus };
