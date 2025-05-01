
export interface ValidationResultsUI {
  databaseTables?: any[];
  databaseIndexes?: any[];
  databaseFunctions?: any[];
  rlsPolicies?: any[];
  policies?: any[];
}

export interface DatabaseTableStatus {
  name: string;
  exists: boolean;
  rls: boolean;
  message?: string;
}

export interface EnhancedVerificationState {
  categories: ChecklistCategory[];
  isComplete: boolean;
  progress: number;
}

// Import the ChecklistCategory type
import { ChecklistCategory } from './Checklist';
