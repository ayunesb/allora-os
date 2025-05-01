
import { 
  ChecklistItem, 
  ChecklistCategory, 
  DatabaseTableStatus, 
  LaunchProgressProps, 
  LaunchInfoProps,
  ValidationResultsUI,
  ValidationResultItemProps,
  VerificationActionsProps,
  LaunchInfoBoxProps
} from '@/types/fixed/LaunchChecklist';

// Re-export for local use
export type { 
  ChecklistItem, 
  ChecklistCategory, 
  DatabaseTableStatus,
  LaunchProgressProps,
  LaunchInfoProps,
  ValidationResultsUI,
  ValidationResultItemProps,
  VerificationActionsProps,
  LaunchInfoBoxProps
};

export interface EnhancedVerificationState {
  databaseChecked: boolean;
  tablesStatus: Record<string, boolean>;
  functionsStatus: Record<string, boolean>;
  policiesStatus: Record<string, boolean>;
  indexesStatus: Record<string, boolean>;
}
