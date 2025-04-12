
/**
 * Types for database verification functionality
 */

/**
 * Status of a database table verification
 */
export interface DatabaseTableStatus {
  name: string;
  exists: boolean;
  message: string;
}

/**
 * Status of a row-level security policy verification
 */
export interface PolicyStatus {
  table: string;
  exists: boolean;
  message: string;
}

/**
 * Status of a database function verification
 */
export interface FunctionStatus {
  name: string;
  exists: boolean;
  isSecure: boolean;
  message: string;
}

/**
 * Combined results from all database verification checks
 */
export interface DatabaseVerificationResult {
  tables: DatabaseTableStatus[];
  policies: PolicyStatus[];
  functions: FunctionStatus[];
  isVerifying: boolean;
}

/**
 * Response from the check_function_exists RPC call
 */
export interface FunctionCheckResponse {
  function_exists: boolean;
  is_secure: boolean;
}
