
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
  readinessStatus: 'pending' | 'ready' | 'not-ready';
  errorCount: number;
  warningCount: number;
}

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
