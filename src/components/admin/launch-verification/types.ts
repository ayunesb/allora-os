
export interface ValidationResultItem {
  name: string;
  status: 'success' | 'error' | 'warning' | 'info';
  message: string;
  details?: string;
}

export interface ValidationResults {
  tables?: ValidationResultItem[];
  functions?: ValidationResultItem[];
  policies?: ValidationResultItem[];
  indexes?: ValidationResultItem[];
  other?: ValidationResultItem[];
}

export interface VerificationResponse {
  success: boolean;
  results: ValidationResults;
  isReady?: boolean;
  message?: string;
}

export interface DatabaseVerificationProps {
  results: ValidationResults | null;
  isChecking: boolean;
}

export interface LaunchInfoProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  children?: React.ReactNode;
}

export interface LaunchInfoBoxProps extends LaunchInfoProps {}

export interface CampaignPayload {
  campaignId: string;
  campaignTitle: string;
  platform: string;
  budget: number;
  owner: string;
  companyId: string;
}

export interface LeadPayload {
  leadId: string;
  leadName: string;
  company: string;
  email: string;
  source: string;
}

export interface ChecklistItem {
  id: string;
  name: string;
  status: 'pending' | 'completed' | 'error' | 'warning' | 'in-progress';
  description?: string;
  statusMessage?: string;
  details?: string;
  isRequired?: boolean;
}

export interface ChecklistCategory {
  id: string;
  name: string;
  description?: string;
  items: ChecklistItem[];
}

export interface EnhancedVerificationState {
  categories: ChecklistCategory[];
  isReady: boolean;
}

export interface DatabaseTableStatus {
  name: string;
  exists: boolean;
  columns: {
    name: string;
    type: string;
    exists: boolean;
  }[];
  rls?: boolean;
  hasRLS?: boolean;
}

export interface LaunchProgressProps {
  totalItems: number;
  completedItems: number;
  status: 'pending' | 'in-progress' | 'completed' | 'error';
  isComplete?: boolean;
  launchStep?: number;
}

export interface ValidationResultsUI {
  isReady?: boolean;
  databaseTables?: any[];
  databaseIndexes?: any[];
  databaseFunctions?: any[];
  rlsPolicies?: any[];
  policies?: any[];
}
