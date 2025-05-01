
/**
 * Unified type definitions to ensure consistency across the application
 */

// User type that combines all required properties from different models
export interface UnifiedUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  company_id: string | null;
  company: string | null;
  industry: string | null;
  created_at: string;
  updated_at: string;
  avatar_url?: string;
  user_metadata: {
    firstName: string;
    lastName: string;
    avatar?: string;
    name?: string;
    role?: string;
  };
  app_metadata: {
    is_admin?: boolean;
    [key: string]: any;
  };
}

// Bot type with all required properties
export interface UnifiedBot {
  id: string;
  name: string;
  title: string;
  expertise: string;
  avatar?: string;
  description?: string;
  industry?: string;
  specialties?: string[];
}

// Extended webhook event type
export interface UnifiedWebhookEvent {
  id: string;
  webhook_id: string;
  eventType: string;
  event_type: string; // For backward compatibility
  status: 'success' | 'failed' | 'pending';
  created_at: string;
  payload: any;
  response?: any;
  targetUrl: string;
  url?: string;
  webhookType: WebhookType;
  webhook_type?: WebhookType;
  timestamp: string;
}

// We export these explicitly to match what components are expecting
export type WebhookEvent = UnifiedWebhookEvent;

// Executive message type
export interface UnifiedExecutiveMessage {
  id: string;
  content: string;
  created_at: string;
  from_executive: boolean;
  to_executive?: boolean;
  message_content?: string;
  status?: string;
  [key: string]: any;
}

// Types for accessibility context with all needed properties
export interface ExtendedAccessibilityContextType {
  screenReaderFriendly: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  invertColors: boolean;
  fontSize: number;
  setFontSize: (v: number) => void;
  toggleScreenReader: () => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  toggleLargeText: () => void;
  toggleInvertColors: () => void;
  checkForUpdates: () => void;
  setAutoUpdate: (value: boolean) => void;
  isCheckingUpdates: boolean;
  lastChecked: string | null;
  autoUpdate?: boolean;
  updatePreference?: (key: string, value: any) => void;
}

// Extended compliance context types
export interface ExtendedComplianceContextType {
  isLoaded: boolean;
  error: string | null;
  checkForUpdates: () => void;
  setAutoUpdate: (value: boolean) => void;
  isCheckingUpdates: boolean;
  lastChecked: string | null;
  autoUpdate?: boolean;
  updatePreference?: (key: string, value: any) => void;
  pendingUpdates: string[];
  isApplyingUpdate: boolean;
  applyUpdate: (documentId: string) => Promise<void>;
  applyAllUpdates: () => Promise<void>;
  scheduleComplianceCheck: (intervalDays?: number) => Promise<void>;
  enableAutoUpdates: (documentId: string, enabled: boolean) => Promise<boolean>;
}

// WebhookType definition for compatibility
export type WebhookType = 'zapier' | 'custom' | 'stripe' | 'github' | 'slack' | 'notion';

// Social media specific interfaces
export type SocialPlatform = 'Facebook' | 'Twitter' | 'Instagram' | 'LinkedIn' | 'TikTok' | 'YouTube';
export type ContentType = 'text' | 'image' | 'video' | 'link' | 'carousel' | 'poll';
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed' | 'archived';

export interface SocialMediaPost {
  id: string;
  platform: SocialPlatform;
  content: string;
  content_type: ContentType;
  status: PostStatus;
  scheduled_at?: string;
  scheduled_date?: string; // For form compatibility
  publish_time?: string; // For form compatibility
  published_at?: string;
  media_urls?: string[];
  link_url?: string;
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
    views?: number;
  };
  tags?: string[];
  title?: string; // For form compatibility
  campaign_id?: string; // For form compatibility
  is_approved?: boolean; // For approval workflows
  created_at: string;
  updated_at: string;
}

// Calendar filters for social media
export interface SocialMediaCalendarFilters {
  platform?: string;
  status?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}
