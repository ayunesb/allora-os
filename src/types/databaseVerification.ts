
export interface DatabaseTableStatus {
  name: string;
  exists: boolean;
  hasRLS: boolean;
  status: 'success' | 'warning' | 'error';
  message?: string;
}

export interface PolicyStatus {
  table: string;
  name: string;
  exists: boolean;
  isSecure: boolean;
  status: 'success' | 'warning' | 'error';
  message?: string;
}

export interface FunctionStatus {
  name: string;
  exists: boolean;
  isSecure: boolean;
  status: 'success' | 'warning' | 'error';
  message?: string;
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
