import {
  ChecklistItem,
  ChecklistCategory,
  LaunchInfoProps,
  LaunchProgressProps,
  ValidationResultsUI,
  DatabaseTableStatus,
  EnhancedVerificationState,
} from "@/types/fixed/LaunchChecklist";
export type {
  ChecklistItem,
  ChecklistCategory,
  LaunchInfoProps,
  LaunchProgressProps,
  ValidationResultsUI,
  DatabaseTableStatus,
  EnhancedVerificationState,
};
export interface ValidationResult {
  valid: boolean;
  message: string;
  details?: any;
}
