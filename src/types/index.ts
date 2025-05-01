
// User
export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'admin' | 'user';
  avatar_url?: string;
  company_id?: string;
  company?: string;
  industry?: string;
  app_metadata?: any;
}

// Auth context
export interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  refreshSession?: () => Promise<void>;
  signOut?: () => Promise<void>;
  profile?: any;
}

// Executive agent
export interface ExecutiveAgentProfile {
  name: string;
  role: string;
  expertise: string[];
  description: string;
  personality: string;
  decisionStyle: string;
}

// Agent config
export interface AgentOptions {
  saveToDatabase?: boolean;
  includeRiskAssessment?: boolean;
  marketConditions?: string;
}

export interface AgentRunOptions {
  includeRiskAssessment?: boolean;
  marketConditions?: string;
}

// Campaign / lead
export interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  platform?: string;
  metrics?: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
  };
  createdAt: string;
}

export interface CampaignPayload {
  campaignId: string;
  campaignTitle: string;
  platform: string;
  owner: string;
  budget: number;
  companyId: string;
}

export interface LeadPayload {
  leadId: string;
  leadName: string;
  company: string;
  email: string;
  source: string;
}

// Webhook logic
export type WebhookType = 'zapier' | 'custom' | 'stripe' | 'github' | 'slack';
export type BusinessEventType = 'new_lead' | 'campaign_created' | 'strategy_approved' | 'test_webhook';

export interface BusinessEventPayload {
  eventType: string;
  data: Record<string, any>;
}

export interface WebhookResult {
  success: boolean;
  message?: string;
  error?: string;
}

export interface WebhookEvent {
  id: string;
  webhook_id: string;
  event_type: string;
  status: 'success' | 'failed' | 'pending';
  created_at: string;
  payload: any;
  response?: any;
}

// Validation and checklist
export interface ValidationResultsUI {
  databaseTables?: any[];
  databaseIndexes?: any[];
  databaseFunctions?: any[];
  policies?: any[];
  rlsPolicies?: any[];
}

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
  id: string;
  name: string;
  description?: string;
  items: ChecklistItem[];
}

export interface EnhancedVerificationState {
  categories: ChecklistCategory[];
  isComplete: boolean;
  progress: number;
}

export interface DatabaseTableStatus {
  name: string;
  exists: boolean;
  rls: boolean;
  message?: string;
}

// Accessibility
export interface AccessibilityContextType {
  fontSize: number;
  setFontSize: (v: number) => void;
  updatePreference?: (key: string, value: any) => void;
}

// Compliance
export interface ComplianceContextType {
  hasUpdates: boolean;
  checkForUpdates: () => void;
  markAsReviewed: () => void;
}
