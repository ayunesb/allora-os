
export interface DatabaseTableStatus {
  exists: boolean;
  message?: string;
  rls?: boolean;
}

export interface PolicyStatus {
  table: string;
  exists: boolean;
  message?: string;
}

export interface FunctionStatus {
  name: string;
  exists: boolean;
  isSecure: boolean;
  message?: string;
}

export interface ValidationResultsUI {
  databaseTables?: Record<string, DatabaseTableStatus>;
  authentication?: {
    valid: boolean;
    message: string;
  };
  executive?: {
    valid: boolean;
    message: string;
  };
  databaseIndexes?: Array<{
    name?: string;
    table?: string;
    status: string;
    message: string;
  }>;
  rlsPolicies?: Array<{
    table?: string;
    status: string;
    message: string;
  }>;
  databaseFunctions?: Array<{
    name?: string;
    status: string;
    message: string;
  }>;
  [key: string]: any;
}
