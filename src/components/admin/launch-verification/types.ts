
// Add a new type for database table status with RLS flag
export interface DatabaseTableStatus {
  exists: boolean;
  message: string;
  rls?: boolean;
}

export interface ValidationResultsUI {
  [key: string]: any;
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
  databaseTables?: Record<string, DatabaseTableStatus>;
  databaseIndexes?: Array<{
    name: string;
    status: string;
    message: string;
  }>;
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
}

// Add the missing LaunchButtonProps interface
export interface LaunchButtonProps {
  className?: string;
}

// Enhanced verification types
export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  description?: string;
  category: ChecklistCategory;
  severity: 'critical' | 'high' | 'medium' | 'low';
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

export interface EnhancedVerificationState {
  items: ChecklistItem[];
  progress: {
    [key in ChecklistCategory]: {
      total: number;
      completed: number;
      percentage: number;
    };
  };
  overallProgress: {
    total: number;
    completed: number;
    percentage: number;
  };
  lastUpdated: string;
}
