
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
  avatar_url: string;
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
  targetUrl?: string;
  url?: string;
  webhookType?: string;
  webhook_type?: string;
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
}
