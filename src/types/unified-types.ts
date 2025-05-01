

// This file unifies and re-exports all fixed types to ensure consistency
import { User } from './fixed/User';
import { WebhookType, WebhookEvent, BusinessEventType, BusinessEventPayload, WebhookResult } from './fixed/Webhook';
import { SocialPlatform, ContentType, PostStatus, SocialMediaPost, SocialMediaCalendarFilters } from './fixed/SocialMedia';

// Re-export all types for consistent usage across the application
export type {
  User,
  WebhookType,
  WebhookEvent as UnifiedWebhookEvent,
  BusinessEventType,
  BusinessEventPayload,
  WebhookResult,
  SocialPlatform,
  ContentType,
  PostStatus,
  SocialMediaPost,
  SocialMediaCalendarFilters
};

// Backward compatibility type aliases
export type UserRole = 'admin' | 'user';
export type WebhookStatus = 'success' | 'failed' | 'pending';
export type ChecklistItemStatus = 'pending' | 'error' | 'completed' | 'warning' | 'in-progress';

// Extended types for contexts
export interface ExtendedAccessibilityContextType {
  screenReaderFriendly: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  invertColors: boolean;
  fontSize: number;
  setFontSize: (size: number) => void;
  toggleScreenReaderFriendly: () => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  toggleLargeText: () => void;
  toggleInvertColors: () => void;
  checkForUpdates: () => void;
  setAutoUpdate: (value: boolean) => void;
  isCheckingUpdates: boolean;
  lastChecked: string | null;
  autoUpdate: boolean;
  updatePreference: (key: string, value: any) => void;
}

export interface ExtendedComplianceContextType {
  isLoaded: boolean;
  error: Error | null;
  checkForUpdates: () => void;
  setAutoUpdate: (value: boolean) => void;
  isCheckingUpdates: boolean;
  lastChecked: string | null;
  autoUpdate: boolean;
  updatePreference: (key: string, value: any) => void;
  pendingUpdates: any[];
  isApplyingUpdate: boolean;
  applyUpdate: (id: string) => Promise<void>;
  applyAllUpdates: () => Promise<void>;
  scheduleComplianceCheck: () => Promise<void>;
  enableAutoUpdates: () => Promise<boolean>;
}

// Add UnifiedExecutiveMessage interface
export interface UnifiedExecutiveMessage {
  id: string;
  content: string;
  from_executive: boolean;
  created_at: string;
  to_executive?: boolean;
  message_content?: string;
  status?: string;
}
