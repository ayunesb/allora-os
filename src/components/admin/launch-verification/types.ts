
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
}

export interface VerificationActionsProps {
  onRefresh: () => void;
  onLaunch: () => void;
  isLoading: boolean;
  canLaunch: boolean;
}

export type {
  ChecklistItem,
  ChecklistCategory,
  ValidationResultsUI,
  EnhancedVerificationState,
  DatabaseTableStatus
};
