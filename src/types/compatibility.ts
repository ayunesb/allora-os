
// This file acts as a compatibility layer to ease migration to fixed types

// Re-export all fixed types
export * from './fixed';

// Export aliases for backward compatibility
import { User as FixedUser } from './fixed/User';
import { Bot as FixedBot } from './fixed/Bot';
import { Message as FixedMessage } from './fixed/Message';
import { WebhookEvent as FixedWebhookEvent, WebhookType as FixedWebhookType } from './fixed/Webhook';
import { AuthContextProps as FixedAuthContextProps } from './fixed/Auth';
import { AccessibilityContextType as FixedAccessibilityContextType } from './fixed/Accessibility';
import { ComplianceContextType as FixedComplianceContextType } from './fixed/Compliance';

// Type aliases for common types with backward compatibility
export type UserRole = 'admin' | 'user';
export type WebhookStatus = 'success' | 'failed' | 'pending';
export type ChecklistItemStatus = 'pending' | 'error' | 'completed' | 'warning' | 'in-progress';

// Compatibility layer for webhook-related types
export interface WebhookEvent extends FixedWebhookEvent {
  eventType: string; // Ensure eventType is always available
  event_type?: string; // For backward compatibility
}

export type WebhookType = FixedWebhookType;

// Re-export User type with compatibility modifications
export interface User extends FixedUser {
  // Ensure these fields are always available
  company_id: string;
  company: string;
  industry: string;
  role: 'admin' | 'user';
  app_metadata: {
    is_admin?: boolean;
    [key: string]: any;
  };
  updated_at: string;
  created_at: string;
  // Compatibility with user_metadata
  user_metadata: {
    firstName: string;
    lastName: string;
    avatar?: string;
    role?: string;
    name?: string;
  };
}

// AuthContextProps with isLoading and loading
export interface AuthContextProps extends FixedAuthContextProps {
  isLoading: boolean;
  loading: boolean;
}

// Extend AccessibilityContextType
export interface AccessibilityContextType extends FixedAccessibilityContextType {
  fontSize: number;
  setFontSize: (v: number) => void;
  checkForUpdates: () => void;
  setAutoUpdate: (value: boolean) => void;
  isCheckingUpdates: boolean;
  lastChecked: string | null;
}

// Extend ComplianceContextType
export interface ComplianceContextType extends FixedComplianceContextType {
  checkForUpdates: () => void;
  setAutoUpdate: (value: boolean) => void;
  isCheckingUpdates: boolean;
  lastChecked: string | null;
}

// ExecutiveMessage compatibility
export interface ExecutiveMessage {
  id: string;
  content: string;
  created_at: string;
  from_executive: boolean;
  [key: string]: any;
}

// Add any additional compatibility exports here
