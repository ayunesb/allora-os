
export interface LaunchChecklistItem {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'completed' | 'error' | 'warning' | 'in-progress';
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  message?: string;
  details?: string;
  fix?: string;
  checkFn?: () => Promise<boolean>;
  fixFn?: () => Promise<boolean>;
  verifyFn?: () => Promise<boolean>;
  fixUrl?: string;
  docsUrl?: string;
}

export interface LaunchCategory {
  id: string;
  name: string;
  description?: string;
  items: LaunchChecklistItem[];
  completedCount: number;
  totalCount: number;
  progress: number;
}

export interface LaunchProcessHook {
  categories: LaunchCategory[];
  isLoading: boolean;
  error: string | null;
  runChecks: () => Promise<void>;
  fixItem: (itemId: string) => Promise<void>;
  verifyFix: (itemId: string) => Promise<void>;
  isLaunchable: boolean;
  launch: () => Promise<void>;
  isLaunching: boolean;
  launchStatus: string | null;
  runSingleCheck: (itemId: string) => Promise<void>;
  resetChecks: () => void;
}

export interface ValidationSeverityCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
  total: number;
}

export interface ValidationResult {
  id: string;
  name: string;
  status: 'pending' | 'completed' | 'error' | 'warning';
  message: string;
  details?: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  timestamp: string;
  checkDuration?: number;
  fix?: string;
  fixUrl?: string;
}

export interface LaunchCheckResults {
  results: ValidationResult[];
  severityCounts: ValidationSeverityCounts;
  timestamp: string;
  duration: number;
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  warningChecks: number;
}

export interface VerificationActionsProps {
  item: LaunchChecklistItem;
  onRunCheck: () => Promise<void>;
  onFixItem: () => Promise<void>;
  onVerifyFix: () => Promise<void>;
}
