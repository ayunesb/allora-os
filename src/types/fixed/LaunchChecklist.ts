
import { ReactNode } from 'react';

export interface ChecklistItem {
  id: string;
  name: string;
  description?: string;
  details?: string;
  status: 'pending' | 'error' | 'completed' | 'warning' | 'in-progress';
  statusMessage?: string;
  isRequired?: boolean;
}

export interface ChecklistCategory {
  name: string;
  description?: string;
  items: ChecklistItem[];
}

export interface DatabaseTableStatus {
  name: string;
  exists: boolean;
  columns?: string[];
  missingColumns?: string[];
  valid: boolean;
  message?: string;
}

export interface LaunchProgressProps {
  totalItems: number;
  completedItems: number;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  isComplete?: boolean;
  launchStep?: number;
}

export interface ValidationResultItemProps {
  id: string;
  title: string;
  result: {
    valid: boolean;
    message: string;
  };
}

export interface ValidationResultsUI {
  databaseTables?: Record<string, DatabaseTableStatus>;
  databaseIndexes?: any[];
  databaseFunctions?: any[];
  rlsPolicies?: any[];
  policies?: any[];
  overallStatus?: {
    valid: boolean;
    message: string;
  };
  [key: string]: any;
}

export interface LaunchInfoProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  children?: ReactNode;
}

export interface LaunchInfoBoxProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  children?: ReactNode;
}

export interface VerificationActionsProps {
  isChecking: boolean;
  hasVerifiedTables: boolean;
  hasVerifiedIndexes: boolean;
  hasVerifiedRLS: boolean;
  hasVerifiedFunctions: boolean;
  onRunChecks: () => void;
  onAddDemoData: () => void;
  isAddingDemo: boolean;
  isVerifyingTables: boolean;
  isCheckingIndexes: boolean;
  isVerifyingRLS: boolean;
  isVerifyingFunctions: boolean;
  hasResults: boolean;
}
