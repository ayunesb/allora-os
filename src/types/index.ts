
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
  profile?: User;
  refreshProfile?: () => Promise<void>;
  refreshSession?: () => Promise<boolean>;
  isEmailVerified?: boolean;
  authError?: Error | string;
  isSessionExpired?: boolean;
  hasInitialized?: boolean;
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
}

export interface AgentRunOptions {
  includeRiskAssessment?: boolean;
  marketConditions?: string;
  [key: string]: any;
}

// Campaign / lead
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
export type WebhookType = 'zapier' | 'custom' | 'slack' | 'github' | 'stripe' | 'notion';

export type BusinessEventType = 
  | 'campaign_created' 
  | 'strategy_approved' 
  | 'lead_converted'
  | 'revenue_milestone'
  | 'user_onboarded'
  | 'campaign_launched'
  | 'lead_added'
  | 'test_event';

export interface BusinessEventPayload {
  eventType: BusinessEventType | string;
  data: Record<string, any>;
}

export interface WebhookResult {
  success: boolean;
  message?: string;
  error?: any;
  statusCode?: number;
  responseData?: any;
}

export interface WebhookEvent {
  id: string;
  webhookType: WebhookType;
  eventType: string;
  targetUrl: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  payload: any;
  response?: any;
  duration?: number;
  errorMessage?: string;
  responseCode?: number;
  source?: string;
}

// Validation and checklist
export interface ValidationResultsUI {
  databaseTables?: Record<string, any>[];
  databaseIndexes?: Record<string, any>[];
  databaseFunctions?: Record<string, any>[];
  rlsPolicies?: Record<string, any>[];
  policies?: Record<string, any>[];
}

export interface ValidationResultItemProps {
  id: string;
  title: string;
  result: { valid: boolean; message: string };
}

export interface ChecklistItem {
  id: string;
  name: string;
  description?: string;
  details?: string;
  status: 'pending' | 'error' | 'completed';
  statusMessage?: string;
  isRequired?: boolean;
}

export interface ChecklistCategory {
  name: string;
  description?: string;
  items: ChecklistItem[];
}

export interface LaunchInfoBoxProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'initial' | 'in-progress' | 'completed' | 'error';
  children?: React.ReactNode;
}

export interface LaunchProgressProps {
  totalItems: number;
  completedItems: number;
  status: string;
  isComplete?: boolean;
  launchStep?: string;
}

// Accessibility
export interface AccessibilityContextType {
  highContrast?: boolean;
  reducedMotion?: boolean;
  fontSize: number;
  textToSpeech?: boolean;
  screenReaderFriendly?: boolean;
  setFontSize: (v: number) => void;
  updatePreference?: (key: string, value: any) => void;
}
