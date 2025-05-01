
// Re-export all types from individual files
export * from './User';
export * from './Webhook';
export * from './Agent';
export * from './Checklist';
export * from './Validation';

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

// Import required types
import { User } from './User';
