
// Define base validation result interface
export interface ValidationResult {
  valid: boolean;
  message: string;
}

// Define the overall launch validation results interface
export interface LaunchValidationResults {
  valid: boolean;
  results: {
    legalAcceptance: ValidationResult;
    apiConnections: ValidationResult;
    userAuthentication: ValidationResult;
    executiveBoardroom: ValidationResult;
    databaseSecurity: ValidationResult;
    performanceOptimization: ValidationResult;
    rlsPolicies: ValidationResult;
    databaseFunctions: ValidationResult;
    [key: string]: ValidationResult;
  };
}

// Define API connection validation interfaces
export interface ApiConnectionStatus {
  name: string;
  connected: boolean;
  error?: string;
  requiredForLaunch: boolean;
}

// Define table validation interfaces
export interface TableValidationResult {
  name: string;
  exists: boolean;
  requiredColumns: {
    [column: string]: boolean;
  };
  message?: string;
}

// Define RLS policy validation interfaces
export interface RlsPolicyValidationResult {
  table: string;
  hasRls: boolean;
  policies: {
    [policyName: string]: boolean;
  };
  message?: string;
}

// Define database function validation interfaces
export interface DbFunctionValidationResult {
  name: string;
  exists: boolean;
  isSecure: boolean;
  message?: string;
}

// Define performance validation interfaces
export interface PerformanceValidationResult {
  indexes: {
    [indexName: string]: boolean;
  };
  message?: string;
}
