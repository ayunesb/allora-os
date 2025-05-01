
export interface ChecklistItem {
  id: string;
  name: string;
  description?: string;
  status: 'pending' | 'error' | 'completed' | 'warning' | 'in-progress';
  details?: string;
  statusMessage?: string;
  isRequired?: boolean;
}

export interface ChecklistCategory {
  id: string;
  name: string;
  description?: string;
  items: ChecklistItem[];
}

export interface LaunchInfoProps {
  title: string;
  description: string;
  status?: 'info' | 'success' | 'warning' | 'error';
  children?: React.ReactNode;
}

export interface DatabaseTableStatus {
  name: string;
  exists: boolean;
  columns?: string[];
  permissions?: {
    select: boolean;
    insert: boolean;
    update: boolean;
    delete: boolean;
  };
  rls?: boolean;
}

export interface VerificationActionsProps {
  isChecking: boolean;
  isAddingDemo: boolean;
  isVerifyingTables: boolean;
  isCheckingIndexes: boolean;
  isVerifyingRLS: boolean;
  isVerifyingFunctions: boolean;
  onRunChecks: () => Promise<void>;
  onAddDemoData: () => Promise<void>;
  onFixPermissions?: () => Promise<void>;
  onGenerateSQL?: () => Promise<void>;
  onCreateMissingTables?: () => Promise<void>;
  hasResults: boolean;
}

export interface LaunchProgressProps {
  percentComplete: number;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  totalItems?: number;
  completedItems?: number;
  isComplete?: boolean;
  launchStep?: number;
}

export interface ValidationResultsUI {
  databaseTables?: any[];
  databaseIndexes?: any[];
  databaseFunctions?: any[];
  rlsPolicies?: any[];
  policies?: any[];
}

export interface ValidationResultItemProps {
  result: any;
  valid: boolean;
  message: string;
}

export interface LaunchInfoBoxProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  children?: React.ReactNode;
}
