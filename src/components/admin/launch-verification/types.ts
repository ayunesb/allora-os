
export interface LaunchButtonProps {
  className?: string;
}

export interface LaunchStepState {
  isLaunching: boolean;
  launchStep: string | null;
  isComplete: boolean;
}

export interface DatabaseTableStatus {
  exists: boolean;
  message?: string;
  rls: boolean;
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
  databaseTables?: Record<string, DatabaseTableStatus>;
  databaseIndexes?: Array<{
    name?: string;
    status: string;
    message: string;
  }>;
  [key: string]: ValidationResult | Record<string, DatabaseTableStatus> | Array<any> | undefined;
}
