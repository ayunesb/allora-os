
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

export interface ValidationResultsUI {
  legalAcceptance?: {
    valid: boolean;
    message: string;
  };
  apiConnections?: {
    valid: boolean;
    message: string;
  };
  userAuthentication?: {
    valid: boolean;
    message: string;
  };
  executiveBoardroom?: {
    valid: boolean;
    message: string;
  };
  databaseSecurity?: {
    valid: boolean;
    message: string;
  };
  performanceOptimization?: {
    valid: boolean;
    message: string;
  };
  // Special structured items
  databaseTables?: Record<string, DatabaseTableStatus>;
  databaseIndexes?: DatabaseCheckItem[];
  rlsPolicies?: DatabaseCheckItem[];
  databaseFunctions?: DatabaseCheckItem[];
}
