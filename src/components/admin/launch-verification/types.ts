
export type ChecklistItemStatus = 'pending' | 'in-progress' | 'completed' | 'warning' | 'error';

export interface ChecklistItem {
  id: string;
  name: string;
  status: ChecklistItemStatus;
  isRequired: boolean;
  statusMessage?: string;
  details?: string[];
}

export interface ChecklistCategory {
  id: string;
  name: string;
  description: string;
  items: ChecklistItem[];
}

export interface ValidationResultItem {
  id?: string;
  name: string;
  status: 'success' | 'warning' | 'error';
  message?: string;
}

export interface ValidationResultProps {
  id?: string;
  name: string;
  status: 'success' | 'warning' | 'error';
  message?: string;
  icon?: React.ReactNode;
}

export interface DatabaseTableStatus {
  name: string;
  exists: boolean;
  hasRLS: boolean;
  status: 'success' | 'warning' | 'error';
  message?: string;
}

export interface ChecklistProgressProps {
  value: number;
}

export interface SeverityCountsProps {
  completed: number;
  warnings: number;
  errors: number;
}

export interface DatabaseChecksSectionProps {
  title: string;
  items: any[];
}

export interface LaunchInfoBoxProps {
  title: string;
  content: React.ReactNode;
}

export interface LaunchProgressProps {
  value: number;
  label?: string;
}

export interface VerificationActionsProps {
  isChecking: boolean;
  isAddingDemo: boolean;
  isVerifyingTables: boolean;
  isCheckingIndexes: boolean;
  isVerifyingRLS: boolean;
  isVerifyingFunctions: boolean;
  onRerunVerification: () => void;
  onAddDemoData: () => void;
  onVerifyTables: () => void;
  onCheckIndexes: () => void;
  onVerifyRLS: () => void;
  onVerifyFunctions: () => void;
}

export interface ValidationResultsUI {
  authentication?: { valid: boolean; message: string };
  database?: { valid: boolean; message: string };
  storage?: { valid: boolean; message: string };
  apis?: { valid: boolean; message: string };
  databaseTables?: DatabaseTableStatus[];
  overallStatus: 'ready' | 'not-ready' | 'warning';
}
