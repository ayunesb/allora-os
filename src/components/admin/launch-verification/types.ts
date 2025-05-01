
export interface ChecklistItem {
  id: string;
  name: string;
  status: 'completed' | 'warning' | 'in-progress' | 'pending' | 'error';
  isRequired: boolean;
  statusMessage?: string;
  description?: string;
  details?: string;
}

export interface ChecklistCategory {
  id: string;
  name: string;
  description: string;
  items: ChecklistItem[];
}

export interface VerificationResult {
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: any;
}

export interface DatabaseTableStatus {
  name: string;
  exists: boolean;
  hasRLS: boolean;
  status: 'success' | 'warning' | 'error';
  message?: string;
}

export interface ValidationResultsUI {
  [key: string]: any;
  databaseTables?: DatabaseTableStatus[];
  databaseIndexes?: any[];
  rlsPolicies?: any[];
  databaseFunctions?: any[];
  overallStatus?: string;
}
