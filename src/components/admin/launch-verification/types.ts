
export interface DatabaseTableStatus {
  exists: boolean;
  message: string;
}

export interface DatabaseCheckItem {
  name?: string;
  table?: string;
  status: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  message: string;
}

export interface ValidationResultsUI {
  legalAcceptance?: ValidationResult;
  apiConnections?: ValidationResult;
  userAuthentication?: ValidationResult;
  executiveBoardroom?: ValidationResult;
  databaseSecurity?: ValidationResult;
  performanceOptimization?: ValidationResult;
  // Special structured items
  databaseTables?: Record<string, DatabaseTableStatus>;
  databaseIndexes?: DatabaseCheckItem[];
  rlsPolicies?: DatabaseCheckItem[];
  databaseFunctions?: DatabaseCheckItem[];
}

// This is the type that was missing (renamed from TableCheckResult)
export type TableCheckResult = DatabaseTableStatus;
