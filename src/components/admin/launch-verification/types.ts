
// Add a new type for database table status with RLS flag
export interface DatabaseTableStatus {
  exists: boolean;
  message: string;
  rls?: boolean;
}

export interface ValidationResultsUI {
  [key: string]: any;
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
  databaseTables?: Record<string, DatabaseTableStatus>;
  databaseIndexes?: Array<{
    name: string;
    status: string;
    message: string;
  }>;
  rlsPolicies?: Array<{
    table: string;
    status: string;
    message: string;
  }>;
  databaseFunctions?: Array<{
    name: string;
    status: string;
    message: string;
  }>;
}

// Add the missing LaunchButtonProps interface
export interface LaunchButtonProps {
  className?: string;
}
