
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
  onFixPermissions: () => Promise<void>;
  onGenerateSQL: () => Promise<void>;
  onCreateMissingTables: () => Promise<void>;
  hasResults: boolean;
}
