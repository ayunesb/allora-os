import {
  ChecklistItem,
  ChecklistCategory,
  LaunchInfoProps,
  LaunchProgressProps,
  ValidationResultsUI,
  DatabaseTableStatus,
  EnhancedVerificationState,
} from "@/types/fixed/LaunchChecklist";

// Re-export all types from LaunchChecklist to prevent import errors
export type {
  ChecklistItem,
  ChecklistCategory,
  LaunchInfoProps,
  LaunchProgressProps,
  ValidationResultsUI,
  DatabaseTableStatus,
  EnhancedVerificationState,
};

// Interface for the ValidationResult
export interface ValidationResult {
  valid: boolean;
  message: string;
  details?: any;
}
