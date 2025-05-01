
/**
 * Unified type definitions to ensure consistency across the application
 */

// User type that combines all required properties from different models
export interface UnifiedUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  company_id: string;
  company: string;
  industry: string;
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
  // Allow additional properties
  [key: string]: any;
}

export type User = UnifiedUser;

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

export type Bot = UnifiedBot;

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
  type?: string; // Added for backward compatibility
}

// We export these explicitly to match what components are expecting
export type WebhookEvent = UnifiedWebhookEvent;

// Business event types
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

// Executive message type
export interface UnifiedExecutiveMessage {
  id: string;
  content: string;
  created_at: string;
  from_executive: boolean;
  to_executive?: boolean;
  message_content?: string;
  status?: string;
}

export type ExecutiveMessage = UnifiedExecutiveMessage;

// Message type for chat interfaces
export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
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
  textToSpeech?: boolean;
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
  applyUpdate: (documentId: string) => Promise<any>;
  applyAllUpdates: () => Promise<any>;
  scheduleComplianceCheck: (intervalDays?: number) => Promise<void>;
  enableAutoUpdates: (documentId: string, enabled: boolean) => Promise<boolean>;
}

// WebhookType definition
export type WebhookType = 'zapier' | 'custom' | 'stripe' | 'github' | 'slack' | 'notion';

// Social media specific interfaces
export type SocialPlatform = 'Facebook' | 'Twitter' | 'Instagram' | 'LinkedIn' | 'TikTok';
export type ContentType = 'text' | 'image' | 'video' | 'link' | 'carousel' | 'poll';
export type PostContentType = ContentType; // Alias for backward compatibility
export type PostStatus = 'draft' | 'scheduled' | 'published' | 'failed' | 'archived';

export interface SocialMediaPost {
  id: string;
  platform: SocialPlatform;
  content: string;
  content_type: ContentType;
  status: PostStatus;
  is_approved: boolean;
  company_id?: string; 
  scheduled_at?: string;
  scheduled_date?: string; 
  publish_time?: string; 
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
  title?: string; 
  campaign_id?: string;
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

// Database interfaces for verification
export interface DatabaseTableStatus {
  name: string;
  status: string; // Added to match usage in components
  count: number;
}

// Company profile interface
export interface CompanyProfile {
  id: string;
  tenant_id: string;
  company_name: string;
  companyName?: string; // For backward compatibility
  industry?: string;
  target_customer?: string;
  sales_channels?: string[];
  offers?: string[];
  pricing_model?: string;
  tone_of_voice?: string;
  website_url?: string;
  revenue_goal?: number;
  current_mrr?: number;
  shopify_connected?: boolean;
  has_active_sales_team?: boolean;
  created_at?: string;
  updated_at?: string;
}
