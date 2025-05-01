
import { ChecklistItem, ChecklistCategory, DatabaseTableStatus } from '@/types/fixed/LaunchChecklist';

// Re-export for local use
export type { ChecklistItem, ChecklistCategory, DatabaseTableStatus };

export interface LaunchProgressProps {
  percentComplete: number;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
}

export interface EnhancedVerificationState {
  databaseChecked: boolean;
  tablesStatus: Record<string, boolean>;
  functionsStatus: Record<string, boolean>;
  policiesStatus: Record<string, boolean>;
  indexesStatus: Record<string, boolean>;
}

export interface ValidationResultItemProps {
  result: any;
  valid: boolean;
  message: string;
}
