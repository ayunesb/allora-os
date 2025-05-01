
import { ChecklistItem, ChecklistCategory, ValidationResultsUI, EnhancedVerificationState, DatabaseTableStatus } from '@/types';

export interface ValidationResultItemProps {
  id: string;
  title: string;
  result: {
    valid: boolean;
    message: string;
    details?: Record<string, any>;
  };
}

export interface LaunchInfoProps {
  title: string;
  description: string;
  status?: 'success' | 'warning' | 'error' | 'info';
  children?: React.ReactNode;
}

export interface LaunchProgressProps {
  progress: number;
  isComplete: boolean;
  launchStep: string;
  totalItems?: number;
  completedItems?: number;
  status?: string;
}

export interface VerificationActionsProps {
  onRefresh: () => void;
  onLaunch: () => void;
  isLoading: boolean;
  canLaunch: boolean;
  isChecking?: boolean;
  isAddingDemo?: boolean;
  isVerifyingTables?: boolean;
  isCheckingIndexes?: boolean;
  isVerifyingRLS?: boolean;
  isVerifyingFunctions?: boolean;
  onRunChecks?: () => Promise<void>;
  onAddDemoData?: () => Promise<void>;
  onVerifyTables?: () => Promise<void>;
  onCheckIndexes?: () => Promise<void>;
  onVerifyRLS?: () => Promise<void>;
  onVerifyFunctions?: () => Promise<void>;
  hasResults?: boolean;
}

export type {
  ChecklistItem,
  ChecklistCategory,
  ValidationResultsUI,
  EnhancedVerificationState,
  DatabaseTableStatus
};
