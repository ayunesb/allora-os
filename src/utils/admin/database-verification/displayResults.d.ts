import {
  DatabaseTableStatus,
  PolicyStatus,
  FunctionStatus,
} from "@/types/databaseVerification";
/**
 * Displays user-friendly messages for the verification results
 * and provides detailed diagnostics information
 */
export declare function displayVerificationResults(
  tables: DatabaseTableStatus[],
  policies: PolicyStatus[],
  functions: FunctionStatus[],
): void;
/**
 * Performs a deep diagnostic scan of the application
 */
export declare function performDeepScan(): Promise<boolean>;
