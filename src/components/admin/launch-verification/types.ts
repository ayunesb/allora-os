
export interface LaunchButtonProps {
  className?: string;
}

export interface LaunchProgressProps {
  isComplete: boolean;
  launchStep: string | null;
}

export interface LaunchInfoBoxProps {
  className?: string;
}

export type ChecklistCategory = 
  | 'platform_stability' 
  | 'user_onboarding' 
  | 'ai_bot_logic' 
  | 'dashboard_modules' 
  | 'communication_tools' 
  | 'payment_system' 
  | 'admin_controls' 
  | 'api_integrations' 
  | 'legal_compliance' 
  | 'cross_device_testing';

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  category: ChecklistCategory;
  severity: 'critical' | 'high' | 'medium' | 'low';
  description?: string;
}

export interface EnhancedVerificationState {
  progress: Record<ChecklistCategory, {
    total: number;
    completed: number;
    percentage: number;
  }>;
  overallProgress: {
    total: number;
    completed: number;
    percentage: number;
  };
}

export interface ValidationResultsUI {
  legalAcceptance?: {
    valid: boolean;
    message: string;
  };
  apiConnections?: {
    valid: boolean;
    message: string;
  };
  userAuthentication?: {
    valid: boolean;
    message: string;
  };
  executiveBoardroom?: {
    valid: boolean;
    message: string;
  };
  databaseSecurity?: {
    valid: boolean;
    message: string;
  };
  performanceOptimization?: {
    valid: boolean;
    message: string;
  };
  rlsPolicies?: Array<{
    table: string;
    status: string;
    message: string;
  }>;
  databaseFunctions?: Array<{
    name: string;
    status: string;
    message: string;
  }>;
  databaseTables?: Record<string, DatabaseTableStatus>;
  databaseIndexes?: Array<{
    name: string;
    status: string;
    message: string;
  }>;
}

export interface DatabaseTableStatus {
  exists: boolean;
  message: string;
  rls: boolean;
}

export interface PolicyStatus {
  table: string;
  exists: boolean;
  message: string;
}

export interface FunctionStatus {
  name: string;
  exists: boolean;
  isSecure: boolean;
  message: string;
}
